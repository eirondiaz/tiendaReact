import React, { Component } from 'react'
import axios from 'axios'
import { url } from './ApiUrl'

class CardDir extends Component {

    deleteDir = () => {
        axios.delete(url + '/usuarios/' + this.props.direc.usuarioId + '/direcciones/' + this.props.direc.id)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div className="col-md-4 mt-2 mb-3">
                <div className="card px-3 py-4">
                    <p><b>Direccion:</b> {this.props.direc.address}</p>
                    <p><b>Ciudad:</b> {this.props.direc.ciudad}</p>
                    <p><b>Codigo Postal:</b> {this.props.direc.cp}</p>
                    <p><b>Pais:</b> {this.props.direc.pais}</p>
                    <input type="button" onClick={this.deleteDir} className="btn btn-outline-dark w-100" value="Eliminar"></input>
                </div>
            </div>
        )
    }
}

export default CardDir