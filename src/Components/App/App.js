import React, { Component } from 'react';
import 'Styles/normalize.css'
import 'Styles/App.css';

class App extends Component {
	api = 'https://wind-bow.glitch.me/twitch-api'
	streams = this.api + '/streams'
	users = this.api + '/users'
	channels = this.api + '/channels'
	usersArr = ['FreeCodeCamp', 'ESL_SC2', 'OgamingSC2', 'cretetion', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
	state = {
		usersData: []
	}

	fetchData(user){
		fetch(`${this.streams}/${user}`)
		.then(res => res.json())
		.then( dataStream =>{
			fetch(`${this.users}/${user}`)
			.then(res => res.json())
			.then(dataUser => {
				fetch(`${this.channels}/${user}`)
				.then(res => res.json())
				.then(dataChannel => {
					let newState = this.state.usersData
					newState.push(
						{
							stream: dataStream,
							user: dataUser,
							channel: dataChannel,
						}
					)
					this.setState({
						usersData: newState
					})
				})
			})
		})
	}
	


	componentDidMount(){
		// this.fetchData('ESL_SC2')
		// this.fetchData('freecodecamp')
		this.usersArr.forEach((user, i) => {
			this.fetchData(user)
		})

	}
	render() {
		const streamers = this.state.usersData.map(userData => userData)
			return (
				<div id='App' className='App'>
					<h1>Twitch Streamers</h1>
					{this.state.usersData.length>0?
						<StreamersContainer streamers={streamers} />
					:
					<p>loading</p>
					}
				</div>
			);
	}
}

const StreamersContainer = (props) => {
	return (
		<div className='StreamersContainer'>
		{props.streamers.map(streamer =>{
			const isStreaming = streamer.stream.stream
			return (
			<div key={streamer.user._id} className='streamer'>
				<div className='img-wrapper'>
					<a className='link' href={streamer.channel.url} target='_blank' >
						<img className='img' src={streamer.user.logo} alt={streamer.user.name}/>
					</a>
				</div>
				<div className='text'>
					<a className='link' href={streamer.channel.url} target='_blank' >
						<h2>{streamer.user.name}</h2>
						{isStreaming ? 
								<p className="desc"><strong>Playing:</strong> {streamer.channel.game} <strong>viewers:</strong> {streamer.stream.stream.viewers}</p>
								:
								<p className="desc"><strong>Offline</strong></p>
						}
					</a>
				</div>
				<div className='status'>
					{ isStreaming ?
					<div className='streaming active'></div>
					:
					<div className='streaming'></div>
					}
				</div>
			</div>
			)
		})}
		</div>
	)
}

export default App;
