import React from 'react'
import './proditem.css'

const ProdItem = ({userName, isAuth, imageUrl, price, id, name, description, onBought}) => {
    
    const buyHandler = () => {
        if (isAuth) {
            onBought(userName, id)
        }
    }

    return (
        <div className="product animated">
            <h2 className="title">{name}</h2>
            <div className="imageContainer">
                <div className="image">
                    <img width="100%" height="100%" src={imageUrl} alt="product"/>
                </div>
            </div>
            <div className="body">
                <h3>Price: {price}</h3>
                <p>{description}</p>
                <button onClick={buyHandler}>Buy</button>
            </div>
        </div>
    )
}

export default ProdItem