import React from 'react'

export const MyProdItem = ({name, amount, lastPurchase, address, imageUrl}) => {
    return (
        <div className="product">
            <h2 className="title">{name}</h2>
            <div className="imageContainer">
                <div className="image">
                    <img width="100%" height="100%" src={imageUrl} alt="product"/>
                </div>    
            </div>
            <div className="body">
                <p>Amount: {amount}</p>
                <p>Last bought: {lastPurchase}</p>
                <p>Address: {address}</p>
            </div> 
        </div>
    )
}
