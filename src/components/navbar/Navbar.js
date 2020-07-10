import React, { Component, Fragment } from 'react'
import './navbar.css'
import { NavLink, withRouter } from 'react-router-dom'
import logo from './cocacolalogo.png'
import withColaCapsService from '../hoc-helpers/withColaCapsService'

class Navbar extends Component {
    state = {
        responsive: false,
        activeBurger: false,
    }

    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }
    
    logOutHandler = () => {
        this.props.onLoggedOut()
        this.openBurger()
        this.props.history.push('/login')
    }

    openBurger = () => {
        this.setState(prev => {
            return {
                responsive: !prev.responsive,
                activeBurger: !prev.activeBurger
            }
        })
        let links = this.ref.current
        if(links.style.maxHeight) {
            links.style.maxHeight = null
        } else {
            links.style.display = 'block'
            links.style.maxHeight = links.scrollHeight + 'px'
        }
    }

    render() {
        const { isAdmin, isAuth, userName, balance } = this.props

        const MyLink = ({to, label}) => {
            return (
                <NavLink 
                    exact={to === '/'  ? true : false} 
                    to={to} activeClassName="selected" 
                    onClick={this.openBurger}>{label}</NavLink>
            )
        }
        
        return (

            <div className={['topnav', this.state.responsive ? 'responsive' : ''].join(' ')}>
                <NavLink className="logo" to="/" activeClassName="selected">
                    <img src={logo} height="40" width="90" alt="logo" />
                </NavLink>
                {
                    isAuth && (
                        <a style={{color: 'black'}} className="balance">{userName}: {balance}</a>
                    )
                }
                <div 
                    className={['burger', this.state.activeBurger ? 'change' : ''].join(' ')}
                    onClick={this.openBurger} 
                >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className="links" ref={this.ref}>
                    <MyLink exact to="/" label="News" />
                    <MyLink to="/caps" label="Caps" />
                    <MyLink to="/shop" label="Shop" />
                    {
                        !isAuth ? (
                            <a onClick={() => this.props.history.push('/register')}>Open Cap</a>
                        )  : (
                            <MyLink to={'/opencap'} label="Open Cap" />
                        )
                    }
                    {
                        isAdmin && (
                            <Fragment>
                                <MyLink to="/addnew" label="Add News"/>
                                <MyLink to="/addcap" label="Add Cap"/>
                                <MyLink to="/addproduct" label="Add Product" />
                                <MyLink to="/story" label="Story" />
                            </Fragment>
                        )
                    }
                    {
                        !isAuth ? (
                            <Fragment>
                                <MyLink to="/login" label="Log In" />
                                <MyLink to="/register" label="Sign Up" />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <a style={{cursor: 'pointer' }}
                                onClick={this.logOutHandler}>Log Out</a>
                                <a style={{color: 'black'}} className="second">{userName}: {balance}</a>
                            </Fragment>
                        )
                    }
                </div>
            </div>
        )
    }
}

// const mapMethodsToProps = (service) => {
//     return {
//         getUserBalance: service.getUserBalance
//     }
// }

export default withRouter(Navbar)