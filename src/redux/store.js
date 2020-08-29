import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import productReducer from './productoDucks'
import carritoReducer from './carritoDucks'
import usuarioReducer from './usuarioDucks'

const rootReducer = combineReducers({
    productos: productReducer,
    carritos: carritoReducer,
    usuarios: usuarioReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store
}