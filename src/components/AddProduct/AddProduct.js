import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
import { Formik } from 'formik'
import withColaCapsService from '../hoc-helpers/withColaCapsService'
import { generateBase64FromImage } from '../../utils/gen64base'

class AddProduct extends Component {

    state = {
        imgPrev: '',
        fileData: ''
    }

    addProductHandler = (values) => {
        const {addProduct} = this.props
        let data = {...values, image: this.state.fileData}
        console.log(data)
        addProduct(data)
    }

    filePickHandler = (files) => {
        if(files) {
            generateBase64FromImage(files[0]).then(img => {
                this.setState({
                    imgPrev: img,
                    fileData: files[0]
                })
            })
        }
    }
    
    render() {
        return (
            <main className="app-wrapper">
                <div className="block animated">
                    <div className="title">
                        <h2>New Product</h2>
                        <p>Write down the data needed</p>
                        <hr />
                    </div>
                    <Formik
                        initialValues={{
                            name: '',
                            price: '',
                            amount: '',
                            address: '',
                            description: ''
                        }}
                        onSubmit={(values, {setSubmitting}) => {
                            console.log(values)
                            this.addProductHandler(values)
                            setSubmitting(true)
                        }}
                    >
                        {formik => (
                            <form
                                encType="multipart/form-data"
                                onSubmit={formik.handleSubmit} 
                                className="form">
                                
                                <div className="form-group">
                                    <TextField 
                                        {...formik.getFieldProps('name')}
                                        name="name" 
                                        type="text"
                                        className="myinput" 
                                        id="standard-basic" 
                                        label="Product Name" />
                                </div>
                                <div className="form-group">
                                    <TextField 
                                        {...formik.getFieldProps('description')}
                                        name="description" 
                                        type="text"
                                        className="myinput" 
                                        id="standard-basic" 
                                        label="Description" />
                                </div>
                                <div className="form-group">
                                    <TextField 
                                        {...formik.getFieldProps('address')}
                                        name="address" 
                                        type="text"
                                        className="myinput" 
                                        id="standard-basic" 
                                        label="Address" />
                                </div>
                                <div className="form-group">
                                    <TextField 
                                        {...formik.getFieldProps('price')}
                                        type="number"
                                        name="price"
                                        id="standard-basic"
                                        label="Price"
                                    />
                                    <TextField 
                                        {...formik.getFieldProps('amount')}
                                        type="number"
                                        name="amount"
                                        id="standard-basic"
                                        label="Amount"
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="file" name="image" onChange={e => this.filePickHandler(e.target.files)} />
                                    <div className="img-prev">
                                        {this.state.imgPrev && (
                                            <img 
                                                src={this.state.imgPrev} 
                                                width="110px" 
                                                height="170px" 
                                                alt="img preview"
                                            />
                                        )}
                                    </div>
                                </div>
                                <button type="submit">Add</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </main>
        )
    }
}

const mapMethodsToProps = ({addProduct}) => {
    return {
        addProduct
    }
}

export default withColaCapsService(mapMethodsToProps)(AddProduct)