import React from 'react'
import { Link } from 'react-router-dom' 

const CardProduct = props => {
    return(
        <div className="col-md-3">
            <div className="card mb-5">
                <img width="50px" height="270px" src="https://mms-images-prod.imgix.net/mms/images/catalog/b65970c681d6fa3ea1b6760d3c137415/colors/116223/views/alt/front_medium_extended.png?ixlib=rails-2.1.4&w=240&h=300&fit=crop&dpr=1&q=39&fm=png&auto=format" className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <Link to={`/producto/${props.product.id}`} className="font-weight-bold text-primary h4">{props.product.nombre}</Link>
                    <p>{props.product.categoria}</p>
                    <p className="font-weight-bold">${props.product.precio}</p>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <p className="font-italic">(2 reviews)</p>
                </div>
            </div>
        </div>
    )
}

export default CardProduct