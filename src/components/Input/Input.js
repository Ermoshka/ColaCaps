import React, { useState } from 'react'
import { useField } from 'formik'
import './input.css'

const Input = ({ label, ...props }) => {

    const [meta, field] = useField(props)
    const [focused, setFocused] = useState(false)
    const [val, setVal] = useState("")
    const [filled, setFilled] = useState(false)

    const changeHandler = (event) => {
        // onChange(event.target.value)
        setVal(event.target.value)
    }

    return (
        <div className={['form-group', focused ? 'focused' : ''].join(' ')}>
            <label className="form-label" htmlFor={props.name}> {label} </label>
            <input
                {...field}
                className={['form-input', filled ? 'filled' : ''].join(' ')}
                // onChange={changeHandler}
                onBlur={() => {
                    if (val.length === 0) {
                        setFilled(false)
                        setFocused(false)
                    } else {
                        setFilled(true)
                        setFocused(true)
                    }
                }}
                onFocus={() => {
                    if (val.length > 0) {
                        setFocused(true)
                    } else {
                        setFocused(!focused)
                    }
                }}
            />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>

    )
}

export default Input