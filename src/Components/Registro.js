import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Ap.css'
import { useDispatch, useSelector } from 'react-redux'
import { postUsuarioAction } from '../redux/usuarioDucks'

const Registro = () => {

    const [usuario, setUsuario] = useState({})

    const dispatch = useDispatch()
    const redirect = useSelector(state => state.usuarios.redirect)

    const handleChange = e => {
        const { name, value } = e.target
        setUsuario({
            ...usuario,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(postUsuarioAction(usuario))
    }

    return(
        <div className="row my-5">
            {redirect && <Redirect to='/login' />}
            <div className="col-md-4 offset-md-4">
                <div className="card px-3 py-4">
                    <h3 className="font-weight-bold mb-4">Crear Cuenta</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <span>Tu Nombre</span>
                            <input type="text" className="form-control" name="nombre" onChange={handleChange} required></input>
                        </div>
                        <div className="form-group">
                            <span>Email</span>
                            <input type="email" className="form-control" name="correo" onChange={handleChange} required></input>
                        </div>
                        <div className="form-group">
                            <span>Contraseña</span>
                            <input type="password" className="form-control" name="contraseña" onChange={handleChange} required></input>
                        </div>
                        <div className="form-group">
                            <span>Repetir contraseña</span>
                            <input type="password" className="form-control" required></input>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="button primmary w-100" value="Crear tu Cuenta" />
                        </div>
                        <p>Ya tienes una cuenta? <Link to="/login">Iniciar Sesion</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registro