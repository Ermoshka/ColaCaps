import React from 'react'
import {Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import './register.css'

const Register = () => {

    const MyTextInput = ({ label, ...props}) => {
        const [field, meta] = useField(props);
        return (
            <>
                <input className="text-input" {...field} {...props} />
                <label htmlFor={props.id || props.name}>{label}</label>
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </>
        );
    }
    
    return (
        <div>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: ''
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                    lastName: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                    email: Yup.string()
                    .email('Invalid email address')
                    .required('Required')
                })}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        console.log(JSON.stringify(values, null, 2))
                        setSubmitting(true)
                    }, 400)
                }}
            >
                <Form>
                    <MyTextInput
                        label="Username"
                        name="username"
                        type="text"    
                    />
                    <label htmlFor="lastname">Last Name</label>
                    <label htmlFor="email">Email Address</label>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Register