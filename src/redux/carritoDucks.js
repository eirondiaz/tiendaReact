import axios from 'axios'

const dataInitial = {
    cartList: []
}

const GET_CART_SUCCESS = 'GET_CART_SUCCESS' 

export default function carritoReducer(state = dataInitial, action){
    switch(action.type){
        case GET_CART_SUCCESS:
            return {...state, cartList: action.payload}
        default:
            return state
    }
}

export const getCartAction = id => async (dispatch, getState) => {
    await axios.get('https://localhost:44348/api/usuarios/' + id + '/carts')
        .then(res => {
            dispatch({
                type: GET_CART_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => console.log(error))
}

export const postCartAction = (id, cart) => async (dispatch, getState) => {
    await axios.post('https://localhost:44348/api/usuarios/' + id + '/carts', cart)
        .then(res => console.log('success'))
        .catch(error => console.log(error))
}

export const deleteCartAction = (idUser, idCart) => async (dispatch, getState) => {
    await axios.delete('https://localhost:44348/api/usuarios/' + idUser + '/carts/' + idCart)
        .then(res => console.log('success'))
        .catch(error => console.log(error))
}