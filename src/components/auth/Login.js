import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const Login = () => {

    const initVals = {
        username: '',
        password: ''
    }

    const validate = values => {
        const errors = {}
        if(!values.username) {
            errors.username = "Required user name"
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
        ) {
            errors.username = "Invalid username!"
        } else if (!values.password) {
            errors.password = "Required password!"
        }
        return errors
    }

    const onSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            console.log(JSON.stringify(values, null, 2))
            setSubmitting(false)
        }, 400)
    }
    
    return (
        <div>
            <h2>Welcome to ColaCaps</h2>
            <div>
                <Formik
                    initialValues={initVals}
                    validate={validate}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field
                                type="email"
                                name="username"
                            />
                            <ErrorMessage name="username" component="div"/>
                            {/* {errors.username && touched.username && errors.username} */}
                            <Field 
                                type="password"
                                name="password"
                            />
                            <ErrorMessage name="password" component="div"/>
                            {/* {errors.password && touched.password && errors.password} */}
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login
