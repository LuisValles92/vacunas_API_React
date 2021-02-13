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
        response.data.forEach(function (ccaa) {
          dosisEntregadas +=
            ccaa.dosis_entregadas_pfizer + ccaa.dosis_entregadas_moderna;
          dosisAdministradas += ccaa.dosis_administradas;
          numeroPersonasPautaCompleta += ccaa.numero_personas_pauta_completa;
          pfizerDosisEntregadas += ccaa.dosis_entregadas_pfizer;
          modernaDosisEntregadas += ccaa.dosis_entregadas_moderna;
          pfizerNumeroPersonasPautaCompleta +=
            ccaa.numero_personas_pauta_completa;
        });
        setDosisEntregadas(dosisEntregadas);
        setDosisAdministradas(dosisAdministradas);
        setPorcentajeDosisRecibidas(
          ((dosisAdministradas * 100) / dosisEntregadas).toPrecision(4)
        );
        setNumeroPersonasPautaCompleta(numeroPersonasPautaCompleta);
        setPorcentajeDosisAdministradas(
          (
            (numeroPersonasPautaCompleta * 100) /
            dosisAdministradas
          ).toPrecision(3)
        );
        setPfizerDosisEntregadas(pfizerDosisEntregadas);
        setModernaDosisEntregadas(modernaDosisEntregadas);
        setPfizerDosisAdministradas(
          Math.round(
            pfizerDosisEntregadas *
              (((dosisAdministradas * 100) / dosisEntregadas).toPrecision(4) /
                100)
          )
        );
        setModernaDosisAdministradas(
          Math.round(
            modernaDosisEntregadas *
              (((dosisAdministradas * 100) / dosisEntregadas).toPrecision(4) /
                100)
          )
        );
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
      <header>
        <h1>Datos globales agregados</h1>
      </header>
      <div className="contenedor w80">
        <div>
          <h4>Dosis entregadas en CCAA</h4>
          <span className="span1">{dosisEntregadas}</span>
        </div>
        <div>
          <h4>Dosis administradas</h4>
          <span className="span2">{dosisAdministradas}</span>
          <hr />
          <span className="span3">
            {porcentajeDosisRecibidas}% dosis recibidas
          </span>
        </div>
        <div>
          <h4>Nº Personas con pauta completa</h4>
          <span className="span2">{numeroPersonasPautaCompleta}</span>
          <hr />
          <span className="span3">
            {porcentajeDosisAdministradas}% dosis administradas
          </span>
        </div>
      </div>
      <header>
        <h2>Distribución por tipo de vacuna</h2>
      </header>
      <em>* Aplicado al porcentaje de dosis recibidas</em>
      <div className="contenedor w95">
        <div>
          <h4>Vacuna</h4>
          <hr/>
          <span className="span4 c-blue">Pfizer / BioNtech</span>
          <span className="span4 c-green">Moderna</span>
        </div>
        <div>
          <h4>Dosis entregadas en CCAA</h4>
          <hr />
          <span className="span4 c-blue">{pfizerDosisEntregadas}</span>
          <span className="span4 c-green">{modernaDosisEntregadas}</span>
        </div>
        <div>
          <h4>* Dosis administradas</h4>
          <hr />
          <span className="span4 c-blue">{pfizerDosisAdministradas}</span>
          <span className="span4 c-green">{modernaDosisAdministradas}</span>
        </div>
        <div>
          <h4>Nº Personas con pauta completa</h4>
          <hr />
          <span className="span4 c-blue">{pfizerNumeroPersonasPautaCompleta}</span>
          <span className="span4 c-green">-</span>
        </div>
      </div>
    </div>
  );
}

export default DatosGlobales;
