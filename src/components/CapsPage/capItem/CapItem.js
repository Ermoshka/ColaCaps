import React from 'react'
import './capitem.css'

const CapItem = ({imageUrl, name, description}) => {
    
    return (
        <div className="cap animated">
            <h2 className="title">{name}</h2>
            <div className="imageContainer">
                <div
                className="image">
                    <img src={imageUrl} width="100%" height="100%"/>
                </div>
            </div>
            <div className="body">
                <p className="description">{description}</p>
            </div>
        </div>
    )
}

export default CapItem