class FindNinja extends React.Component{
	constructor(props){
		super(props);
		this.state = {ninjas: []};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		var lng = this.refs.lng.value;
		var lat = this.refs.lat.value;

		fetch('/api/ninjas?lng=' + lng + '&lat=' + lat).then((data) => {
			return data.json();
		}).then(json => {
			this.setState({
				ninjas: json
			})
		});
	}

	render(){
		var ninjas = this.state.ninjas;
		ninjas = ninjas.map((ninja, index) => {
			return (<li key={index}>
					<span className={ninja.obj.available}></span>
					<span className="name">{ninja.obj.name}</span>
					<span className="rank">{ninja.obj.rank}</span>
					<span className="dist">{Math.floor(ninja.dis/1000)} km</span> 
					</li>);
		});
		return(
			<div id="ninja-container">
				<form id="search" onSubmit={this.handleSubmit}>
					<label>Enter your Latitude</label>
					<input type="text" ref="lat" placeholder="latitude" required />
					<label>Enter your Longitude</label>
					<input type="text" ref="lng" placeholder="latitude" required />
					<input type="submit" value="Find Ninjas" />
				</form>
				<ul>{ninjas}</ul>
			</div>
		);
	}
}  	

ReactDOM.render(
	<FindNinja />,
	document.getElementById('ninjas')
);