import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import swal from "sweetalert";

function CRUD() {
  const baseUrl = "http://localhost:8090/ccaas";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
    codigo_ccaa: "",
    nombre_ccaa: "",
    dosis_entregadas_pfizer: "",
    dosis_entregadas_moderna: "",
    dosis_administradas: "",
    numero_personas_pauta_completa: "",
    fecha_registro_ultima_vacuna: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrameworkSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //console.log(frameworkSeleccionado);
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {
    const ccaa = {
      nombre_ccaa: frameworkSeleccionado.nombre_ccaa,
      dosis_entregadas_pfizer: frameworkSeleccionado.dosis_entregadas_pfizer,
      dosis_entregadas_moderna: frameworkSeleccionado.dosis_entregadas_moderna,
      dosis_administradas: frameworkSeleccionado.dosis_administradas,
      numero_personas_pauta_completa:
        frameworkSeleccionado.numero_personas_pauta_completa,
      fecha_registro_ultima_vacuna:
        frameworkSeleccionado.fecha_registro_ultima_vacuna,
    };

    await axios
      .post(baseUrl + "/", ccaa)
      .then((response) => {
        abrirCerrarModalInsertar();
        peticionGet();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    const ccaa = {
      nombre_ccaa: frameworkSeleccionado.nombre_ccaa,
      dosis_entregadas_pfizer: frameworkSeleccionado.dosis_entregadas_pfizer,
      dosis_entregadas_moderna: frameworkSeleccionado.dosis_entregadas_moderna,
      dosis_administradas: frameworkSeleccionado.dosis_administradas,
      numero_personas_pauta_completa:
        frameworkSeleccionado.numero_personas_pauta_completa,
      fecha_registro_ultima_vacuna:
        frameworkSeleccionado.fecha_registro_ultima_vacuna,
    };

    await axios
      .put(baseUrl + "/" + frameworkSeleccionado.codigo_ccaa, ccaa)
      .then((response) => {
        if (response.data != null) {
          swal(
            "Buen trabajo!",
            "Registro Modificado Satisfactoriamente",
            "success"
          );
          abrirCerrarModalEditar();
          peticionGet();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionDelete = async () => {
    axios
      .delete(baseUrl + "/" + frameworkSeleccionado.codigo_ccaa)
      .then((response) => {
        if (response.data != null) {
          swal(
            "Buen trabajo!",
            "Registro Borrado Satisfactoriamente",
            "success"
          );
          abrirCerrarModalEliminar();
          peticionGet();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const seleccionarFramework = (framework, caso) => {
    setFrameworkSeleccionado(framework);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <button
        className="btn btn-success"
        onClick={() => abrirCerrarModalInsertar()}
      >
        Insertar
      </button>
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>CÓDIGO CCAA</th>
            <th>NOMBRE CCAA</th>
            <th>DOSIS ENTREGADAS PFIZER</th>
            <th>DOSIS ENTREGADAS MODERNA</th>
            <th>DOSIS ADMINISTRADAS</th>
            <th>NÚMERO DE PERSONAS CON PAUTA COMPLETA</th>
            <th>FECHA DEL REGISTRO DE LA ÚLTIMA VACUNA</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {/* {console.log(data[0])} */}
          {data.map((framework) => (
            <tr key={framework.codigo_ccaa}>
              <td>{framework.codigo_ccaa}</td>
              <td>{framework.nombre_ccaa}</td>
              <td>{framework.dosis_entregadas_pfizer}</td>
              <td>{framework.dosis_entregadas_moderna}</td>
              <td>{framework.dosis_administradas}</td>
              <td>{framework.numero_personas_pauta_completa}</td>
              <td>{framework.fecha_registro_ultima_vacuna}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => seleccionarFramework(framework, "Editar")}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => seleccionarFramework(framework, "Eliminar")}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar CCAAs</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre de la CCAA: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre_ccaa"
              onChange={handleChange}
            />
            <br />
            <label>Número de dosis entregadas Pfizer: </label>
            <br />
            <input
              type="number"
              min="0"
              className="form-control"
              name="dosis_entregadas_pfizer"
              onChange={handleChange}
            />
            <br />
            <label>Número de dosis entregadas Moderna: </label>
            <br />
            <input
              type="number"
              min="0"
              className="form-control"
              name="dosis_entregadas_moderna"
              onChange={handleChange}
            />
            <br />
            <label>Número de dosis administradas: </label>
            <br />
            <input
              type="number"
              min="0"
              className="form-control"
              name="dosis_administradas"
              onChange={handleChange}
            />
            <br />
            <label>Número de personas con pauta completa: </label>
            <br />
            <input
              type="number"
              min="0"
              className="form-control"
              name="numero_personas_pauta_completa"
              onChange={handleChange}
            />
            <br />
            <label>Fecha del registro de la ultima vacuna </label>
            <br />
            <input
              type="date"
              className="form-control"
              name="fecha_registro_ultima_vacuna"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>
            Insertar
          </button>
          {"   "}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar CCAAs</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre de la CCAA: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre_ccaa"
              onChange={handleChange}
              value={frameworkSeleccionado && frameworkSeleccionado.nombre_ccaa}
            />
            <br />
            <label>Número de dosis entregadas Pfizer: </label>
            <br />
            <input
              type="number"
              min="0"
              className="form-control"
              name="dosis_entregadas_pfizer"
              onChange={handleChange}
              value={
                frameworkSeleccionado &&
                frameworkSeleccionado.dosis_entregadas_pfizer
              }
            />
            <br />
            <label>Número de dosis entregadas Moderna: </label>
            <br />
            <input
              type="number"
              min="0"
              className="form-control"
              name="dosis_entregadas_moderna"
              onChange={handleChange}
              value={
                frameworkSeleccionado &&
                frameworkSeleccionado.dosis_entregadas_moderna
              }
            />
            <br />
            <label>Número de dosis administradas: </label>
            <br />
            <input
              type="number"
              min="0"
              className="form-control"
              name="dosis_administradas"
              onChange={handleChange}
              value={
                frameworkSeleccionado &&
                frameworkSeleccionado.dosis_administradas
              }
            />
            <br />
            <label>Número de personas con pauta completa: </label>
            <br />
            <input
              type="number"
              min="0"
              className="form-control"
              name="numero_personas_pauta_completa"
              onChange={handleChange}
              value={
                frameworkSeleccionado &&
                frameworkSeleccionado.numero_personas_pauta_completa
              }
            />
            <br />
            <label>Fecha del registro de la ultima vacuna </label>
            <br />
            <input
              type="date"
              className="form-control"
              name="fecha_registro_ultima_vacuna"
              onChange={handleChange}
              value={
                frameworkSeleccionado &&
                frameworkSeleccionado.fecha_registro_ultima_vacuna
              }
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>
            Modificar
          </button>
          {"   "}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar la CCAA{" "}
          {frameworkSeleccionado && frameworkSeleccionado.nombre_ccaa}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CRUD;
