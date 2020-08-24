import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import './Ap.css'

class Registro extends Component {

    state = {
        nombre: '',
        correo: '',
        contraseña: '',
        redirect: false
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/login' />
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        axios.post('https://localhost:44381/api/usuarios/', this.state)
            .then(res => {
                console.log(res)
                this.setRedirect()
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div className="row my-5">
                {this.renderRedirect()}
                <div className="col-md-4 offset-md-4">
                    <div className="card px-3 py-4">
                        <h3 className="font-weight-bold mb-4">Crear Cuenta</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <span>Tu Nombre</span>
                                <input type="text" className="form-control" name="nombre" onChange={this.handleChange} required></input>
                            </div>
                            <div className="form-group">
                                <span>Email</span>
                                <input type="email" className="form-control" name="correo" onChange={this.handleChange} required></input>
                            </div>
                            <div className="form-group">
                                <span>Contraseña</span>
                                <input type="password" className="form-control" name="contraseña" onChange={this.handleChange} required></input>
                            </div>
                            <div className="form-group">
                                <span>Repetir contraseña</span>
                                <input type="password" className="form-control" required></input>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="button primmary w-100" value="Crear tu Cuenta" required></input>
                            </div>
                            <p>Ya tienes una cuenta? <Link to="/login">Iniciar Sesion</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Registro