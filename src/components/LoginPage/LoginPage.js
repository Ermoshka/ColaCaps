import React, { Component } from 'react'
import './login.css'
import { Link, withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik'
import * as Yup from 'yup'

class LoginPage extends Component {

    state = {

    }

    logInHandler = ({ username, password }) => {
        console.log(username, password)
        let form = new FormData()
        form.append('username', username)
        form.append('password', password)
        fetch("http://localhost:8080/auth/login", {
            method: 'POST',
            body: form
        }).then(result => {
            if(result.ok) {
                return result.json()
            }
        }).then(response => {
            this.props.onLoggedIn(response)
            this.props.history.push('/caps')
        })
    }

    render() {
        return (
            <main className="app-wrapper">
                <div className="block animated">
                    <div className="title">
                        <h2>Log in</h2>
                        <p>Nice to see you in ColaCaps</p>
                        <p>Don't have an account? Create it <Link to="/register">here</Link></p>
                        <hr />
                    </div>
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        validationSchema={Yup.object({
                            username: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('required'),
                            password: Yup.string()
                                .min(7, 'At least 7 characters')
                                .required('required')
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values)
                            this.logInHandler(values)
                            setSubmitting(true)
                        }}
                    >

                        {formik => (
                            <form className="form" onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <TextField
                                        {...formik.getFieldProps('username')} 
                                        className="myinput" 
                                        id="standard-basic" 
                                        label="User Name"
                                        name="username"
                                        error={formik.errors.username ? true : false}
                                        helperText={formik.errors.username}
                                        />
                                </div>
                                <div className="form-group">
                                    <TextField 
                                        {...formik.getFieldProps('password')}
                                        className="myinput" 
                                        id="standard-basic" 
                                        label="Password"
                                        type="password"
                                        name="password"
                                        error={formik.errors.password ? true : false}
                                        helperText={formik.errors.password} 
                                        />
                                </div>
                                <button type="submit">Submit</button>

                            </form>
                            )
                        }

                    </Formik>

                </div>
            </main>
        )
    }
}

export default withRouter(LoginPage)