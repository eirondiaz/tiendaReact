import React from 'react'
import { deleteCartAction } from '../redux/carritoDucks'
import { useDispatch } from 'react-redux'

const CardDir = props => {   

    const dispatch = useDispatch()
    
    return(
        <div className="col-md-4 mt-2 mb-3">
            <div className="card px-3 py-4">
                <p><b>Direccion:</b> {props.direc.address}</p>
                <p><b>Ciudad:</b> {props.direc.ciudad}</p>
                <p><b>Codigo Postal:</b> {props.direc.cp}</p>
                <p><b>Pais:</b> {props.direc.pais}</p>
                <input type="button" onClick={() => dispatch(deleteCartAction(props.direc.id, props.direc.usuarioId))} className="btn btn-outline-dark w-100" value="Eliminar"></input>
            </div>
        </div>
    )
}

export default CardDir