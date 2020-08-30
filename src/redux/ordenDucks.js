import axios from 'axios'

const dataInitial = {
    ordenList: []
}

const GET_ORDENLIST_SUCCESS = 'GET_ORDENLIST_SUCCESS'

export default function ordenReducer(state = dataInitial, action) {
    switch(action.type) {
        case GET_ORDENLIST_SUCCESS:
            return {...state, ordenList: action.payload} 
        default:
            return state
    }
}

export const getOrdenListAction = id => async (dispatch, getState) => {
    await axios.get('https://localhost:44348/api/usuarios/' + id + '/ordenes')
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

export const postOrdenAction = (id, orden) => async (dispatch, getState) => {
    await axios.post('https://localhost:44348/api/usuarios/' + id + '/ordenes', orden)
        .then(res => console.log('success post orden'))
        .catch(error => console.log(error))
}