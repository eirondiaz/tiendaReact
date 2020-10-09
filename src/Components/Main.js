import React, { useEffect, useState } from 'react'
import './Ap.css'
import CardProduct from './CardProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getProductListAction } from '../redux/productoDucks'

const Main = () => {
    
    const dispatch = useDispatch()
    const productos = useSelector(store => store.productos.productList)

    const [busqueda, setBusqueda] = useState('')
    const [buscando, setBuscando] = useState(false)

    const handleChange = e => {
        const { value } = e.target
        setBusqueda(value)
    }

    useEffect(() => {
        dispatch(getProductListAction())
    }, [])

    let busquedaList = []
    const Buscar =  () => {
        productos.forEach(e => {
            if (e.nombre.includes(busqueda)) {
                busquedaList.push(e)
            }
        })

        setBuscando(true)
        console.log(busquedaList)
    }
    
    return(
        <div className="container pb-5 pt-4">
            <div className="row">
                <div className="input-group input-group-sm mb-5 w-25 col-md-4 offset-md-4">
                    <input type="text" className="form-control" onChange={handleChange} placeholder="Escribe tu busqueda..." />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" onClick={Buscar} type="button">Buscar</button>
                    </div>
                </div>
            </div>
            {buscando && <p className="text-secondary font-italic">Busqueda: <span className="text-primary">{busqueda}</span><span onClick={() => setBuscando(false)} className="badge badge-pill badge-warning font-weight-bold text-dark ml-2">x</span></p>}
            <div className="row"> 
                {
                    buscando? 
                    busquedaList.map(prod => <CardProduct key={prod.id} product={prod}/>)
                    : productos.map(prod => <CardProduct key={prod.id} product={prod}/>)
                }
            </div>
        </div>
    )
}

export default Main