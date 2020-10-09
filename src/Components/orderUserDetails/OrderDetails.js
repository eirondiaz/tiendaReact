import React, { useState, useEffect } from 'react'
import { Redirect, withRouter, Link, useParams, useLocation } from 'react-router-dom'
import CardCart from '../CardCart'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdenByIdAction, getOrdenProductAction } from '../../redux/ordenDucks'
import CardOrderDetails from './CardOrderDetails'

const OrderDetails = () => {

    const { id } = useParams()

    const dispatch = useDispatch()
    const orders = useSelector(store => store.ordenes.ordenById)
    const productos = useSelector(store => store.ordenes.ordenProducto)

    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState({})

    const settRedirect = () => {
        setRedirect(true)
    }

    useEffect(() => {
        const log = localStorage.getItem('user')

        log === null? settRedirect(): setUser(JSON.parse(log))
        log !== null? dispatch(getOrdenByIdAction(JSON.parse(log).id, id)): settRedirect()
        log !== null? dispatch(getOrdenProductAction(JSON.parse(log).id, id)): settRedirect()

    }, [orders])

    var p = 0
    {
        productos.map(ca => (
            p = p + (Number(ca.price) * Number(ca.quantity))
        ))
    }

    return(
        <div className="mb-5 mt-4 mx-3">
            {redirect && <Redirect to="/login" />}
            <div className="row">
                <div className="col-md-8">
                    <div className="card py-4 px-2 mb-3">
                        <h5 className="font-weight-bold">Direccion de envío</h5>
                    </div>
                    <div className="card pt-4 px-2 mb-3">
                        <h5 className="font-weight-bold mb-3">Payment Method</h5>
                        <p>PayPal</p>
                        <h4>Pagado: {orders.fecha}</h4>
                    </div>
                    <div className="card py-4 px-2">
                        <h5 className="font-weight-bold mb-3">Order Items</h5>
                        {
                            productos.map(ca => <CardOrderDetails key={ca.sku} prod={ca}/>)
                        }
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card px-3 py-4 alert alert-secondary">
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

export default withRouter(OrderDetails)