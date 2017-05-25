let url = 'http://0.0.0.0:11000/';

class RawDataContainer extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            data: []
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch(url + "raw/json/{{pmcid}}").then(response => {
            response.json().then(data => {
                this.setState({
                    data: data
                });
            });
        });
    }

    handleClick(rowIndex) {
        this.setState({
            selectedRow: rowIndex
        });
    }

    render() {
        return (
            <div>
                {this.state.data.map(block => {
                    return (
                        <div key={block.docId} className="container-fluid">
                            <div className="row">
                            <div className="col-md-8">
                            <PMCText 
                                data={block}
                                selectedRow={this.state.selectedRow}/>
                            </div>
                            <div className="col-md-4">
                            <Cytoscape id="cy" 
                                highlight={this.state.selectedRow} />
                            </div>
                            </div>
                            <JsonTable 
                                docId={block.docId}
                                data={block}
                                handleClick={this.handleClick}/>
                            {/* <Brat id="brat"/> */}
                        </div>
                    )
                })}
            </div>
        );
    }
}

class JsonTable extends React.Component {
    render() {
        return (
            <div>
                <h3>Entity Table</h3>
                <JsonTableEntry
                    data={this.props.data.entity}
                    type="entity"
                    handleClick={this.props.handleClick}/>
                <h3>Relation Table</h3>
                <JsonTableEntry
                    data={this.props.data.relation}
                    type="relation"
                    handleClick={this.props.handleClick}
                />
            </div>
        );
    }
}

class JsonTableEntry extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            selectedRow: null
        };
    }

    handleClick(id) {
        this.props.handleClick(id);
        this.setState({
            selectedRow: id
        });
    }


    render() {
        return (
            <table className="table table-border ">
                <tbody>
                {Object.keys(this.props.data).map((id) => {
                    let entry = this.props.data[id];
                    return (
                        <tr key={id}
                            onClick={() => this.handleClick(id)}
                            className={this.state.selectedRow == id ? 'highlight' : ''}>
                            <td>{entry.duid}</td>
                            <td>{JSON.stringify(entry)}</td>
                        </tr> );
                })
                }
                </tbody>
            </table>
        );
    }
}

class PMCText extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            selectedRow: null,
            start: '',
            highligh: '',
            end: ''
        };
    }

    componentDidMount() {
        this.setState({
            start: this.props.data.text
        })
    }

    componentDidUpdate() {
        let selectedRow = this.props.selectedRow;
        if (selectedRow && this.state.selectedRow != selectedRow) {
            let entity = this.props.data.entity[selectedRow];
            let text = this.props.data.text;
            this.setState({
                selectedRow: selectedRow,
                start: text.slice(0, entity.charStart),
                highlight: text.slice(entity.charStart, entity.charEnd + 1),
                end: text.slice(entity.charEnd + 1)
            })
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.start}
                    <span className="highlight">{this.state.highlight}</span>
                    {this.state.end}
                </p>
            </div>
        )
    }
}

class Brat extends React.Component {
    componentDidMount() {
        fetch(url + "raw/brat/{{pmcid}}").then(response => {
            response.json().then(data => {
                brat(data[0], this.props.id)
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
        fetch(url + "raw/cyto/{{pmcid}}").then(response => {
            response.json().then(data => {
                cyto_init(data[0], this.props.id);
            });
        });
    }

    componentDidUpdate() {
        highlight_node(this.props.highlight);
    }

    render() {
        return (
            <div id={this.props.id} 
                 style={{width: 400, height: 300}}>
            </div>);
    }
}

ReactDOM.render(
    <RawDataContainer/>, document.getElementById('example')
);
