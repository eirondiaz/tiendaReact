import React from 'react'
import { Provider } from 'react-redux'
import generateStore from './redux/store'
import App from './App'

const Appp = () => {

    const store = generateStore()

    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default Appp