import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import CardDir from './CardDir'

class Direccion extends Component {

    state = {
        redirect: false,
        user: {},
        direcciones: [],
        address: '',
        ciudad: '',
        cp: '',
        pais: ''
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

    handleChange = e => {
        const { name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const u = JSON.parse(localStorage.getItem('user'))
        axios.post('https://localhost:44381/api/usuarios/' + u.id + '/direcciones', this.state)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
        e.target.reset()
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

            const u = JSON.parse(localStorage.getItem('user'))
            axios.get('https://localhost:44381/api/usuarios/' + u.id + '/direcciones')
                .then(res => {
                    this.setState({
                        direcciones: res.data
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    componentWillUpdate() {
        const log = localStorage.getItem('user')

        if (log !== null) {
            const u = JSON.parse(localStorage.getItem('user'))
            axios.get('https://localhost:44381/api/usuarios/' + u.id + '/direcciones')
                .then(res => {
                    this.setState({
                        direcciones: res.data
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    renderEmpDir() {
        if (this.state.direcciones.length === 0) 
            return(<p className="text-center display-4 mt-5">No tines ninguna direccion guardada</p>)
    }

    render(){
        return(
            <div className="mx-3 my-4">
                {this.renderRedirect()}
                <div className="row">
                    <div className="col-md-4">
                        <div className="card px-3 py-4">
                            <h3 className="font-weight-bold mb-4">Direccion de envio</h3>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <span>Direccion</span>
                                    <input type="text" onChange={this.handleChange} className="form-control" name="address" required></input>
                                </div>
                                <div className="form-group">
                                    <span>Ciudad</span>
                                    <input type="text" onChange={this.handleChange} className="form-control" name="ciudad" required></input>
                                </div>
                                <div className="form-group">
                                    <span>Codigo postal</span>
                                    <input type="number" onChange={this.handleChange} className="form-control" name="cp" required></input>
                                </div>
                                <div className="form-group">
                                    <span>Pais</span>
                                    <input type="text" onChange={this.handleChange} className="form-control" name="pais" required></input>
                                </div>
                                <div className="form-group">
                                    <input type="submit" className="button primmary w-100" value="Agregar" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h4>Tus direcciones</h4>
                        {this.renderEmpDir()}
                        <div className="row">
                            {
                                this.state.direcciones.map(dir => (
                                    <CardDir key={dir.id} direc={dir}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Direccion