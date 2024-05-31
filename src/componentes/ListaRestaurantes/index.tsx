import axios from 'axios';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { SpreadElement } from 'typescript';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  useEffect(() =>{
    axios.get<IPaginacao<IRestaurante>>(`http://localhost:8000/api/v1/restaurantes/`)
    .then(resposta => {
      setRestaurantes(resposta.data.results);
      setProximaPagina(resposta.data.next);
    })
    .catch(data => console.log(data));
  }, [])
  const verMais = () =>{
    axios.get<IPaginacao<IRestaurante>>(`http://localhost:8000/api/v1/restaurantes/`)
    .then(resposta => {
      setRestaurantes(prevRestaurantes => [...prevRestaurantes, ...resposta.data.results]);
      setProximaPagina(resposta.data.next);
    })
    .catch(data => console.log(data));
  }
  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={verMais}>ver mais</button>}
  </section>)
}

export default ListaRestaurantes
