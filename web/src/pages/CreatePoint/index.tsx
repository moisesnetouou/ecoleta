import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {MapContainer, TileLayer} from 'react-leaflet';

import './styles.css';

import logo from '../../assets/logo.svg';


export function CreatePoint(){
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

          <MapContainer center={[-3.1192605,-60.0036451]} zoom={15}>
            <TileLayer
                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>

          <div className="field-group">
            <div className='field'>
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">
                  Selecione uma UF
                </option>
              </select>
            </div>
            <div className='field'>
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">
                  Selecione uma cidade
                </option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
          </legend>

          <ul className='items-grid'>
            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Imagens" />
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Imagens" />
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Imagens" />
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Imagens" />
              <span>Óleo de Cozinha</span>
            </li>

            <li className="selected">
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Imagens" />
              <span>Óleo de Cozinha</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Imagens" />
              <span>Óleo de Cozinha</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>
    </div>
  );
}