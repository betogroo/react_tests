import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import './styles.css'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import api from '../../services/api'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'

interface Item {
    id: number,
    name: string,
    image_url: string
}

interface UF {
    sigla: string
}

interface City {
    nome: string
}

const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([])
    const [ufs, setUFs] = useState<string[]>([])
    const [selectedUf, setSelectedUf] = useState('0')
    const [selectedCity, setSelectedCity] = useState('0')
    const [cities, setCities] = useState<string[]>([])
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [inicialPosition, setInicialPosition] = useState<[number, number]>([0, 0])
    const [formData, setformData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })

    useEffect(() => {
        api.get('items').then(res => {
            setItems(res.data)
            
        })
    }, [])

    useEffect(() => {
        axios.get<UF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(res => {
            const ufInitials = res.data.map(uf => uf.sigla)
            setUFs(ufInitials)
        })
    }, [])

    useEffect(() => {
        if (selectedUf === '0') {
            return
        }
        axios
            .get<City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(res => {
                const citiesName = res.data.map(city => city.nome)
                setCities(citiesName)
            })
    }, [selectedUf])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            setInicialPosition([latitude, longitude])
        })
    }, [])

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value
        setSelectedUf(uf)
        //console.log(selectedUf)
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value
        //console.log(city)
        setSelectedCity(city)
        //console.log(selectedCity)
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat, event.latlng.lng
        ])
        console.log(selectedPosition)

    }

    function HandleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setformData({
            ...formData, [name]: value
        })
        console.log(formData)
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id)
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id)
            setSelectedItems(filteredItems)
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const { name, email, whatsapp } = formData
        const uf = selectedUf
        const city = selectedCity
        const [latitude, longitude] = selectedPosition
        const items = selectedItems
        const data = {
            name, email, whatsapp, uf, city, latitude, longitude, items

        }

        console.log(data)
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="E Coleta" />

                <Link to='/'>
                    <FiArrowLeft></FiArrowLeft>
                Voltar para Home
            </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h3>Cadastro de Pontos de Coleta</h3>
                <fieldset>
                    <legend>
                        <h4>Dados</h4>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={HandleInputChange}
                        />
                    </div>
                </fieldset>
                <div className="field-group">
                    <div className="field">
                        <label htmlFor="name">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={HandleInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="name">WhatsApp</label>
                        <input
                            type="text"
                            name="whatsapp"
                            id="whatsapp"
                            onChange={HandleInputChange}
                        />
                    </div>
                </div>
                <fieldset>
                    <legend>
                        <h4>Endereço</h4>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <Map center={inicialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition}>

                        </Marker>
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">UF</label>
                            <select
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {
                                    ufs.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))
                                }

                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                name="city" id="city"
                                value={selectedCity}
                                onChange={handleSelectCity}
                            >

                                {
                                    cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h4>Ítens de Coleta</h4>
                        <span>Selecione os ítens</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                            <li
                                key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
                                <img src={item.image_url} alt={item.name} />
                                <span>{item.name}</span>
                            </li>
                        )

                        )
                        }

                    </ul>
                    <button type="submit">
                        Cadastrar Ponto de Coleta
                </button>
                </fieldset>

            </form>
        </div >
    )
}

export default CreatePoint