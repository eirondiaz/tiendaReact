import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Detalles = () => {

    const { id } = useParams()

    React.useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get(`https://localhost:44381/api/productos/${id}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return(
        <div>

        </div>
    )
}

export default Detalles