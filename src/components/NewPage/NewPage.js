import React, { Component } from 'react'
import withColaCapsService from '../hoc-helpers/withColaCapsService'
import { withRouter } from 'react-router-dom'
import './newpage.css'

class NewPage extends Component {

    state = {
        data: []
    }
    
    componentDidMount() {
        const { getNews } = this.props
        const {id} = this.props.match.params
        getNews(id).then(news => {
            this.setState({
                data: news.data.blocks
            })
        })
    }

    render() {
        return (
            <main className="app-wrapper">
                <div className="newpage">
                    {
                        this.state.data.map(block => {
                            if (block.type === "header") {
                                switch (block.data.level) {
                                    case 1:
                                        return <h1>{block.data.text}</h1>
                                    case 2:
                                        return <h2>{block.data.text}</h2>
                                    case 3:
                                        return <h3>{block.data.text}</h3>
                                }
                            } else if (block.type === "paragraph") {
                                return (
                                    <p>{block.data.text.replace("<br>", "")}</p>
                                )
                            } else if (block.type === "image") {
                                return (
                                    <img src={block.data.file.url} width="100%" height="100%" alt="image header" />
                                )
                            }
                        })
                    }
                </div>
            </main>
        )
    }
}

const mapMethodsToProps = (service) => {
    return {
        getNews: service.getNews
    }
}

export default withRouter(
    withColaCapsService(mapMethodsToProps)(NewPage)
)