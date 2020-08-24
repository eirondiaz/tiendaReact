import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Ap.css'

class Producto extends Component {

    state = {
        prod: {}
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`https://localhost:44381/api/productos/${id}`)
            .then(res => {
                this.setState({
                    prod: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div>
                <Link to="/" className="ml-5 mt-5"> Back</Link>
                <div className="row my-5 mx-5">
                    <div className="col-md-5">
                        <img width="50px" height="500px" src="https://mms-images-prod.imgix.net/mms/images/catalog/b65970c681d6fa3ea1b6760d3c137415/colors/116223/views/alt/front_medium_extended.png?ixlib=rails-2.1.4&w=240&h=300&fit=crop&dpr=1&q=39&fm=png&auto=format" class="card-img-top" alt="..."></img>
                    </div>
                    <div className="col-md-4">
                        <h3>{this.state.prod.nombre}</h3>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <p className="font-italic">(2 customers reviews)</p>
                        <p>Precio: <span className="text-danger">${this.state.prod.precio}</span></p>
                        <p>Description: <p>Nice Shirt</p></p>
                    </div>
                    <div className="col-md-3">
                        <div className="card px-3 py-4 font-weight-bold">
                            <p>Precio: ${this.state.prod.precio}</p>
                            <p>State: InStock</p>
                            <p>Qty: <select name="cars" id="cars">
                                        <option value="volvo">1</option>
                                        <option value="saab">2</option>
                                        <option value="mercedes">3</option>
                                        <option value="audi">4</option>
                                        <option value="audi">5</option>
                                    </select>
                            </p>
                            <input type="button" className="button primmary" value="Add to Cart"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Producto)