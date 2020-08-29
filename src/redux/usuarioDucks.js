import axios from 'axios'

const initialState = {
    redirect: false
}

const POST_USUARIO_SUCCESS = 'POST_USUARIO_SUCCESS'

export default function usuarioReducer(state = initialState, action) {
    switch(action.type){
        case POST_USUARIO_SUCCESS:
            return {redirect: action.payload}
        default:
            return state    
    }
}

export const postUsuarioAction = user => async dispatch => {
    await axios.post('https://localhost:44381/api/usuarios/', user)
        .then(res => {
            dispatch({
                type: POST_USUARIO_SUCCESS,
                payload: true
            })
        })
        .catch(error => console.log(error))
} 