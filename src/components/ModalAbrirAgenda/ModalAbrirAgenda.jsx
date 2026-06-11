import { useState } from "react";

import { CalendarPlus } from "lucide-react";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import InputCustom from "../InputCustom/InputCustom";
import SelectCustom from "../SelectCustom/SelectCustom";

import api from "../../services/api";
import toast from "../../utils/toast";

import "./ModalAbrirAgenda.css";

import { formatarNomeNutri } from "../../utils/formatadores";

function ModalAbrirAgenda({
  aberto,
  onClose,
  nutricionistas,
  dataInicial = "",
  nutricionistaInicial = null,
  onAgendaCriada
}) {

  const usuario = JSON.parse(
    sessionStorage.getItem("usuario")
  );

  const ehNutricionista =
    usuario?.perfil ===
    "NUTRICIONISTA";

  const [data, setData] =
    useState("");

  const [
    nutricionistaId,
    setNutricionistaId
  ] = useState("");

  function limparFormulario() {

    setData(
      dataInicial || ""
    );

    setNutricionistaId(

      ehNutricionista
        ? String(usuario.id)
        : nutricionistaInicial?.id
          ? String(nutricionistaInicial.id)
          : ""

    );
  }

  function handleClose() {

    limparFormulario();

    onClose();
  }

  const modalAcabouDeAbrir =
    aberto && !data;

  if (modalAcabouDeAbrir) {

    setTimeout(() => {

      limparFormulario();

    }, 0);
  }

  async function handleSalvar() {

    if (!data) {

      return toast.aviso(
        "Selecione a data"
      );
    }

    if (!nutricionistaId) {

      return toast.aviso(
        "Selecione a nutricionista"
      );
    }

    try {

      const novaAgenda = {

        data,

        nutricionistaId:
          Number(
            nutricionistaId
          ),

        status: "ABERTA"
      };

      await api.post(
        "/agendas",
        novaAgenda
      );

      if (onAgendaCriada) {

        await onAgendaCriada({
          data,

          nutricionistaId:
            Number(
              nutricionistaId
            )
        });
      }

      toast.sucesso(
        "Agenda aberta com sucesso"
      );

      handleClose();

    } catch (error) {

      console.error(
        "Erro ao abrir agenda:",
        error
      );

      toast.erro(
        "Erro ao abrir agenda"
      );
    }
  }

  return (

    <Modal
      aberto={aberto}
      onClose={handleClose}
    >

      <div className="modal-header">

        <div className="modal-title">

          <CalendarPlus
            size={20}
            className="modal-icon"
          />

          <h2>
            Abrir agenda
          </h2>

        </div>

        <button
          className="close-btn"
          onClick={handleClose}
        >
          ×
        </button>

      </div>

      <form
        className="modal-body"
        onSubmit={(e) => {

          e.preventDefault();

          handleSalvar();
        }}
      >

        <div className="form-group">

          <InputCustom
            label="Data"
            required
            type="date"
            value={data}
            onChange={(e) =>
              setData(
                e.target.value
              )
            }
          />

        </div>

        {!ehNutricionista && (

          <div className="form-group">

            <SelectCustom
              label="Nutricionista"
              required
              placeholder="Selecione"
              valor={
                nutricionistaId
              }
              onChange={
                setNutricionistaId
              }
              opcoes={
                nutricionistas.map(
                  (n) => ({
                    valor:
                      String(n.id),

                    label:
                      formatarNomeNutri(n)
                  })
                )
              }
            />

          </div>

        )}

      </form>

      <div className="modal-footer">

        <Button
          variant="secondary"
          type="button"
          onClick={handleClose}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          onClick={handleSalvar}
        >
          Salvar
        </Button>

      </div>

    </Modal>
  );
}

export default ModalAbrirAgenda;