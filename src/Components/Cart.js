import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import CardCart from './CardCart'
import { useDispatch, useSelector } from 'react-redux'
import { getCartAction } from '../redux/carritoDucks'

const Cart = () => {

    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState({})

    const dispatch = useDispatch()
    const carritoList = useSelector(state => state.carritos.cartList)

    const settRedirect = () => {
        setRedirect({
            redirect: true
        })
    }

    useEffect(() =>{
        const log = localStorage.getItem('user')

        log === null? settRedirect() : setUser(log)  
        log === null? settRedirect() : dispatch(getCartAction(JSON.parse(log).id))  
    }, [carritoList])

    var p = 0
    {
        carritoList.map(ca => (
            p = p + (Number(ca.product.precio) * Number(ca.qty))
        ))
    }
    return(
        <div className="mx-3 mb-5 mt-4">
            {redirect && <Redirect to="/login" />}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Cart</li>
                </ol>
            </nav>
            <div className="row">
                <div className="col-md-8">
                    <p className="float-right mr-2">Precio</p>
                    <h3>Your Cart</h3>
                    {
                        carritoList.map(ca => <CardCart key={ca.id} prod={ca}/>)
                    }
                    {carritoList.length === 0? <p className="text-center display-3 my-5">Carrito Vacío</p>: null}
                </div>
                <div className="col-md-4">
                    <div className="card px-3 pt-4 pb-5 alert alert-secondary">
                        <h5 className="mb-5"><b>Subtotal ({carritoList.length} articulos): ${p}</b></h5>
                        <Link to='/placeorder'><input type="button" className="button primmary w-100" value="Proceder compra" disabled={carritoList.length === 0}/></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart