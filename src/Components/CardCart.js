import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class CardCart extends Component {

    deleteCart = () => {
        const u = JSON.parse(localStorage.getItem('user'))
        axios.delete('https://localhost:44348/api/usuarios/' + u.id + '/carts/' + this.props.prod.sku)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div className="mb-2">
                <div className="card px-2 py-2">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="px-3">
                                <img width="50px" height="80px" src="https://mms-images-prod.imgix.net/mms/images/catalog/b65970c681d6fa3ea1b6760d3c137415/colors/116223/views/alt/front_medium_extended.png?ixlib=rails-2.1.4&w=240&h=300&fit=crop&dpr=1&q=39&fm=png&auto=format" className="card-img-top" alt="..."></img>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <p className="float-right text-danger font-weight-bold mr-2">${Number(this.props.prod.price) * Number(this.props.prod.quantity)}</p>
                            <Link className="font-weight-bold" to={`/producto/${this.props.prod.productoId}`}><h5>{this.props.prod.name}</h5></Link>
                            <p><b>Qty: </b> {this.props.prod.quantity} <span className="ml-2"><button onClick={this.deleteCart} className="btn btn-outline-dark btn-sm">Eliminar</button></span></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardCart