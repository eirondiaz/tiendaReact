import React, { useEffect } from 'react' 
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByIdAction } from '../redux/productoDucks'
import { url } from './ApiUrl'

const CardCart = ({ prod }) => {

    const dispatch = useDispatch()
    const producto = useSelector(state => state.productos.productById)

    useEffect(() => {
        dispatch(getProductByIdAction(prod.productoId))
        //console.log(producto)
    }, [])

    const deleteCart = () => {
        const u = JSON.parse(localStorage.getItem('user'))
        axios.delete(url + '/usuarios/' + u.id + '/carts/' + prod.id)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    return(
        <div className="mb-2">
            <div className="card px-2 py-2">
                <div className="row">
                    <div className="col-md-2">
                        <div className="px-3">
                            <img width="50px" height="80px" src={producto.foto} className="card-img-top" alt="..."></img>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <p className="float-right text-danger font-weight-bold mr-2">${Number(prod.price) * Number(prod.quantity)}</p>
                        <Link className="font-weight-bold" to={`/producto/${prod.productoId}`}><h5>{prod.name}</h5></Link>
                        <p><b>Qty: </b> {prod.quantity} <span className="ml-2"><button onClick={deleteCart} className="btn btn-outline-dark btn-sm">Eliminar</button></span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardCart