import { useState, useEffect } from "react";

import { FileEdit } from "lucide-react";

import Modal from "../Modal/Modal";

import Button from "../Button/Button";
import InputCustom from "../InputCustom/InputCustom";
import SelectCustom from "../SelectCustom/SelectCustom";
import TextareaCustom from "../TextareaCustom/TextareaCustom";

import api from "../../services/api";
import toast from "../../utils/toast";

import "./ModalEditarConsulta.css";
import { formatarPeso, formatarCircunferencia, formatarPercentual, formatarAltura } from "../../utils/formatadores";

function montarForm(consulta) {

  return {

    tipoConsulta:
      consulta?.tipoConsulta || "",

    resumo:
      consulta?.resumo || "",

    observacoes:
      consulta?.observacoes || "",

    peso:
      consulta?.avaliacao?.peso || "",

    altura:
      consulta?.avaliacao?.altura || "",

    circAbdominal:
      consulta?.avaliacao
        ?.circunferenciaAbdominal || "",

    circQuadril:
      consulta?.avaliacao
        ?.circunferenciaQuadril || "",

    percentualGordura:
      consulta?.avaliacao
        ?.percentualGordura || "",

    planoAlimentar:
      consulta?.avaliacao
        ?.planoAlimentar || ""
  };
}

function ModalEditarConsulta({
  aberto,
  onClose,
  consulta,
  onSalvo
}) {

  const [form, setForm] =
    useState(null);

  const [erros, setErros] =
    useState({});

  useEffect(() => {

    async function carregarConsulta() {

      if (!consulta?.id || !aberto) {
        return;
      }

      try {

        const res =
          await api.get(
            `/consultas/${consulta.id}`
          );

        setForm(
          montarForm(res.data)
        );

      } catch (error) {

        console.error(error);

        toast.erro(
          "Erro ao carregar consulta"
        );
      }
    }

    carregarConsulta();

  }, [consulta, aberto]);

  function handleClose() {

    setForm(null);

    setErros({});

    onClose();
  }

  function converterNumero(valor) {

    if (
      valor === "" ||
      valor === null ||
      valor === undefined
    ) {

      return null;
    }

    const convertido =
      Number(
        String(valor)
          .replace(",", ".")
      );

    return Number.isNaN(convertido)
      ? null
      : convertido;
  }

  const pesoNumero =
    converterNumero(form?.peso);

  const alturaNumero =
    converterNumero(form?.altura);

  const imc =
    pesoNumero &&
      alturaNumero &&
      alturaNumero > 0
      ? (
        pesoNumero /
        (
          alturaNumero *
          alturaNumero
        )
      ).toFixed(1)
      : "";

  async function handleSalvar() {

    const novosErros = {};

    if (!form.tipoConsulta) {

      novosErros.tipoConsulta =
        "Selecione o tipo";
    }

    if (!form.peso) {

      novosErros.peso =
        "Peso obrigatório";
    }

    if (!form.altura) {

      novosErros.altura =
        "Altura obrigatória";
    }

    setErros(novosErros);

    if (
      Object.keys(novosErros)
        .length > 0
    ) {

      return;
    }

    try {

      const payload = {

        tipoConsulta:
          form.tipoConsulta,

        resumo:
          form.resumo,

        observacoes:
          form.observacoes,

        avaliacao: {

          peso:
            converterNumero(
              form.peso
            ),

          altura:
            converterNumero(
              form.altura
            ),

          imc:
            imc
              ? Number(imc)
              : null,

          circunferenciaAbdominal:
            converterNumero(
              form.circAbdominal
            ),

          circunferenciaQuadril:
            converterNumero(
              form.circQuadril
            ),

          percentualGordura:
            converterNumero(
              form.percentualGordura
            ),

          planoAlimentar:
            form.planoAlimentar
        }
      };

      await api.put(
        `/consultas/${consulta.id}`,
        payload
      );

      toast.sucesso(
        "Consulta atualizada com sucesso"
      );

      await onSalvo?.();

      handleClose();

    } catch (error) {

      console.error(error);

      toast.erro(
        error?.response?.data?.message ||
        "Erro ao atualizar consulta"
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
            Editar consulta
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

        <SelectCustom
          label="Tipo de consulta"
          required
          error={erros.tipoConsulta}
          placeholder="Selecione"
          valor={form.tipoConsulta}
          onChange={(valor) =>
            setForm(prev => ({
              ...prev,
              tipoConsulta: valor
            }))
          }
          opcoes={[
            {
              valor: "AVALIACAO_INICIAL",
              label: "Avaliação inicial"
            },
            {
              valor: "RETORNO",
              label: "Retorno"
            }
          ]}
        />

        <InputCustom
          label="Resumo"
          placeholder="Resumo da consulta"
          maxLength={100}
          value={form.resumo}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              resumo: e.target.value
            }))
          }
        />

        <div className="form-row">

          <InputCustom
            label="Peso (kg)"
            required
            error={erros.peso}
            placeholder="Ex: 72.5"
            value={form.peso}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                peso: formatarPeso(e.target.value)
              }))
            }
          />

          <InputCustom
            label="Altura (m)"
            required
            error={erros.altura}
            placeholder="Ex: 1.68"
            value={form.altura}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                altura: formatarAltura(e.target.value)
              }))
            }
          />

        </div>

        <div className="form-row">

          <InputCustom
            label="IMC"
            value={imc}
            readOnly
            placeholder="Calculado automaticamente"
          />

          <InputCustom
            label="% Gordura"
            placeholder="Ex: 22.3"
            value={form.percentualGordura}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                percentualGordura: formatarPercentual(e.target.value)
              }))
            }
          />

        </div>

        <div className="form-row">

          <InputCustom
            label="Circ. abdominal"
            placeholder="Ex: 88"
            value={form.circAbdominal}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                circAbdominal: formatarCircunferencia(e.target.value)
              }))
            }
          />

          <InputCustom
            label="Circ. quadril"
            placeholder="Ex: 96"
            value={form.circQuadril}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                circQuadril: formatarCircunferencia(e.target.value)
              }))
            }
          />

        </div>

        <TextareaCustom
          label="Plano alimentar"
          placeholder="Descreva o plano alimentar"
          maxLength={1000}
          value={form.planoAlimentar}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              planoAlimentar:
                e.target.value
            }))
          }
        />

        <TextareaCustom
          label="Observações"
          placeholder="Observações da consulta"
          maxLength={500}
          value={form.observacoes}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              observacoes:
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
          Salvar alterações
        </Button>

      </div>

    </Modal>
  );
}

export default ModalEditarConsulta;