import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

class NavBar extends PureComponent {
	constructor (props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
          isOpen: false
        }
    }

    toggle () {
        this.setState({
          isOpen: !this.state.isOpen
        })
    }

	render() {

		const { user, authedUser } = this.props
		const avatar = user ? user.avatarURL : ''
		const name = user ? user.name : ''

		return (
			<div className="Header-App">
                <Navbar color="light" light expand="md">
                    <NavbarBrand tag={Link} to="/">MyApp</NavbarBrand>
                    {
                        authedUser &&
                        <Fragment>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to="/home">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/new">New Question</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/leaderboard">Leader Board</NavLink>
                                    </NavItem>
                                    <NavItem>
        								<NavLink tag={Link} to='/'>
        									<div className='nav-user'>
        										<span>Hello, {name}</span>
        										<img
        											src={avatar}
        											alt={name}
        											className='nav-avatar'
        										/>
        										<span>Logout</span>
        									</div>
        								</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Fragment>
                    }
                </Navbar>
            </div>
		)
	}
}

NavBar.propTypes = {
    authedUser: PropTypes.string,
}

function mapSateToProps ({ authedUser, users }, props) {
	return {
		authedUser,
		users,
		user: users[authedUser]
	}
}

export default connect(mapSateToProps)(NavBar)