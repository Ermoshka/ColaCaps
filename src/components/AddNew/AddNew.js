import React, { Component } from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import ImageTool from '@editorjs/image';
import uploader from '../../utils/uploader'
import { withRouter } from 'react-router-dom';
import withColaCapsService from '../hoc-helpers/withColaCapsService'
import './addnew.css'

class AddNew extends Component {

    componentDidMount() {
        this.editor = new EditorJS({
            holder: 'editorjs',
            tools: {
                header: {
                    class: Header,
                    placeholder: 'Enter a new header',
                    levels: [2, 3, 4],
                    defaultLevel: 3
                },
                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                           ...uploader
                        }
                    }
                }
            }
        })
    }

    saveHandler = () => {
        this.editor.save().then(result => {
            // console.log(result)
            // console.log(JSON.stringify(result))
            const {addNews, history} = this.props
            addNews(result).then(res => {
                history.push('/')
            })  
        })
    }
    
    render() {
        return (
            <main className="app-wrapper" ref={this.props.stickyRef} >
                <div className="content">
                    <h2>Write something to post</h2>
                    <button className="save"
                        onClick={this.saveHandler}>Save and post</button>
                    <div className="editor" id="editorjs"></div>
                </div>
            </main>
        )
    }
}

const mapMethodsToProps = ({addNews}) => {
    return {
        addNews
    }
}

export default withRouter( 
    withColaCapsService(mapMethodsToProps)(AddNew)
 )