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
                {Object.keys(this.state.data).map((k, idx) => (
		    <div key={idx}>
			<p>{k}</p>
			<pre>
			<table><tbody> 
			{this.state.data[k].map((item, idx) => (
				<tr key={idx}>
				    <td>{item._id}</td>
				    <td className="pull-right">{item.value}</td>
				</tr>	
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
