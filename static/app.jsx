let url = 'http://biotm2.cis.udel.edu:11000/';

class RawDataContainer extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            data: null,
            selectedDuid: null,
            selectedType: null
        };

        // This binding is necessary to make `this` work in the callback
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        fetch(url + "raw/json/" + pmcid_id).then(response => {
            response.json().then(data => {
                this.setState({
                    data: data
                });
            });
        });
    }

    updateState(duid, type) {
        this.setState({
            selectedDuid: duid,
            selectedType: type
        });
    }

    render() {
    	   console.log(this.state.data);
        if (this.state.data == null) return (<p> Empty </p>);
        let block = this.state.data;
        return (
            <div>
                <div key={block.docId} className="container-fluid">
                    <h3>{block.docId}</h3>
                    <div className="row">
                    <div className="col-md-6">
                        <Cytoscape id="cy"
                                   style={{width: 600, height: 400, border: '1px solid #aaa'}}
                                   selectedDuid={this.state.selectedDuid}
                                   selectedType={this.state.selectedType}
                                   updateState={this.updateState}
                        />
                    </div>
                    <div className="col-md-6">
                    <PMCText 
                        data={block}
                        selectedDuid={this.state.selectedDuid}
                        selectedType={this.state.selectedType}
                    />
                  
                    </div>
                    </div>
                    <JsonTable
                        docId={block.docId}
                        data={block}
                        selectedDuid={this.state.selectedDuid}
                        selectedType={this.state.selectedType}
                        updateState={this.updateState}/>
                    {/* <Brat id="brat"/> */}
                </div>
            </div>
        );
    }
}

class JsonTable extends React.Component {
    render() {
        return (
            <div>
                <h3>Relation Table</h3>
                <JsonTableEntry
                    data={this.props.data.relation}
                    fullData={this.props.data}
                    type="relation"
                    selectedDuid={this.props.selectedDuid}
                    selectedType={this.props.selectedType}
                    updateState={this.props.updateState}
                />
                <h3>Entity Table</h3>
                <JsonTableEntry
                    data={this.props.data.entity}
                    type="entity"
                    selectedDuid={this.props.selectedDuid}
                    selectedType={this.props.selectedType}
                    updateState={this.props.updateState}
                />
            </div>
        );
    }
}

class JsonTableEntry extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            selectedRow: this.props.selectedDuid
        };
    }

    updateState(id) {
        this.props.updateState(id, this.props.type);
        this.setState({
            selectedRow: id
        });
    }

    componentDidUpdate() {
        if (this.state.selectedRow != this.props.selectedDuid) {
            this.setState({
                selectedRow: this.props.selectedDuid
            });
        }
    }
    
    render() {
        let data = this.props.data;
        if (this.props.type == 'entity') {
            return (
                <table className="table table-border table-condensed">
                    <thead><tr>
                        <th>Entity Text</th>
                        <th>Entity Type</th>
                        <th>Source</th>
                    </tr></thead>
                    <tbody>
                    {Object.keys(data).sort((a, b) => {
                        return data[a].charStart - data[b].charStart;
                    }).map((id) => {
                        let entry = data[id];
                        return (
                            <tr key={id}
                                onClick={() => this.updateState(id, this.props.type)}
                                className={this.state.selectedRow == id ? 'highlight' : ''}>
                                <td>{entry.entityText}</td>
                                <td>{entry.entityType}</td>
                                <td>{entry.source}</td>
                                {/*<td>{JSON.stringify(entry)}</td> */}
                            </tr> );
                    })}
                    </tbody>
                </table>
            );
        }
        else if (this.props.type == 'relation') {
            return (
                <table className="table table-border table-condensed">
                    <thead><tr>
                        <th>Arguments</th>
                        <th>Source</th>
                        <th>Relation Type</th>
                        <th>Attributes</th>
                    </tr></thead>
                    <tbody>
                    {Object.keys(data).map((id) => {
                        let entry = data[id];
                        let args = entry.argument.map((k) => {
                            let text = this.props.fullData.entity[k.entity_duid].entityText;
                            return k.role + ': ' + text;
                        });
                        let attr = entry.attribute.map((k) => { 
                            return k.key + ': ' + k.value;
                        });
                        return (
                            <tr key={id}
                                onClick={() => this.updateState(id, this.props.type)}
                                className={this.state.selectedRow == id ? 'highlight' : ''}>
                                <td>{args.map((ele, idx) => {
                                    return <span key={idx}>{ele}<br/></span>
                                })}</td>
                                <td>{entry.source}</td>
                                <td>{entry.relationType}</td>
                                <td>{attr.map((ele, idx) => {
                                    return <span key={idx}>{ele}<br/></span>
                                })}</td>
                                {/* <td>{JSON.stringify(entry)}</td> */}
                            </tr> );
                    })}
                    </tbody>
                </table>
            )
        }
    }
}

class PMCText extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            selectedDuid: null,
            sections: []
        };
    }

    componentDidMount() {
        this.setState({
            sections: [{text: this.props.data.text, highlight: false}]
        })
    }

    componentDidUpdate() {
        let selectedDuid = this.props.selectedDuid;
        if (!selectedDuid || this.state.selectedDuid == selectedDuid) 
            return;
        
        let data = this.props.data;
        let text = this.props.data.text;
        var newSections = [], entities = [];
        if (this.props.selectedType == 'entity'){
            entities.push(data.entity[selectedDuid]);
        }
        else if (this.props.selectedType == 'relation'){
            let relation = data.relation[selectedDuid];
            entities = relation.argument.map((a) => {
                let duid = a['entity_duid'];
                return data.entity[duid];
            }).sort((a, b) => {
                return a.charStart - b.charStart;
            });
        }
        else {
            return
        }
        
        var lastIndex = 0;
        entities.map((e) => {
            newSections.push(
                {text: text.slice(lastIndex, e.charStart), highlight: false});
            newSections.push(
                {text: text.slice(e.charStart, e.charEnd + 1), highlight: true});
            lastIndex = e.charEnd + 1;
        });
        if (lastIndex <= text.length )
            newSections.push(
                {text: text.slice(lastIndex), highlight: false});
        
        this.setState({
            selectedDuid: selectedDuid,
            sections: newSections
        })
    }

    render() {
        return (
            <div>
                <p>{this.state.sections.map((sec, idx) => {
                    return (
                        <span key={idx}
                              className={sec.highlight ? 'highlight' : ''}>
                                {sec.text}</span>
                    )
                })}
                </p>
            </div>
        )
    }
}

class Brat extends React.Component {
    componentDidMount() {
        fetch(url + "raw/brat/" + pmc_id).then(response => {
            response.json().then(data => {
                brat(data, this.props.id)
            });
        });
    }

    render() {
        return (
            <div id={this.props.id}></div>
        );
    }
}

class Cytoscape extends React.Component {
    componentDidMount() {
        fetch(url + "raw/cyto/" + pmcid_id).then(response => {
            response.json().then(data => {
                cyto_init(data, this.props.id, this.props.updateState);
            });
        });
    }

    componentDidUpdate() {
        cyto_highlight(this.props.selectedDuid, this.props.selectedType);
    }
    
    
    render() {
        return (
            <div id={this.props.id} 
                 style={this.props.style}>
            </div>);
    }
}

ReactDOM.render(
    <RawDataContainer/>, document.getElementById('example')
);
