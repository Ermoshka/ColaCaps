import React, { Component, Fragment } from 'react'
import './shop.css'
import withColaCapsService from '../hoc-helpers/withColaCapsService'
import ProdItem from './prodItem/ProdItem'
import { MyProdItem } from './prodItem/MyProdItem'

class ShopPage extends Component {

    state = {
        myProducts: false,
        prods: []
    }

    componentDidMount() {
        const { getAllProducts, getMyProducts, isAuth } = this.props
        if(!isAuth) {
            getAllProducts().then(response => {
                this.setState({
                    prods: response.data
                })
            })
        } else {
            getMyProducts(this.props.userName)
            .then(result => {
                this.setState({
                    prods: result.data,
                    myProducts: true
                })
            })
        }
    }

    getProducts = () => {
        const {getAllProducts, getMyProducts} = this.props
        if(!this.state.myProducts) {
            getMyProducts(this.props.userName)
            .then(result => {
                this.setState({
                    prods: result.data,
                    myProducts: true
                })
            })
        } else {
            getAllProducts().then(response => {
                this.setState({
                    prods: response.data,
                    myProducts: false
                })
            })
        }
    }

    boughtHandler = (name, id) => {
        const {buyProduct, onBought} = this.props
        buyProduct(name, id).then(result => {
            onBought(result)
        })
    }
    
    render() {
        const {isAuth, userName} = this.props
        return (
            <main className="app-wrapper">
                <div className="tabs">
                    {
                        isAuth && (
                            <Fragment>
                                <button 
                                    onClick={this.getProducts} 
                                    className={['tab', this.state.myProducts ? 'active' : ''].join(' ')}>My purchases</button>
                                <button 
                                    onClick={this.getProducts} 
                                    className={['tab', !this.state.myProducts ? 'active' : ''].join(' ')}>All products</button>
                            </Fragment>
                        )
                    }
                </div>
                <div className="products">
                    {
                        this.state.prods.map(prod => {
                            if (this.state.myProducts) {
                                return (
                                    <MyProdItem
                                        key={prod.id} 
                                        amount={prod.amount}
                                        lastPurchase={prod.lastPurchase}
                                        name={prod.name}
                                        address={prod.address}
                                        imageUrl={"http://localhost:8080/" + prod.imageUrl}
                                    />
                                )
                            }
                            return (
                                <ProdItem
                                    key={prod.id}
                                    isAuth={isAuth}
                                    name={prod.name}
                                    id={prod.id}
                                    price={prod.price}
                                    userName={userName}
                                    description={prod.description}
                                    imageUrl={"http://localhost:8080/" + prod.imageUrl}
                                    onBought={this.boughtHandler} />
                            )
                        })
                    }
                </div>
            </main>
        )
    }
}

const mapMethodsToProps = ({getMyProducts, getAllProducts, buyProduct}) => {
    return {
        getAllProducts,
        getMyProducts,
        buyProduct
    }
}

export default withColaCapsService(mapMethodsToProps)(ShopPage)