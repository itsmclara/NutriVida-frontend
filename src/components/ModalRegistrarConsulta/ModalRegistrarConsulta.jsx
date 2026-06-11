import {
  useState,
  useEffect
} from "react";

import {
  ClipboardPlus
} from "lucide-react";

import Modal from "../Modal/Modal";

import Button from "../Button/Button";
import InputCustom from "../InputCustom/InputCustom";
import SelectCustom from "../SelectCustom/SelectCustom";
import TextareaCustom from "../TextareaCustom/TextareaCustom";

import api from "../../services/api";
import toast from "../../utils/toast";

import { validarPeso, validarAltura } from "../../utils/validadores";
import {
  formatarPeso,
  formatarAltura,
  formatarPercentual,
  formatarCircunferencia
} from "../../utils/formatadores";

import "./ModalRegistrarConsulta.css";

function ModalRegistrarConsulta({
  aberto,
  onClose,
  itemAgendaId,
  pacienteId,
  onSalvo
}) {

  const [tipoConsulta, setTipoConsulta] =
    useState("");

  const [resumo, setResumo] =
    useState("");

  const [peso, setPeso] =
    useState("");

  const [altura, setAltura] =
    useState("");

  const [circAbdominal, setCircAbdominal] =
    useState("");

  const [circQuadril, setCircQuadril] =
    useState("");

  const [
    percentualGordura,
    setPercentualGordura
  ] = useState("");

  const [
    planoAlimentar,
    setPlanoAlimentar
  ] = useState("");

  const [
    observacoes,
    setObservacoes
  ] = useState("");

  const [dadosCopiados, setDadosCopiados] =
    useState(false);

  const [camposCopiados, setCamposCopiados] =
    useState([]);

  const [erros, setErros] =
    useState({});

  useEffect(() => {

    if (
      !aberto ||
      !itemAgendaId ||
      !pacienteId
    ) {

      return;
    }

    async function carregarUltimaConsulta() {

      try {

        const res =
          await api.get(
            `/consultas/ultima/${pacienteId}`
          );

        const ultima =
          res.data;

        if (!ultima) {
          return;
        }

        const campos = [];

        if (ultima.tipoConsulta) {

          setTipoConsulta(
            ultima.tipoConsulta
          );

          campos.push(
            "tipoConsulta"
          );
        }

        if (ultima.resumo) {

          setResumo(
            ultima.resumo
          );

          campos.push(
            "resumo"
          );
        }

        if (
          ultima.avaliacao?.peso
        ) {

          setPeso(
            String(
              ultima.avaliacao.peso
            )
          );

          campos.push(
            "peso"
          );
        }

        if (
          ultima.avaliacao?.altura
        ) {

          setAltura(
            String(
              ultima.avaliacao.altura
            )
          );

          campos.push(
            "altura"
          );
        }

        if (
          ultima.avaliacao
            ?.circunferenciaAbdominal
        ) {

          setCircAbdominal(
            String(
              ultima.avaliacao
                .circunferenciaAbdominal
            )
          );

          campos.push(
            "circAbdominal"
          );
        }

        if (
          ultima.avaliacao
            ?.circunferenciaQuadril
        ) {

          setCircQuadril(
            String(
              ultima.avaliacao
                .circunferenciaQuadril
            )
          );

          campos.push(
            "circQuadril"
          );
        }

        if (
          ultima.avaliacao
            ?.percentualGordura
        ) {

          setPercentualGordura(
            String(
              ultima.avaliacao
                .percentualGordura
            )
          );

          campos.push(
            "percentualGordura"
          );
        }

        if (
          ultima.avaliacao
            ?.planoAlimentar
        ) {

          setPlanoAlimentar(
            ultima.avaliacao
              .planoAlimentar
          );

          campos.push(
            "planoAlimentar"
          );
        }

        if (
          ultima.observacoes
        ) {

          setObservacoes(
            ultima.observacoes
          );

          campos.push(
            "observacoes"
          );
        }

        setCamposCopiados(
          campos
        );

        setDadosCopiados(
          campos.length > 0
        );

      } catch (error) {

        console.error(
          "Erro ao carregar última consulta:",
          error
        );
      }
    }

    carregarUltimaConsulta();

  }, [
    aberto,
    itemAgendaId,
    pacienteId
  ]);

  function limpar() {

    setTipoConsulta("");
    setResumo("");

    setPeso("");
    setAltura("");

    setCircAbdominal("");
    setCircQuadril("");

    setPercentualGordura("");

    setPlanoAlimentar("");
    setObservacoes("");

    setDadosCopiados(false);

    setCamposCopiados([]);

    setErros({});
  }

  function handleClose() {

    limpar();

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

  function removerCampoCopiado(
    campo
  ) {

    setCamposCopiados(prev =>
      prev.filter(
        item => item !== campo
      )
    );
  }

  const pesoNumero =
    converterNumero(peso);

  const alturaNumero =
    converterNumero(altura);

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

    if (!tipoConsulta) {

      novosErros.tipoConsulta =
        "Selecione o tipo";
    }

    if (
      !validarPeso(
        peso
      )
    ) {

      novosErros.peso =
        "Peso obrigatório";
    }

    if (
      !validarAltura(
        altura
      )
    ) {

      novosErros.altura =
        "Altura obrigatória";
    }

    setErros(
      novosErros
    );

    if (
      Object.keys(
        novosErros
      ).length > 0
    ) {

      return;
    }

    try {

      const payload = {

        itemAgendaId,

        tipoConsulta,

        resumo,

        observacoes,

        avaliacao: {

          peso:
            converterNumero(
              peso
            ),

          altura:
            converterNumero(
              altura
            ),

          imc:
            imc
              ? Number(imc)
              : null,

          circunferenciaAbdominal:
            converterNumero(
              circAbdominal
            ),

          circunferenciaQuadril:
            converterNumero(
              circQuadril
            ),

          percentualGordura:
            converterNumero(
              percentualGordura
            ),

          planoAlimentar
        }
      };

      await api.post(
        "/consultas",
        payload
      );

      toast.sucesso(
        "Consulta registrada com sucesso"
      );

      onSalvo?.();

      handleClose();

    } catch (error) {

      console.error(
        error
      );

      toast.erro(
        error?.response?.data?.message ||
        "Erro ao registrar consulta"
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

          <ClipboardPlus
            size={20}
            className="modal-icon"
          />

          <h2>
            Registrar consulta
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

        {dadosCopiados && (

          <div className="consulta-badge">

            Dados carregados do
            último atendimento

          </div>

        )}

        <div
          className={
            camposCopiados.includes(
              "tipoConsulta"
            )
              ? "campo-preenchido"
              : ""
          }
        >

          <SelectCustom
            label="Tipo de consulta"
            required
            placeholder="Selecione"
            valor={tipoConsulta}
            onChange={(valor) => {

              setTipoConsulta(
                valor
              );

              removerCampoCopiado(
                "tipoConsulta"
              );
            }}
            error={
              erros.tipoConsulta
            }
            opcoes={[
              {
                valor:
                  "AVALIACAO_INICIAL",
                label:
                  "Avaliação inicial"
              },
              {
                valor:
                  "RETORNO",
                label:
                  "Retorno"
              }
            ]}
          />

        </div>

        <div
          className={
            camposCopiados.includes(
              "resumo"
            )
              ? "campo-preenchido"
              : ""
          }
        >

          <InputCustom
            label="Resumo"
            placeholder="Resumo da consulta"
            maxLength={100}
            value={resumo}
            onChange={(e) => {

              setResumo(
                e.target.value
              );

              removerCampoCopiado(
                "resumo"
              );
            }}
          />

        </div>

        <div className="form-row">

          <div
            className={
              camposCopiados.includes(
                "peso"
              )
                ? "campo-preenchido"
                : ""
            }
          >

            <InputCustom
              label="Peso (kg)"
              required
              placeholder="Ex: 72.5"
              value={peso}
              error={erros.peso}
              onChange={(e) => {

                setPeso(
                  formatarPeso(
                    e.target.value
                  )
                );

                removerCampoCopiado(
                  "peso"
                );
              }}
            />

          </div>

          <div
            className={
              camposCopiados.includes(
                "altura"
              )
                ? "campo-preenchido"
                : ""
            }
          >

            <InputCustom
              label="Altura (m)"
              required
              placeholder="Ex: 1.68"
              value={altura}
              error={erros.altura}
              onChange={(e) => {

                setAltura(
                  formatarAltura(
                    e.target.value
                  )
                );

                removerCampoCopiado(
                  "altura"
                );
              }}
            />

          </div>

        </div>

        <div className="form-row">

          <div>

            <InputCustom
              label="IMC"
              value={imc}
              readOnly
              placeholder="Calculado automaticamente"
            />

          </div>

          <div
            className={
              camposCopiados.includes(
                "percentualGordura"
              )
                ? "campo-preenchido"
                : ""
            }
          >

            <InputCustom
              label="% Gordura"
              placeholder="Ex: 22.3"
              value={
                percentualGordura
              }
              onChange={(e) => {

                setPercentualGordura(
                  formatarPercentual(
                    e.target.value
                  )
                );

                removerCampoCopiado(
                  "percentualGordura"
                );
              }}
            />

          </div>

        </div>

        <div className="form-row">

          <div
            className={
              camposCopiados.includes(
                "circAbdominal"
              )
                ? "campo-preenchido"
                : ""
            }
          >

            <InputCustom
              label="Circ. abdominal"
              placeholder="Ex: 88"
              value={
                circAbdominal
              }
              onChange={(e) => {

                setCircAbdominal(
                  formatarCircunferencia(
                    e.target.value
                  )
                );

                removerCampoCopiado(
                  "circAbdominal"
                );
              }}
            />

          </div>

          <div
            className={
              camposCopiados.includes(
                "circQuadril"
              )
                ? "campo-preenchido"
                : ""
            }
          >

            <InputCustom
              label="Circ. quadril"
              placeholder="Ex: 96"
              value={
                circQuadril
              }
              onChange={(e) => {

                setCircQuadril(
                  formatarCircunferencia(
                    e.target.value
                  )
                );

                removerCampoCopiado(
                  "circQuadril"
                );
              }}
            />

          </div>

        </div>

        <div
          className={
            camposCopiados.includes(
              "planoAlimentar"
            )
              ? "campo-preenchido"
              : ""
          }
        >

          <TextareaCustom
            label="Plano alimentar"
            placeholder="Descreva o plano alimentar"
            maxLength={1000}
            value={
              planoAlimentar
            }
            onChange={(e) => {

              setPlanoAlimentar(
                e.target.value
              );

              removerCampoCopiado(
                "planoAlimentar"
              );
            }}
          />

        </div>

        <div
          className={
            camposCopiados.includes(
              "observacoes"
            )
              ? "campo-preenchido"
              : ""
          }
        >

          <TextareaCustom
            label="Observações"
            placeholder="Observações da consulta"
            maxLength={500}
            value={
              observacoes
            }
            onChange={(e) => {

              setObservacoes(
                e.target.value
              );

              removerCampoCopiado(
                "observacoes"
              );
            }}
          />

        </div>

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

export default ModalRegistrarConsulta;