import React, { Component } from 'react'
import axios from 'axios'
import { url } from './ApiUrl'

class Form extends Component {

    state = {
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        foto: ''
    }

    handleChange = e => {
        const { name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    uploadImage = async e => {
        const files = e.target.files
        const data = new FormData() 
        data.append('file', files[0])
        data.append('upload_preset', 'yxgruubw')

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/drjkf0hig/image/upload', 
            {
                method: 'POST',
                body: data
            }
        )   

        const file = await res.json()

        this.setState({
            foto: file.secure_url
        })
    }        

    handleSubmit = e => {
        e.preventDefault()
        axios.post(url + '/productos/', this.state)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
        e.target.reset()    
    }

    render(){
        return(
            <div className="col-md-4 mb-5">
                <div className="card p-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-box-open"></i></span>
                            </div>
                            <input type="text" onChange={this.handleChange} name="nombre" className="form-control" placeholder="Nombre" required></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-tags"></i></span>
                            </div>
                            <input type="text" onChange={this.handleChange} name="categoria" className="form-control" placeholder="Categoria" required></input>
                        </div>
                        <div class="input-group mb-3">
                            <div class="custom-file">
                                <input type="file" name="file" class="custom-file-input" onChange={this.uploadImage} required id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                                <label class="custom-file-label" for="inputGroupFile01">Subir foto</label>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-money-bill"></i></span>
                            </div>
                            <input type="number" onChange={this.handleChange} name="precio" className="form-control" placeholder="Precio" required></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><i className="fas fa-list-ol"></i></span>
                            </div>
                            <input type="number" onChange={this.handleChange} name="stock" className="form-control" placeholder="Stock" required></input>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success w-100"><i className="fas fa-database"></i>   AGREGAR</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Form