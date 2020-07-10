import React, { Component } from 'react'
import './opencap.css'
import TextField from '@material-ui/core/TextField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import withColaCapsService from '../hoc-helpers/withColaCapsService'
import { withRouter } from 'react-router-dom'

class OpenCapPage extends Component {

    state = {
        firstCap: ''
    }
    
    componentDidMount() {
        // let cap = localStorage.getItem('colacaps_firstcap')
        // this.setState({
        //     firstCap: cap
        // })
        // this.inputRef.current.value = cap
    }
    
    capCheckHandler = ({capCode}) => {
        const {isAuth, checkCapCode, history} = this.props
        // let cap = localStorage.setItem('colacaps_firstcap', capCode)
        if(!isAuth) {
            this.setState({
                firstCap: localStorage.getItem('colacaps_firstcap')
            })
            history.push('/register')
        } else {
            let username = localStorage.getItem('colacaps_username')
            // if(!username) return;
            checkCapCode(username, capCode)
            .then(result => {
                console.log(result)
                this.props.onOpened(result)
            })
        }
    }
    
    render() {
        return (
            <main className="app-wrapper">
                <div className="opencap animated">
                    <div className="title">
                        <h2>Check your luck</h2>
                        <p>Write down the code of cap and get more balance!</p>
                        <hr/>
                    </div>
                    <div className="body">
                        <Formik
                            initialValues={{
                                capCode: ''
                            }}
                            validationSchema={Yup.object({
                                capCode: Yup.string()
                                    .min(7, 'At least 7 characters')
                                    .required('required')
                            })}
                            onSubmit={(values, {setSubmitting}) => {
                                setSubmitting(true)
                                this.capCheckHandler(values)
                            }}
                        >
                            {formik => (
                                <form 
                                    onSubmit={formik.handleSubmit}
                                    className="form">
                                    <div className="form-group">
                                        <TextField
                                            // defaultValue="lmao"
                                            {...formik.getFieldProps('capCode')} 
                                            id="standard-basic" 
                                            label="Cap code" 
                                            className="capcode"
                                            name="capCode"
                                            error={formik.errors.capCode ? true : false}
                                            helperText={formik.errors.capCode}
                                            // defaultValue={this.state.firstCap}
                                            // key={this.state.firstCap}
                                            type="text"
                                            // value={this.state.firstCap}
                                            // ref={this.inputRef}
                                        />
                                    </div>

                                    <button type="submit">Submit</button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </main>
        )
    }
}

const mapMethodsToProps = (service) => {
    return {
        checkCapCode: service.checkCapCode
    }
}

export default withRouter(withColaCapsService(mapMethodsToProps)(OpenCapPage))