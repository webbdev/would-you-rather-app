import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Question extends Component {

	render() {
		const { question, author, id } = this.props

		let altName = 'Avatar of ' + this.props.author.name

		let viewPoll = `/question/${id}`
	    
		return (
			<div className='question'>
				<div className='question-header'>
					<span>{author.name} asks:</span>
				</div>
				
				<div className='question-body'>
					<div className='qstn-left'>
						<img
							src={author.avatarURL}
							alt={altName}
							className='avatar'
						/>
					</div>
					<div className='qstn-right'>
						<div>
							<p>Would you rather</p>
							<p>{question.optionOne.text}</p>
						</div>
						<Link to={viewPoll}>
							<button className='btn1'>View Poll</button>
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

function mapSateToProps ({ authedUser, users, questions }, { id }) {
	const question = questions[id]
	const author = question ? users[question.author] : null

	return {
		authedUser,
		question,
		author
	}
}

export default connect(mapSateToProps)(Question)