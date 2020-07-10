import React, { Component, Fragment } from 'react'
import './preloader.css'

export default class Preloader extends Component {
    
    state = {
        preloader: true,
        preloader_wrapper: true
    }
    
    preloader = {
        loadingTime: this.props.delay * 1000,
        timer: null,
        offWrapp: null
    }   

    componentDidMount() {
        this.preloader.timer = setTimeout(() => {
            this.setState({preloader: false})
        }, this.preloader.loadingTime)
        this.preloader.offWrapp = setTimeout(() => {
            this.setState({preloader_wrapper: false})
        }, this.preloader.loadingTime + 350)
    }
        
    componentWillUnmount() {
        clearTimeout(this.preloader.timer)
        clearTimeout(this.preloader.offWrapp)
    }
    
    render() {
        return (
            <Fragment>
                <div className="loader-wrapper" 
                    style={{display: !this.state.preloader_wrapper ? "none" : "flex"}} >
                <div className="colalogo"></div>
                <div className="loader" 
                    style={{
                        animationDelay: `${this.props.delay - 0.5}s`,
                        transform: !this.state.preloader ? "scale(100)" : null}}></div>
                </div>
                {
                    !this.state.preloader && (
                        this.props.children
                    )
                }
            </Fragment>
        )
    }
}
