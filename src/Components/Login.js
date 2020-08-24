import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import './Ap.css'

class Login extends Component {

    state = {
        correo: '',
        contraseña: '' ,
        user: {},
        redirect: false,
        invalidUser: false
    }

    handleChange = e => {
        const { name, value} = e.target
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
          return <Redirect to='/' />
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        axios.post('https://localhost:44381/api/login/', this.state)
            .then(res => {
                this.setState({
                    user: res.data
                })
                localStorage.setItem('user', JSON.stringify(this.state.user))
                this.setRedirect()
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    invalidUser: true
                })
            })
        
    }

    renderInvalidUser() {
        if (this.state.invalidUser) {
            return(
                <p className="text-danger">Usuario o contraseña invalido</p>
            )
        }
    }

    render(){
        return(
            <div className="row my-5">
                {this.renderRedirect()}
                <div className="col-md-4 offset-md-4">
                    <div className="card px-3 py-4">
                        <h3 className="font-weight-bold mb-4">Log-In</h3>
                        {this.renderInvalidUser()}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <span>Email</span>
                                <input type="email" name="correo" onChange={this.handleChange} className="form-control" required></input>
                            </div>
                            <div className="form-group">
                                <span>Contraseña</span>
                                <input type="password" name="contraseña" onChange={this.handleChange} className="form-control" required></input>
                            </div>
                            <div className="form-group">
                                <input type="submit" className="button primmary w-100" value="Log in" required></input>
                            </div>
                            <p>Nuevo aqui?</p>
                        </form>
                        <button className="button seconndary text-primary w-100 mb-2" ><Link to="/registro">Crear Cuenta</Link></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login