import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { setAuthedUser, logoutAuthedUser } from '../actions/authedUser'
import reactIcon from '../react-icon.png'

class Signin extends Component {
	state = {
        userId: null,
        toHome: false
    }

    handleUserChange = (e) => {
		const userId = e.target.value;
	
		this.setState(function(previousState) {
		  return {
			...previousState,
			userId,
		  };
		});
	}

    handleSignin = (e) => {
    	e.preventDefault()

    	const { userId } = this.state
    	const { dispatch } = this.props

    	dispatch(setAuthedUser(userId))

    	this.setState(function(previousState) {
			return {
				...previousState,
				toHome: true,
		  	}
		})

    }

    componentDidMount() {
		this.props.dispatch(logoutAuthedUser())
	}

    render() {
    	const { userId, toHome } = this.state
		const { users } = this.props
		const { from } = this.props.location.state || { from: { pathname: '/home'}}
		const selected = userId ? userId : -1

		if(toHome) {
			return <Redirect to={from} />
		}
        
        return (
            <div className="sign-in">
                <div className="wrapper">
                    <div className="signin-top">
                        <h2>Welcome to the Would You Rather App!</h2>
                        <p>Please sign in to continue</p>
                    </div>
                    <div className="signin-body">
                        <img className="icon" alt='Icon' src={reactIcon} />
                        <p>Sign in</p>
                    </div>
                    <form>
                        <select 
                        	className="select-users"
                        	value={selected}
                        	onChange={(e) => this.handleUserChange(e)}
                        >
                            <option value='-1' disabled>Select User</option>
                            {Object.keys(users).map(function(key) {
                            	return (
                            		<option 
                            			value={users[key].id}
                            			key={key}
                            		>
                            			{users[key].name}
                            		</option>
                            	)
                            })}
                        </select>
                        <button 
                        	className="mybtn"
                            disabled={userId === null}
                        	onClick={(e) => this.handleSignin(e)}
                        >
                        	Sign In
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapSateToProps ({ authedUser, users }, { id }) {

	return {
		authedUser,
		users
	}
}

export default withRouter(connect(mapSateToProps)(Signin))