import React, { Component } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image';
import './news.css'
import uploader from '../../utils/uploader'
import { withRouter } from 'react-router-dom';
import withColaCapsService from '../hoc-helpers/withColaCapsService';

class News extends Component {

    state = {
        news: []
    }

    componentDidMount() {
        const { getAllNews } = this.props
        getAllNews().then(news => {
            this.setState({
                news: news.data
            })
        })
    }

    render() {
        return (
            <main className="app-wrapper">
                <div className="news">
                    {

                        this.state.news.map(news => {
                            return (
                                <div className="new-item animated">
                                    <div className="image">
                                        <img 
                                            width="100%" 
                                            height="100%" 
                                            src={news.content.blocks[0].data.file.url} 
                                            alt="header image" />
                                    </div>
                                    <div className="new-body">
                                        <h3>{news.content.blocks[1].data.text}</h3>
                                        <p>{news.content.blocks[2].data.text.replace("<br>", "")}</p>
                                        <button onClick={() => this.props.history.push(`/news/${news.id}`)}>Read more</button>
                                    </div> 
                                </div>
                            )
                        })
                    }
                </div>
            </main>
        )
    }

}

const mapMethodsToProps = ({ getAllNews }) => {
    return {
        getAllNews
    }
}

export default withRouter(
    withColaCapsService(mapMethodsToProps)(News)
)