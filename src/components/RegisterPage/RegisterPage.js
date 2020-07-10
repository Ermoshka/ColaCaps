import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Input from '../Input/Input'
import { TextField } from '@material-ui/core'
import { Formik } from 'formik'
import * as Yup from 'yup'

export default class RegisterPage extends Component {

    regHandler = ({email, password, username}) => {
        const form = new FormData()
        form.append('email', email)
        form.append('username', username)
        form.append('password', password)
        fetch("http://localhost:8080/auth/register", {
            method: 'POST',
            body: form
        }).then(result => {
            if (result.ok) {
                this.props.history.push('/login')
                // return result.json()
            }
        })
    }
    
    render() {
        return (
            <main className="app-wrapper">
                <div className="block animated">
                    <div className="title">
                        <h2>Sign up</h2>
                        <p>Welcome to ColaCaps</p>
                        <p>Do you have an account? Log in <Link to="/login">here</Link></p>
                        <hr />
                    </div>

                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={Yup.object({
                            username: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('required'),
                            password: Yup.string()
                                .min(7, 'At least 7 characters')
                                .required('required'),
                            email: Yup.string()
                                .email('Invalid email address')
                                .required('required'),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords do not match')
                                .required('required')
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            console.log(values)
                            this.regHandler(values)
                            setSubmitting(true)
                        }}
                    >

                        {formik => (
                            <form className="form" onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <TextField
                                        {...formik.getFieldProps('username')}
                                        name="username" 
                                        className="myinput" 
                                        id="standard-basic" 
                                        label="User Name" 
                                        error={formik.errors.username ? true : false}
                                        helperText={formik.errors.username}
                                        />
                                </div>
                                <div className="form-group">
                                    <TextField 
                                        {...formik.getFieldProps('email')}
                                        className="myinput" 
                                        id="standard-basic"
                                        name="email" 
                                        label="Email" 
                                        type="email"
                                        error={formik.errors.email ? true : false}
                                        helperText={formik.errors.email} 
                                        />
                                </div>
                                <div className="form-group">
                                    <TextField
                                        {...formik.getFieldProps('password')}
                                        name="password" 
                                        className="myinput" 
                                        id="standard-basic" 
                                        label="Password" 
                                        type="password" 
                                        error={formik.errors.password ? true : false}
                                        helperText={formik.errors.password}
                                        />
                                </div>
                                <div className="form-group">
                                    <TextField 
                                        {...formik.getFieldProps('confirmPassword')}
                                        className="myinput" 
                                        id="standard-basic" 
                                        label="Repeat Password" 
                                        type="password"
                                        name="confirmPassword"
                                        error={formik.errors.confirmPassword ? true : false}
                                        helperText={formik.errors.confirmPassword}
                                        />
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        )}
                        
                    </Formik>
                    <form className="form">
                    </form>
                </div>
            </main>
        )
    }
}
