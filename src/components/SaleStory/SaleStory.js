import React from 'react'
import withColaCapsService from '../hoc-helpers/withColaCapsService'
import './story.css'
import { Component } from 'react'

class SaleStory extends Component  {

    state = {
        stories: []
    }
    
    componentDidMount() {
        const {getStory} = this.props
        getStory().then(result => {
            this.setState({
                stories: result.data
            })
        })
    }
    
    render() {
        return (
            <main className="app-wrapper">
                {
                    this.state.stories.map(story => {
                        return (
                            <div className="story">
                                <span>{story.id}</span>
                                <span>{story.username}</span>
                                <span>{story.productName}</span>
                                <span>{story.productPrice}</span>
                                <img
                                    width="70px" height="80px" 
                                    src={'http://localhost:8080/' + story.productImage} 
                                    alt=""/>
                            </div>
                        )
                    })
                }
            </main>
        )
    }
    
}

const mapMethodsToProps = ({ getStory }) => {
    return {
        getStory
    }
}

export default withColaCapsService(mapMethodsToProps)(SaleStory)