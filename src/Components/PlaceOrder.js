import React, { Component } from 'react'
import { Redirect, withRouter, Link } from 'react-router-dom'
import CardCart from './CardCart'
import axios from 'axios'

class PlaceOrder extends Component {

    state = {
        redirect: false, 
        user: {},
        orderList: [],
        orderListE: false
    }

    setRedirect() {
        this.setState({
            redirect: true
        })
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
                        orderList: res.data
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
                        orderList: res.data
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
            this.state.orderList.map(ca => (
                p = p + (Number(ca.product.precio) * Number(ca.qty))
            ))
        }
        return(
            <div className="mb-5 mt-4 mx-3">
                {this.state.redirect && <Redirect to="/login" />}
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li class="breadcrumb-item"><Link to="/cart">Cart</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Place Order</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-md-8">
                        <di className="card py-4 px-2 mb-3">
                            <h5 className="font-weight-bold">Direccion de envío</h5>
                        </di>
                        <di className="card pt-4 px-2 mb-3">
                            <h5 className="font-weight-bold mb-3">Payment Method</h5>
                            <p>PayPal</p>
                        </di>
                        <di className="card py-4 px-2">
                            <h5 className="font-weight-bold mb-3">Order Items</h5>
                            {
                                this.state.orderList.map(ca => <CardCart key={ca.id} prod={ca}/>)
                            }
                        </di>
                    </div>
                    <div className="col-md-4">
                        <div className="card px-3 py-4 alert alert-secondary">
                            <button className="button primmary w-100 mb-4">Place Order</button>
                            <h4 className="font-weight-bold mb-4">Resumen de la Orden</h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <span>Items:</span> <br />
                                    <span>Shipping:</span> <br />
                                    <span>Tax:</span> <br />
                                    <span className="h4 text-danger font-weight-bold">Order Total:</span> 
                                </div>
                                <div className="col-md-6">
                                    <span>${p}</span> <br />
                                    <span>Free</span> <br />
                                    <span>${(Number(p) * 0.004).toFixed(2)}</span> <br />
                                    <span className="h4 text-danger font-weight-bold">${(p + (Number(p) * 0.004)).toFixed(2)}</span> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PlaceOrder)