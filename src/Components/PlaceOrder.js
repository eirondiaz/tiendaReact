import React, { useState, useEffect } from 'react'
import { Redirect, withRouter, Link } from 'react-router-dom'
import CardCart from './CardCart'
import { getCartAction } from '../redux/carritoDucks'
import { useDispatch, useSelector } from 'react-redux'
import PaypalCheckoutButtonn from './PaypalChecoutButtonn'

const PlaceOrder = () => {

    const dispatch = useDispatch()
    const orders = useSelector(store => store.carritos.cartList)

    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState({})

    const settRedirect = () => {
        setRedirect(true)
    }

    useEffect(() => {
        const log = localStorage.getItem('user')

        log === null? settRedirect(): setUser(JSON.parse(log))
        log !== null? dispatch(getCartAction(JSON.parse(log).id)): settRedirect()
    }, [orders])
    
    var p = 0
    {
        orders.map(ca => (
            p = p + (Number(ca.product.precio) * Number(ca.qty))
        ))
    }

    var totall = (p + (Number(p) * 0.004)).toFixed(2)

    const order = {
        customer: '123456',
        total: '476.00',
        items: [
            {
                sku: '313',
                name: 'sdasda',
                price: '434.00',
                quantity: 1,
                currency: 'MXN'
            },
            {
                sku: '31sa3',
                name: 'sdkjha',
                price: '42.00',
                quantity: 1,
                currency: 'MXN'
            }
        ]
    }

    const orderr = {
        customer: '123456',
        total: '551.00',
        items: [
          {
            sku: '112',
            name: 'Camisa ReactJS',
            price: '301.00',
            quantity: 1,
            currency: 'MXN'
          },
          {
            sku: '99',
            name: 'Camisa JS',
            price: '125.00',
            quantity: 2,
            currency: 'MXN'
          },
        ],
      };

    return(
        <div className="mb-5 mt-4 mx-3">
            {redirect && <Redirect to="/login" />}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/cart">Cart</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Place Order</li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-md-8">
                    <div className="card py-4 px-2 mb-3">
                        <h5 className="font-weight-bold">Direccion de envío</h5>
                    </div>
                    <div className="card pt-4 px-2 mb-3">
                        <h5 className="font-weight-bold mb-3">Payment Method</h5>
                        <p>PayPal</p>
                    </div>
                    <div className="card py-4 px-2">
                        <h5 className="font-weight-bold mb-3">Order Items</h5>
                        {
                            orders.map(ca => <CardCart key={ca.id} prod={ca}/>)
                        }
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card px-3 py-4 alert alert-secondary">
                        <PaypalCheckoutButtonn order={orderr}/>
                        <button className="button primmary w-100 mb-4" disabled={orders.length === 0}>Place Order</button>
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

export default withRouter(PlaceOrder)