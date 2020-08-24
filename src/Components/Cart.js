import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
        }

        const u = JSON.parse(localStorage.getItem('user'))
        axios.get('https://localhost:44381/api/usuarios/' + u.id + '/carritos')
            .then(res => {
                this.setState({
                    carrito: res.data
                }, () => console.log(this.state.carrito))
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div className="mx-3 my-5">
                {this.renderRedirect()}
                <div className="row">
                    <div className="col-md-8">
                        <p className="float-right mr-2">Precio</p>
                        <h3>Your Cart</h3>
                        {
                            this.state.carrito.map(ca => <CardCart key={ca.id} prod={ca}/>)
                        }
                    </div>
                    <div className="col-md-4">
                        <div className="card px-3 py-4">
                            <h5 className="mb-5"><b>Subtotal ({this.state.carrito.length} articulos): $195</b></h5>
                            <input type="button" className="button primmary w-100" value="Proceder compra"></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart