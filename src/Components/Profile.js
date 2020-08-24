import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class Profile extends Component {

    state = {
        redirect: false,
        user: {}
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

    componentDidMount() {
        const log = localStorage.getItem('user')
    
        if (log === null) {
            this.setRedirect()
        }
        else {
            this.setState({
                user: JSON.parse(localStorage.getItem('user'))
            })
        }
    }

    logOut = () => {
        localStorage.clear()
    }

    render(){
        return(
            <div className="mx-4 my-5">
                {this.renderRedirect()}
                <div className="row">
                    <div className="col-md-4">
                        <div className="card px-3 py-4">
                            <h3 className="font-weight-bold mb-4">Perfil</h3>
                            <form>
                                <div className="form-group">
                                    <span>Nombre</span>
                                    <input type="text" name="nombre" className="form-control" value={this.state.user.nombre} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <span>Email</span>
                                    <input type="email" name="correo" className="form-control" value={this.state.user.correo} readOnly></input>
                                </div>
                                <div className="form-group">
                                    <span>Contraseña</span>
                                    <input type="password" name="contraseña" className="form-control" value={this.state.user.contraseña} readOnly></input>
                                </div>
                            </form>
                            <button className="button primmary w-100 mb-3"><Link className="text-dark" to="/profile/direccion">Agegar direccion de envio</Link></button>
                            <button className="button seconndary text-primary w-100 mb-2" onClick={this.logOut}><Link to="/">Log Out</Link></button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h4>Your Orders</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile