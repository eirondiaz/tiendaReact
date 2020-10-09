import axios from 'axios'
import { url } from './../Components/ApiUrl'

const dataInitial = {
    ordenList: [],
    ordenById: {},
    ordenProducto: []
}

const GET_ORDENLIST_SUCCESS = 'GET_ORDENLIST_SUCCESS'
const GET_ORDEN_BY_ID_SUCCESS = 'GET_ORDEN_BY_ID_SUCCESS'
const GET_ORDEN_PODUCT_SUCCESS = 'GET_ORDEN_PODUCT_SUCCESS'

export default function ordenReducer(state = dataInitial, action) {
    switch(action.type) {
        case GET_ORDENLIST_SUCCESS:
            return {...state, ordenList: action.payload} 
        case GET_ORDEN_BY_ID_SUCCESS:
            return {...state, ordenById: action.payload}
        case GET_ORDEN_PODUCT_SUCCESS:
            return {...state, ordenProducto: action.payload} 
        default:
            return state
    }
}

export const getOrdenListAction = id => async (dispatch, getState) => {
    await axios.get(url + '/usuarios/' + id + '/ordenes')
        .then(res => {
            dispatch({
                type: GET_ORDENLIST_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => {
            console.log(error)
        })
}

export const getOrdenByIdAction = (id, orderId) => async (dispatch, getState) => {
    await axios.get(url + '/usuarios/' + id + '/ordenes/' + orderId)
        .then(res => {
            dispatch({
                type: GET_ORDEN_BY_ID_SUCCESS,
                payload: res.data
            })
        })
        .catch(error => {
            console.log(error)
        })
}

export const getOrdenProductAction = (id, orderId) => async (dispatch, getState) => {
    await axios.get(url + '/usuarios/' + id + '/ordenes/' + orderId)
        .then(res => {
            dispatch({
                type: GET_ORDEN_PODUCT_SUCCESS,
                payload: JSON.parse(res.data.productos)
            })
        })
        .catch(error => {
            console.log(error)
        })
}

export const postOrdenAction = (id, orden) => async (dispatch, getState) => {
    await axios.post(url + '/usuarios/' + id + '/ordenes', orden)
        .then(res => console.log('success post orden'))
        .catch(error => console.log(error))
}