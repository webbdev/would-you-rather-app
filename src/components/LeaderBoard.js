import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
	render() {
		const { users } = this.props

		const sortedUsers = users.sort( (a, b) => b.totalScore - a.totalScore)

		return (
			<div>
				<ul className='board-list'>
				{sortedUsers.map((user, index) => (
					<li key={user.id}>

						<div className='user-info'>
							<div className='leader-icon'>
								<div className={ (index === 0) ? 'gold' : (index === 1) ? 'silver' : 'bronze' }><span className='nr'>{index + 1}</span> Place</div>
							</div>
							
							<div className='user-body'>
								<div className='colmn-1'>
									<img
										src={user.avatarURL}
										alt='avatar'
										className='avatar'
									/>
								</div>
								<div className='colmn-2'>
									<p className='user-name'>{user.name}</p>
									<div className='answered-created'>
										<div>Answered questions</div>
										<div>{Object.keys(user.answers).length}</div>
									</div>
									<div className='answered-created'>
										<div>Created questions</div>
										<div>{user.questions.length}</div>
									</div>
								</div>
								<div className='colmn-3'>
									<div className='score-box'>
										<div><span>Score</span></div>
										<div className='total-score'><span><span>{user.totalScore}</span></span></div>
									</div>
								</div>
							</div>
						</div>
					</li>	
				))}	
				</ul>
			</div>
		)
	}
}

function mapSateToProps ({ users }) {
	const usersList = Object.values(users)

    usersList.map( (user) => user.totalScore = Object.keys(user.answers).length + user.questions.length )
    
    return {
        users: usersList
	}
}

export default connect(mapSateToProps)(LeaderBoard)