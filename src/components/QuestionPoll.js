import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Progress, FormGroup, Label, Input } from 'reactstrap'
import { handleAddAnswer } from '../actions/questions'

class QuestionPoll extends Component {
	state = {
        selectedAnswer: ''
    }

    handleSaveAnswer(e) {
        e.preventDefault()

        const { selectedAnswer } = this.state
        const { dispatch, authedUser, id } = this.props
        
        dispatch(handleAddAnswer({
          qid: id,
          authedUser,
          answer: selectedAnswer,
        }))
    }

    chooseAnswer(answer) {
        this.setState(() => {
            return {selectedAnswer: answer}
        })
	}

	render() {

		const { question, author, answered, answer, votesOptionOne, votesOptionTwo, totalVotes, percentOptionOne, percentOptionTwo } = this.props
        const { selectedAnswer } = this.state

    
        if (!question) {
            return <Redirect to="/notfound"/>
		}

		return (
			<div className='question'>
	            {answered ? 
	            	(
	                    <div className="question-header">
	                    	<span>Asked by {author.name}</span>
	                    </div>
	                ) : (
	                    <div className="question-header">
	                    	<span>{author.name} asks:</span>
	                    </div>
	                )
	            }
                <div className="question-body">
                    <div className="qstn-left">
                        <img 
                        	alt={`Avatar of ${author.name}`} 
                        	className="avatar" 
                        	src={author.avatarURL}
                        />
                    </div>
                    
                    {!answered ? (
                        <div className="qstn-right">
                        	<div>
	                            <p>Would you rather ...</p>
                                <div>
                                    <FormGroup check onClick={(e) => { this.chooseAnswer('optionOne')}}>
                                        <Label check>
                                            <Input type="radio" name="radio1" value="optionOne" />
                                            {question.optionOne.text}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check onClick={(e) => { this.chooseAnswer('optionTwo')}}>
                                        <Label check>
                                            <Input type="radio" name="radio1" value="optionTwo" />
                                            {question.optionTwo.text}
                                        </Label>
                                    </FormGroup>
                                </div>

	                            <button className={ selectedAnswer ? 'btn1' : 'disabled' } onClick={(e) => {this.handleSaveAnswer(e)}}>Submit</button>
                        	</div>
                        </div>
                    ) : (
                        <div className="qstn-right">
                            <div>
                            	<p>Results:</p>
                            </div>
                            <div className={answer === 'optionOne' ? 'option-box selected' : 'option-box'}>
                                <div className="qstn-name">Would you rather {question.optionOne.text}?</div>
                                <div className="progressbar">
                                    <Progress value={percentOptionOne}>{percentOptionOne}%</Progress>
                                    <p>{votesOptionOne} out of {totalVotes} votes</p>
                                </div>
                                <div className="your-vote"><span>Your vote</span></div>
                            </div>
                            
                            <div className={answer === 'optionTwo' ? 'option-box selected': 'option-box'}>
                                <div className="qstn-name">Would you rather {question.optionTwo.text}?</div>

                                <div className="progressbar">
                                    <Progress value={percentOptionTwo}>{percentOptionTwo}%</Progress>
                                    <p>{votesOptionTwo} out of {totalVotes} votes</p>
                                </div>
                                <div className="your-vote"><span>Your vote</span></div>
                            </div>
                        </div>
                    )}
                    
                </div>	
			</div>
		)
	}
}

function mapStateToProps ({authedUser, users, questions}, { match }) {
    const { id } = match.params
    const question = questions[id]
    const author = question ? users[question.author] : null
    const answered = question ? (question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1) : false
    const votesOptionOne = (question && question.optionOne.votes) ? question.optionOne.votes.length : 0
    const votesOptionTwo = (question && question.optionTwo.votes) ? question.optionTwo.votes.length : 0
    const totalVotes = votesOptionOne + votesOptionTwo
    const percentOptionOne = ((votesOptionOne / totalVotes) * 100).toFixed(1)
    const percentOptionTwo = ((votesOptionTwo / totalVotes) * 100).toFixed(1)

    //get answer of authedUser
    const answer = users[authedUser].answers[id]
  
    return {
        id,
        authedUser,
        question,
        author,
        answered,
        answer,
        votesOptionOne,
        votesOptionTwo,
        totalVotes,
        percentOptionOne,
        percentOptionTwo
    }
}

export default connect(mapStateToProps)(QuestionPoll)