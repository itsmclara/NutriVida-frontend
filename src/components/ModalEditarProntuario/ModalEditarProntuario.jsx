import { useState, useEffect } from "react";

import { FileEdit } from "lucide-react";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";

import TextareaCustom from "../TextareaCustom/TextareaCustom";

import api from "../../services/api";
import toast from "../../utils/toast";

import "./ModalEditarProntuario.css";

function montarForm(paciente) {

  return {

    objetivo:
      paciente?.prontuario?.objetivo || "",

    informacoesClinicas:
      paciente?.prontuario?.informacoesClinicas || "",

    restricaoAlimentar:
      paciente?.prontuario?.restricaoAlimentar || ""
  };
}

function ModalEditarProntuario({
  aberto,
  onClose,
  paciente,
  onSalvo
}) {

  const [form, setForm] =
    useState(null);

  useEffect(() => {

    if (paciente && aberto) {

      setForm(
        montarForm(paciente)
      );
    }

  }, [paciente, aberto]);

  function handleClose() {

    setForm(null);

    onClose();
  }

  async function handleSalvar() {

    try {

      await api.put(
        `/prontuarios/${paciente.prontuario.id}`,
        form
      );

      toast.sucesso(
        "Prontuário atualizado com sucesso"
      );

      await onSalvo?.();

      handleClose();

    } catch (error) {

      console.error(error);

      toast.erro(

        error?.response?.data?.message ||

        error?.response?.data ||

        "Erro ao atualizar prontuário"

      );
    }
  }

  if (!form) return null;

  return (

    <Modal
      aberto={aberto}
      onClose={handleClose}
    >

      <div className="modal-header">

        <div className="modal-title">

          <FileEdit
            size={20}
            className="modal-icon"
          />

          <h2>
            Editar prontuário
          </h2>

        </div>

        <button
          className="close-btn"
          onClick={handleClose}
        >
          ×
        </button>

      </div>

      <div className="modal-body">

        <TextareaCustom
          label="Objetivo"
          maxLength={500}
          value={form.objetivo}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              objetivo: e.target.value
            }))
          }
        />

        <TextareaCustom
          label="Informações clínicas"
          maxLength={500}
          value={form.informacoesClinicas}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              informacoesClinicas:
                e.target.value
            }))
          }
        />

        <TextareaCustom
          label="Restrições alimentares"
          maxLength={500}
          value={form.restricaoAlimentar}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              restricaoAlimentar:
                e.target.value
            }))
          }
        />

      </div>

      <div className="modal-footer">

        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Cancelar
        </Button>

        <Button
          onClick={handleSalvar}
        >
          Salvar
        </Button>

      </div>

    </Modal>
  );
}

export default ModalEditarProntuario;