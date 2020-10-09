import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdenListAction } from '../redux/ordenDucks'

const Profile = () => {

    const dispatch = useDispatch()
    const ordenes = useSelector(state => state.ordenes.ordenList)

    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState({})

    const settRedirect = () => {
        setRedirect(true)
    }

    useEffect(() => {
        const log = localStorage.getItem('user')

        log === null? settRedirect(): setUser(JSON.parse(localStorage.getItem('user')))
        log !== null? dispatch(getOrdenListAction(JSON.parse(localStorage.getItem('user')).id)): setRedirect(false)
    }, [])

    return(
        <div className="mx-4 my-5">
            {redirect && <Redirect to='/login' />}
            <div className="row">
                <div className="col-md-4">
                    <div className="card px-3 py-4">
                        <h3 className="font-weight-bold mb-4">Perfil</h3>
                        <form>
                            <div className="form-group">
                                <span>Nombre</span>
                                <input type="text" name="nombre" className="form-control" value={user.nombre} readOnly></input>
                            </div>
                            <div className="form-group">
                                <span>Email</span>
                                <input type="email" name="correo" className="form-control" value={user.correo} readOnly></input>
                            </div>
                            <div className="form-group">
                                <span>Contraseña</span>
                                <input type="password" name="contraseña" className="form-control" value={user.contraseña} readOnly></input>
                            </div>
                        </form>
                        <Link to="/profile/direccion"><button className="button primmary w-100 mb-3">Agegar direccion de envio</button></Link>
                        <Link to="/login"><button className="button seconndary text-primary w-100 mb-2" onClick={() => localStorage.clear()}>Log Out</button></Link>
                    </div>
                </div>
                <div className="col-md-8">
                    <h4>Your Orders</h4>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Date</th>
                                <th scope="col">Total</th>
                                <th scope="col">Paid</th>
                                <th scope="col">Delivered</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                            <tbody>
                                {
                                    ordenes.map(ord => (
                                        <tr>
                                            <td>{ord.id}</td>
                                            <td>{ord.fecha}</td>
                                            <td>${ord.total}</td>
                                            <td>true</td>
                                            <td>false</td>
                                            <td><Link to={`/orderdetails/${ord.id}`}>Details</Link></td>
                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    )
}

export default Profile