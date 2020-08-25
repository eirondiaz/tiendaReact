import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Ap.css'

class Producto extends Component {

    state = {
        prod: {},
        stock: '1',
        user: {}
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

        const log = localStorage.getItem('user')
        if (log !== null) {
            this.setState({
                user: JSON.parse(localStorage.getItem('user'))
            }, () => console.log(this.state.user))
        }
    }

    addCart = () => {
        const { stock } = this.state
        if (localStorage.getItem('user') !== null) {
            const u = JSON.parse(localStorage.getItem('user'))
            axios.post('https://localhost:44381/api/usuarios/' + u.id + '/carritos', { qty: stock, productoId: Number(this.props.match.params.id)})
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div>
                <Link to="/" className="ml-5 mt-5"> Back</Link>
                <div className="row my-5 mx-3">
                    <div className="col-md-5">
                        <div className="px-4">
                            <img width="50px" height="500px" src="https://mms-images-prod.imgix.net/mms/images/catalog/b65970c681d6fa3ea1b6760d3c137415/colors/116223/views/alt/front_medium_extended.png?ixlib=rails-2.1.4&w=240&h=300&fit=crop&dpr=1&q=39&fm=png&auto=format" class="card-img-top" alt="..."></img>
                        </div>
                    </div>
                    <div className="col-md-3">
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
                    <div className="col-md-4">
                        <div className="card px-3 py-4 font-weight-bold alert alert-secondary">
                            <p>Precio: ${this.state.prod.precio}</p>
                            {
                                this.state.prod.stock === '0'?
                                <p>State: OutStock</p> 
                                : <p>State: InStock</p>
                            }
                            <p>Qty: <select name="stock" onChange={this.handleChange}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                            </p>
                            <Link to="/cart"><input type="button" onClick={this.addCart} className="button primmary w-100" value="Add to Cart"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Producto)