import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import CardCart from './CardCart'

class Cart extends Component {

    state = {
        redirect: false,
        user: {},
        carrito: []
    }

    setRedirect() {
        this.setState({
            redirect: true
        })
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to="/login" />
        }
    }

    componentDidMount() {
        const log = localStorage.getItem('user')

        if (log === null) {
            this.setRedirect()
        }
        else {
            this.setState({
                user: log
            })

            const u = JSON.parse(localStorage.getItem('user'))
            axios.get('https://localhost:44381/api/usuarios/' + u.id + '/carritos')
                .then(res => {
                    this.setState({
                        carrito: res.data
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    componentWillUpdate() {
        if (this.state.user !== null) {
            const u = JSON.parse(localStorage.getItem('user'))
            axios.get('https://localhost:44381/api/usuarios/' + u.id + '/carritos')
                .then(res => {
                    this.setState({
                        carrito: res.data
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render(){
        var p = 0
        {
            this.state.carrito.map(ca => (
                p = p + (Number(ca.product.precio) * Number(ca.qty))
            ))
        }
        return(
            <div className="mx-3 mb-5 mt-4">
                {this.renderRedirect()}
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Cart</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-md-8">
                        <p className="float-right mr-2">Precio</p>
                        <h3>Your Cart</h3>
                        {
                            this.state.carrito.map(ca => <CardCart key={ca.id} prod={ca}/>)
                        }
                    </div>
                    <div className="col-md-4">
                        <div className="card px-3 py-4 alert alert-secondary">
                            <h5 className="mb-5"><b>Subtotal ({this.state.carrito.length} articulos): ${p}</b></h5>
                            <Link to='/placeorder'><input type="button" className="button primmary w-100" value="Proceder compra"></input></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart