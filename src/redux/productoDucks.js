import axios from 'axios'
import { url } from './../Components/ApiUrl'

const dataInitial = {
    productList: [],
    productById: {}
}

const GET_PRODUCTLIST_SUCCESS = 'GET_PRODUCTLIST_SUCCESS'
const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS'

export default function productReducer(state = dataInitial, action) {
    switch(action.type) {
        case GET_PRODUCTLIST_SUCCESS:
            return {...state, productList: action.payload}
        case GET_PRODUCT_BY_ID_SUCCESS:
            return {...state, productById: action.payload}    
        default:
            return state
    }
}

export const getProductListAction = () => async (dispatch, getState) => {
    await axios.get(url + '/productos/')
        .then(res => {
            dispatch({
                type: GET_PRODUCTLIST_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => {
            console.log(error)
        })
}

export const getProductByIdAction = id => async (dispatch, getState) => {
    await axios.get(url + '/productos/' + id)
        .then(res => {
            dispatch({
                type: GET_PRODUCT_BY_ID_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => console.log(error))
}

export const postProductAction = product => async (dispatch, getState) => {
    await axios.post(url + '/productos/', product)
        .then(res => console.log('success'))
        .catch(error => console.log('success'))
}