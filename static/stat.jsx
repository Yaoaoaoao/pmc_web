class StatDataContainer extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
    	console.log(url);
        fetch(url).then(response => {
            response.json().then(data => {
                this.setState({
                    data: data
                });
            });
        });
    }

    render() {
        if (this.state.data == null) return (<p> Empty </p>);
        return (
            <div>
                {this.state.data.map((item, idx) => (
		    <div key={idx}>
			<p>{item.name}</p>
			<pre>
			<table><tbody>
{/*			<tr><td><b>Total Count: </b></td>
			    <td className="pull-right"><b>{item.data.counts.emit}</b></td></tr>
			<tr><td><b>Types: </b></td>
			    <td className="pull-right"><b>{item.data.counts.output}</b></td></tr>
*/}
			{item.data.results.map((cnt, idx) => (
				<tr key={idx}><td>{JSON.stringify(cnt._id)}</td>
					      <td className="pull-right">{cnt.value}</td></tr>	
			))}
			</tbody></table>
			</pre>
               	    </div>
	        ))}
            </div>
        );
    }
}


ReactDOM.render(
    <StatDataContainer/>, document.getElementById('result')
);
