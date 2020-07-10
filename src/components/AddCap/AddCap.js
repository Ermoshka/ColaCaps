import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'
import withColaCapsService from '../hoc-helpers/withColaCapsService'
import { generateBase64FromImage } from '../../utils/gen64base'
import './add-cap.css'
import CapsPage from '../CapsPage/CapsPage'

class AddCap extends Component {

    state = {
        imgPrev: '',
        fileData: ''
    }

    addCapHandler = (values) => {
        const {addCap} = this.props
        let data = {...values, image: this.state.fileData}
        console.log(data)
        addCap(data)
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
                        <h2>New Cap</h2>
                        <p>Write down the data needed</p>
                        <hr />
                    </div>
                    <Formik
                        initialValues={{
                            name: '',
                            price: '',
                            amount: ''
                        }}
                        onSubmit={(values, {setSubmitting}) => {
                            console.log(values)
                            this.addCapHandler(values)
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
                                        label="Cap Name" />
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

const mapMethodsToProps = ({addCap}) => {
    return {
        addCap
    }
}

export default withColaCapsService(mapMethodsToProps)(AddCap)