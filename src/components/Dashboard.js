import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import Question from './Question'

class Dashboard extends PureComponent {

	state = {
	    activeTab: '1'
	}

	toggle(tab) {
	    if (this.state.activeTab !== tab) {
	    	this.setState({
	        	activeTab: tab
	      	})
	    }
	}

	render() {
		const { unansweredQuestionsIds, answeredQuestionsIds } = this.props;
        
		return (
			<div className='dashboard-container'>
				<Nav tabs>
		          <NavItem>
		            <NavLink
		              className={classnames({ active: this.state.activeTab === '1' })}
		              onClick={() => { this.toggle('1'); }}
		            >
		              Unanswered Questions
		            </NavLink>
		          </NavItem>
		          <NavItem>
		            <NavLink
		              className={classnames({ active: this.state.activeTab === '2' })}
		              onClick={() => { this.toggle('2'); }}
		            >
		              Answered Questions
		            </NavLink>
		          </NavItem>
		        </Nav>

		        <TabContent activeTab={this.state.activeTab}>
		          	<TabPane tabId="1">
		            	<Row>
				            <Col sm="12">
			                	<ul className='dashboard-list'>

									{unansweredQuestionsIds.map((id) => (
										<li key={id}>
											<Question id={id} />
										</li>	
									))}
								</ul>
			              	</Col>
		            	</Row>
		          	</TabPane>
		          	<TabPane tabId="2">
		            	<Row>
			        		<Col sm="12">
			        			<ul className='dashboard-list'>
				                	{answeredQuestionsIds.map((id) => (
										<li key={id}>
											<Question id={id} />
										</li>	
									))}
								</ul>
			              	</Col>
		            	</Row>
		          </TabPane>
		        </TabContent>
			</div>
		)
	}
}


function mapSateToProps ({ questions, authedUser }) {
  	const unansweredQuestions = Object.values(questions).filter((question) =>
		!question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser)
	)

  	const answeredQuestions = Object.values(questions).filter((question) =>
        question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
	)

  	return {
    	unansweredQuestionsIds: Object.values(unansweredQuestions)
            .sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id),

        answeredQuestionsIds: Object.values(answeredQuestions)
        	.sort((a, b) => b.timestamp - a.timestamp).map((q) => q.id)
  	}
}

export default connect(mapSateToProps)(Dashboard)