import React, { Component } from 'react';
import "core-js/stable";
import "regenerator-runtime/runtime";
import '../styles/home.css'

class Home extends Component {
    constructor(props){
      super(props)
      this.state = {
		  summonerName: '',
		  games: null
      }
	  
	  this.updateInputValue = this.updateInputValue.bind(this)
	  this.handleKeyPress = this.handleKeyPress.bind(this)
	  this.getSummonerInfo = this.getSummonerInfo.bind(this)
    }
	
	updateInputValue(evt) {
		this.setState({summonerName: evt.target.value});
	}
	
	handleKeyPress(evt) {
		if (evt.key === 'Enter') {
			this.getSummonerInfo()
		}
	}
	
	getSummonerInfo() {
		var headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		fetch('https://leaguestats-server.couchsports.ca/summoner?name=' + this.state.summonerName, {
			headers: headers,
			method: 'GET'
		})
		.then(response => response.json())
		.then(data => {
			this.setState({games: data})
		})
	}
	
	renderGames() {
		{this.state.games.map((game, i) => (
			<div key={i}>
				{game}
			</div>
		))}
	}

    render() {
      return (
        <div>
			<input
				autoFocus
				className='userHandle'
				type='text'
				placeholder={this.props.userHandle}
				value={this.state.newUserHandle}
				onChange={event => this.updateInputValue(event)}
				onKeyPress={event => this.handleKeyPress(event)}
			/>
			<button
				onClick={this.getSummonerInfo}
			>
				SUBMIT
			</button>
			<div>
				{this.renderGames()}
			</div>
        </div>
		
      )
    }
}

export default Home;