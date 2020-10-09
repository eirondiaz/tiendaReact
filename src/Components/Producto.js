import React, { useState, useEffect } from 'react'
import { withRouter, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByIdAction } from '../redux/productoDucks'
import { postCartAction } from '../redux/carritoDucks'
import { Link } from 'react-router-dom'
import './Ap.css'

const Producto = () => {

    const {id} = useParams()

    const [stock, setStock] = useState('1')
    const [user, setUser] = useState({})

    const dispatch = useDispatch()
    const producto = useSelector(state => state.productos.productById)

    useEffect(() =>{
        dispatch(getProductByIdAction(id))

        const log = localStorage.getItem('user')

        log !== null? setUser(JSON.parse(log)): setUser({})
    }, [])

    const handleChange = e => {
        const { value } = e.target
        setStock(value)
    }

    return(
        <div>
            <Link to="/" className="ml-5 mt-5"> Back</Link>
            <div className="row my-5 mx-3">
                <div className="col-md-5">
                    <div className="px-4">
                        <img width="50px" height="500px" src={producto.foto} className="card-img-top" alt="..."></img>
                    </div>
                </div>
                <div className="col-md-3">
                    <h3>{producto.nombre}</h3>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                    <p className="font-italic">(2 customers reviews)</p>
                    <p>Precio: <span className="text-danger">${producto.precio}</span></p>
                    <p>Description: <p>Nice Shirt</p></p>
                </div>
                <div className="col-md-4">
                    <div className="card px-3 py-4 font-weight-bold alert alert-secondary">
                        <p>Precio: ${producto.precio}</p>
                        {
                            producto.stock === '0'?
                            <p>State: OutStock</p> 
                            : <p>State: InStock</p>
                        }
                        <p>Qty: <select name="stock" onChange={handleChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                        </p>
                        {
                            producto.stock === '0'?
                            <Link to="/cart"><input type="button" onClick={() => dispatch(postCartAction(user.id, {quantity: stock, productoId: Number(id)}))} className="button primmary w-100" value="Add to Cart"  disabled/></Link>
                            : <Link to="/cart"><input type="button" onClick={() => dispatch(postCartAction(user.id, {quantity: Number(stock), productoId: Number(id)}))} className="button primmary w-100" value="Add to Cart"/></Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Producto)