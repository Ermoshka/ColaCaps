import React, { Component } from 'react'
import './modal.css'

export default class Modal extends Component {

    state = {
        // active: false
    }

    onModalCloseHandler = () => {
        this.props.onModalClose()
    }

    render() {
        const { won, imageUrl, title, description } = this.props
        return (
            <div className="modal">

                <div className="modal-content">
                    <div className="modal-title">
                        <span
                            onClick={this.onModalCloseHandler}
                            className="close">&times;</span>
                        <h2>{won}</h2>
                    </div>
                    <div className="modal-body">
                        <div className="imageContainer">
                            <img width="100%" height="100%" src={imageUrl} alt="" />
                        </div>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                </div>

            </div>
        )
    }
}
