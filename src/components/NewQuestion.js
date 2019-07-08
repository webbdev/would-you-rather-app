import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
	state = {
		optionOneText: '',
		optionTwoText: '',
		toHome: false
	}

	 handleOptionOneTextChange = (e) => {
        const text = e.target.value

        this.setState({
            optionOneText: text
        })
    };

    handleOptionTwoTextChange = (e) => {
        const text = e.target.value

        this.setState({
            optionTwoText: text
        })
	}

	handleSubmit = (e) => {   
    	e.preventDefault()

    	const { optionOneText, optionTwoText} = this.state
    	const { dispatch } = this.props  
    
    	dispatch(handleAddQuestion(
      		optionOneText,
      		optionTwoText
    	))

    	this.setState({
        	optionOneText: '',
			optionTwoText: '',
			toHome: true
      	})
}

	render() {
		const { optionOneText, optionTwoText, toHome } = this.state;

		if (toHome === true) {
          return <Redirect to='/home' />
        }

		return (
			<div className="question new">
                <div className="question-header">
                    <span>Create New Question</span>
                </div>
                <div className="new-question-body">
                    <p>Complete the question:</p>
                    <p>Would you rather ...</p>
                    
                    <form onSubmit={this.handleSubmit}>
                        <div>
                        	<input
                                className='new-qstn-option'
                                placeholder='Enter Option One Text Here...'
                                value={optionOneText}
                                onChange={this.handleOptionOneTextChange}
							/>
                        </div>
                        <div className='or'>OR</div>
                        <div>
                        	<input
                                className='new-qstn-option'
                                placeholder='Enter Option Two Text Here...'
                                value={optionTwoText}
                                onChange={this.handleOptionTwoTextChange}
							/>
                        </div>
                        <button 
                        	className='mybtn new'
                        	type='submit'
                        	disabled={optionOneText === '' && optionTwoText === ''}
                        >
                        	Submit
                        </button>
                    </form>
                </div>
            </div>
		)
	}
}

function mapStateToProps ({ authedUser }) {
  return { authedUser }
}

export default connect(mapStateToProps)(NewQuestion)