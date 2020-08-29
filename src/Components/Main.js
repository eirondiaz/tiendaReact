import React, { useEffect } from 'react'
import './Ap.css'
import CardProduct from './CardProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getProductListAction } from '../redux/productoDucks'

const Main = () => {
    
    const dispatch = useDispatch()
    const productos = useSelector(store => store.productos.productList)

    useEffect(() => {
        dispatch(getProductListAction())
    }, [])
    
    return(
        <div className="container pb-5 pt-4">
            <div className="row">
                <div className="input-group input-group-sm mb-5 w-25 col-md-4 offset-md-4">
                    <input type="text" className="form-control" placeholder="Escribe tu busqueda..."></input>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button">Buscar</button>
                    </div>
                </div>
            </div>
            <div className="row"> 
                {
                    productos.map(prod => <CardProduct key={prod.id} product={prod}/>)
                }
            </div>
        </div>
    )
}

export default Main