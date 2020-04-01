import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Button from '@material-ui/core/Button';
import Addcar from './Addcar'
import Editcar from './Editcar'

const Carlist = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch("https://carstockrest.herokuapp.com/cars")
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
    }

    const deleteCar = (link) => {
        if (window.confirm('Oletko varma?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchData())
                .catch(err => console.error(err))
        }
    }

    const saveCar = (car) => {
        fetch("https://carstockrest.herokuapp.com/cars", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const editCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const columns = [
        {
            Header: 'Brands',
            accessor: 'brand'
        },
        {
            Header: 'Model',
            accessor: 'model'
        },
        {
            Header: 'Color',
            accessor: 'color'
        },
        {
            Header: 'Fuel',
            accessor: 'fuel'
        },
        {
            Header: 'Year',
            accessor: 'year'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
        {
            filterable: false,
            sortable: false,
            width: 100,
            Cell: row => <Editcar car={row.original} editCar={editCar} />
        },
        {
            filterable: false,
            sortable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: row => <Button size='small' color='secondary' onClick={() => deleteCar(row.value)} > Delete</Button >
        }
    ]

    return (
        <div>
            <Addcar saveCar={saveCar} />
            <ReactTable data={cars} columns={columns} filterable={true} />
        </div>
    )
}
export default Carlist