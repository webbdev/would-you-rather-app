import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {
    render() {
        return (
            <div className="notfound-page">
                <h2>Page not found</h2>
                <Link to="/">Back</Link>
            </div>
        )
    }
}

export default NotFound