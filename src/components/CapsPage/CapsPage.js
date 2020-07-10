import React, { Component, Fragment } from 'react'
import './caps-page.css'
import withColaCapsService from '../hoc-helpers/withColaCapsService'
import CapItem from './capItem/CapItem'

class CapsPage extends Component {
    
    state = {
        myCaps: true,
        caps: []
    }

    componentDidMount() {
        const { getAllCaps, getMyCaps, isAuth } = this.props
        if(!isAuth) {
            getAllCaps().then(response => {
                this.setState({
                    myCaps: false,
                    caps: response.data
                })
            })
        } else {
            getMyCaps(this.props.userName)
            .then(result => {
                this.setState({
                    caps: !result.data ? [] : result.data,
                    myCaps: true
                })
            })
        }
    }

    getCaps = () => {
        const {getAllCaps, getMyCaps} = this.props
        if(!this.state.myCaps) {
            getMyCaps(this.props.userName)
            .then(result => {
                this.setState({
                    caps: !result.data ? [] : result.data,
                    myCaps: true
                })
            })
        } else {
            getAllCaps().then(response => {
                this.setState({
                    myCaps: false,
                    caps: response.data
                })
            })
        }
    }
    
    render() {
        
        const {
            getMyCaps,
            isAuth,
            isAdmin
        } = this.props
        
        return (
            <main className="app-wrapper">
            
                <div className="tabs">
                    {
                        isAuth && (
                            <Fragment>
                                <button 
                                    onClick={this.getCaps} 
                                    className={['tab', this.state.myCaps ? 'active' : ''].join(' ')}>My Caps</button>
                                <button 
                                    onClick={this.getCaps} 
                                    className={['tab', !this.state.myCaps ? 'active' : ''].join(' ')}>All Caps</button>
                            </Fragment>
                        )
                    }
                </div>
                   
                <div className="caps">

                    {
                        this.state.caps.map((cap, index) => {
                            return (
                                <CapItem
                                    key={index}
                                    description={`It costs ${cap.price} and distributed ${cap.amount} for all city`}
                                    name={cap.name} 
                                    imageUrl={"http://localhost:8080/" + cap.stickerUrl} />
                            )
                        })
                    }
                </div>
            </main>
        )
    }
}

const mapMethodsToProps = (service) => {
    return {
        getAllCaps: service.getAllCaps,
        getMyCaps: service.getMyCaps
    }
}


export default withColaCapsService(mapMethodsToProps)(CapsPage)