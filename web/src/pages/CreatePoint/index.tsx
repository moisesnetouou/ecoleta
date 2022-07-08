import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {Map, Marker, TileLayer } from 'react-leaflet';

import './styles.css';

import logo from '../../assets/logo.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import { api } from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

export function CreatePoint(){
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>();
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const [selectedPoistion, setSelectedPoistion] = useState<[number, number]>([0,0]);

  useEffect(()=> {
    api.get('items').then(response => {
      setItems(response.data);
    })
  }, []);

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    })
  }, []);

  useEffect(() => {
    if(selectedUf === '0') {
      return;
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome);

      setCities(cityNames);
    })
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
    const city = event.target.value;

    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent){
    setSelectedPoistion([
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  
  console.log(selectedPoistion)
  return(
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
      </header>

      <Link to="/">
        <FiArrowLeft />
        Voltar para home
      </Link>

      <form>
        <h1>Cadastro do <br /> ponto de coleta</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
              <label htmlFor="name">
                Nome
              </label>
              <input 
                type="text"
                name="name"
                id="name" 
              />          
          </div>
          
          <div className='field-group'>
            <div className="field">
              <label htmlFor="email">
                E-mail
              </label>
              <input 
                type="email"
                name="email"
                id="email" 
              />          
            </div>

            

          <div className="field">
              <label htmlFor="whatsapp">
                Whatsapp
              </label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp" 
              />          
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map 
            center={{lat: -3.0934418, lng: -59.9912741}} 
            zoom={15}
            onClick={handleMapClick}
          >
            <TileLayer
                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPoistion}/> 
            
          </Map>

          <div className="field-group">
            <div className='field'>
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                <option value="0">
                  Selecione uma UF
                </option>
                {ufs?.map(uf => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className='field'>
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                <option value="0">
                  Selecione uma cidade
                </option>
                {cities?.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
          </legend>

          <ul className='items-grid'>
            {items.map(item => (
              <li key={item.id}>
              <img src={item.image_url} alt={item.title} />
              <span>{item.title}</span>
            </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>
    </div>
  );
}