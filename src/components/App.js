import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import NavBar from './NavBar'
import Signin from './Signin'
import PrivateRoute from './PrivateRoute'
import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import QuestionPoll from './QuestionPoll'
import LeaderBoard from './LeaderBoard'
import NotFound from './NotFound'


class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
	render() {
		return (
			<Router>
				<Fragment>
					<div className='container'>
					  	<NavBar />
					  	<div>
					  		<Route path='/' exact component={Signin} />
				  			<PrivateRoute path='/home' component={Dashboard} />
				  			<PrivateRoute path='/new' component={NewQuestion} />
				  			<PrivateRoute path='/question/:id' component={QuestionPoll} />
				  			<PrivateRoute path='/leaderboard' component={LeaderBoard} />
				  			<Route path="/notfound" component={NotFound} />
					  	</div>
					 </div>
				</Fragment>
			</Router>
		)
	}
}

export default connect()(App)
