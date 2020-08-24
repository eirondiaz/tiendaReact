import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CardCart extends Component {
    render(){
        return(
            <div className="mb-2">
                <div className="card px-2 py-2">
                    <div className="row">
                        <div className="col-md-2">
                            <img width="50px" height="80px" src="https://mms-images-prod.imgix.net/mms/images/catalog/b65970c681d6fa3ea1b6760d3c137415/colors/116223/views/alt/front_medium_extended.png?ixlib=rails-2.1.4&w=240&h=300&fit=crop&dpr=1&q=39&fm=png&auto=format" class="card-img-top" alt="..."></img>
                        </div>
                        <div className="col-md-10">
                            <p className="float-right">${this.props.prod.product.precio}</p>
                            <Link className="font-weight-bold" to={`/producto/${this.props.prod.product.id}`} >{this.props.prod.product.nombre}</Link>
                            <p>Qty: 4</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardCart