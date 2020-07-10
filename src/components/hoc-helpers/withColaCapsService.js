import React from 'react'
import { ColaCapsServiceConsumer } from './colacaps-service-context'

const withColaCapsService = (mapMethodsToProps) => (Wrapped) => {
    return (props) => {
        return (
            <ColaCapsServiceConsumer>
                {
                    (colacapsService) => {
                        return (
                            <Wrapped {...props} {...mapMethodsToProps(colacapsService)} 
                                />
                        )
                    }
                }
            </ColaCapsServiceConsumer>
        )
    }
}

export default withColaCapsService