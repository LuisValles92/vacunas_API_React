import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function DatosGlobales() {
  const baseUrl = "http://localhost:8090/ccaas";
  const [data, setData] = useState([]);

  let [dosisEntregadas, setDosisEntregadas] = useState(0);
  let [dosisAdministradas, setDosisAdministradas] = useState(0);
  let [porcentajeDosisRecibidas, setPorcentajeDosisRecibidas] = useState(0);
  let [numeroPersonasPautaCompleta, setNumeroPersonasPautaCompleta] = useState(
    0
  );
  let [
    porcentajeDosisAdministradas,
    setPorcentajeDosisAdministradas,
  ] = useState(0);
  let [pfizerDosisEntregadas, setPfizerDosisEntregadas] = useState(0);
  let [modernaDosisEntregadas, setModernaDosisEntregadas] = useState(0);
  let [pfizerDosisAdministradas, setPfizerDosisAdministradas] = useState(0);
  let [modernaDosisAdministradas, setModernaDosisAdministradas] = useState(0);
  let [
    pfizerNumeroPersonasPautaCompleta,
    setPfizerNumeroPersonasPautaCompleta,
  ] = useState(0);

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
        response.data.forEach(function(ccaa){
          dosisEntregadas += ccaa.dosis_entregadas_pfizer + ccaa.dosis_entregadas_moderna;
          dosisAdministradas += ccaa.dosis_administradas;
          numeroPersonasPautaCompleta+=ccaa.numero_personas_pauta_completa;
          pfizerDosisEntregadas+=ccaa.dosis_entregadas_pfizer;
          modernaDosisEntregadas+=ccaa.dosis_entregadas_moderna;
          pfizerNumeroPersonasPautaCompleta+=ccaa.numero_personas_pauta_completa;
        });
        setDosisEntregadas(dosisEntregadas);
        setDosisAdministradas(dosisAdministradas);
        setPorcentajeDosisRecibidas((dosisAdministradas*100/dosisEntregadas).toPrecision(4));
        setNumeroPersonasPautaCompleta(numeroPersonasPautaCompleta);
        setPorcentajeDosisAdministradas((numeroPersonasPautaCompleta*100/dosisAdministradas).toPrecision(3));
        setPfizerDosisEntregadas(pfizerDosisEntregadas);
        setModernaDosisEntregadas(modernaDosisEntregadas);
        setPfizerDosisAdministradas(Math.round(pfizerDosisEntregadas*((dosisAdministradas*100/dosisEntregadas).toPrecision(4)/100)));
        setModernaDosisAdministradas(Math.round(modernaDosisEntregadas*((dosisAdministradas*100/dosisEntregadas).toPrecision(4)/100)));
        setPfizerNumeroPersonasPautaCompleta(pfizerNumeroPersonasPautaCompleta);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div className="App">
      <h1>Datos globales agregados</h1>
      <p>Dosis entregadas en CCAA: {dosisEntregadas}</p>
      <p>Dosis administradas: {dosisAdministradas}</p>
      <p>{porcentajeDosisRecibidas}% dosis recibidas</p>
      <p>Nº Personas con pauta completa: {numeroPersonasPautaCompleta}</p>
      <p>{porcentajeDosisAdministradas}% dosis administradas</p>
      <h2>Distribución por tipo de vacuna</h2>
      <em>* Aplicado al porcentaje de dosis recibidas</em>
      <p>Dosis entregadas en CCAA (Pfizer/BioNtech): {pfizerDosisEntregadas}</p>
      <p>Dosis entregadas en CCAA (Moderna): {modernaDosisEntregadas}</p>
      <p>* Dosis administradas (Pfizer/BioNtech): {pfizerDosisAdministradas}</p>
      <p>* Dosis administradas (Moderna): {modernaDosisAdministradas}</p>
      <p>Nº Personas con pauta completa (Pfizer/BioNtech): {pfizerNumeroPersonasPautaCompleta}</p>
    </div>
  );
}

export default DatosGlobales;
