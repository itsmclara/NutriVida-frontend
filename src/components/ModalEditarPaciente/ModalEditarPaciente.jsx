import { useState } from "react";

import { UserPen } from "lucide-react";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import InputCustom from "../InputCustom/InputCustom";
import SelectCustom from "../SelectCustom/SelectCustom";

import api from "../../services/api";
import toast from "../../utils/toast";

import "./ModalEditarPaciente.css";

import { buscarCep } from "../../services/viaCep";

import {
  formatarCPF,
  formatarTelefone,
  formatarData,
  formatarCEP,
  formatarDataISO,
  limparNumeros,
  limitarTexto
} from "../../utils/formatadores";

import {
  validarCPF,
  validarData,
  validarTelefone,
  validarCEP,
  validarEmail
} from "../../utils/validadores";

function montarForm(paciente) {

  return {

    nome:
      paciente?.nome || "",

    cpf:
      formatarCPF(
        paciente?.cpf || ""
      ),

    dataNascimento:
      formatarData(
        paciente?.dataNascimento || ""
      ),

    genero:
      paciente?.genero || "",

    telefone:
      formatarTelefone(
        paciente?.telefone || ""
      ),

    email:
      paciente?.email || "",

    cep:
      formatarCEP(
        paciente?.cep || ""
      ),

    logradouro:
      paciente?.logradouro || "",

    numero:
      paciente?.numero || "",

    bairro:
      paciente?.bairro || ""
  };
}

function ModalEditarPaciente({
  aberto,
  onClose,
  paciente
}) {

  const [form, setForm] =
    useState(null);

  const [erros, setErros] =
    useState({});

  if (
    !form &&
    paciente &&
    aberto
  ) {

    setForm(
      montarForm(paciente)
    );
  }

  function handleClose() {

    setForm(null);

    setErros({});

    onClose();
  }

  async function handleSalvar() {

    const novosErros = {};

    if (!form.nome.trim()) {
      novosErros.nome =
        "Nome obrigatório";
    }

    if (
      !validarCPF(form.cpf)
    ) {

      novosErros.cpf =
        "CPF inválido";
    }

    if (
      !validarData(
        form.dataNascimento
      )
    ) {

      novosErros.dataNascimento =
        "Data inválida";
    }

    if (!form.genero) {

      novosErros.genero =
        "Selecione o gênero";
    }

    if (!form.telefone) {

      novosErros.telefone =
        "Telefone obrigatório";

    } else if (
      !validarTelefone(
        form.telefone
      )
    ) {

      novosErros.telefone =
        "Telefone inválido";
    }

    if (
      form.email &&
      !validarEmail(form.email)
    ) {

      novosErros.email =
        "E-mail inválido";
    }

    if (
      form.cep &&
      !validarCEP(form.cep)
    ) {

      novosErros.cep =
        "CEP inválido";
    }

    setErros(novosErros);

    if (
      Object.keys(novosErros)
        .length > 0
    ) {

      return;
    }

    try {

      const pacienteAtualizado = {

        nome:
          form.nome,

        cpf:
          limparNumeros(
            form.cpf
          ),

        logradouro:
          form.logradouro?.trim()
            ? form.logradouro
            : null,

        dataNascimento:
          formatarDataISO(
            form.dataNascimento
          ),

        email:
          form.email,

        genero:
          form.genero,

        bairro:
          form.bairro?.trim()
            ? form.bairro
            : null,

        numero:
          form.numero
            ? Number(form.numero)
            : null,

        cep:
          form.cep
            ? limparNumeros(
              form.cep
            )
            : null,

        telefone:
          limparNumeros(
            form.telefone
          ),
      };

      await api.put(
        `/pacientes/${paciente.id}`,
        pacienteAtualizado
      );

      toast.sucesso(
        "Paciente atualizado com sucesso"
      );

      handleClose();

    } catch (error) {

      console.error(
        "Erro ao atualizar paciente:",
        error
      );

      toast.erro(
        "Erro ao atualizar paciente"
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

          <UserPen
            size={20}
            className="modal-icon"
          />

          <h2>
            Editar paciente
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
            label="Nome"
            required
            maxLength={150}
            value={form.nome}
            error={erros.nome}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                nome: limitarTexto(
                  e.target.value,
                  150
                )
              }))
            }
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <InputCustom
              label="CPF"
              required
              value={form.cpf}
              error={erros.cpf}
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,
                  cpf:
                    formatarCPF(
                      e.target.value
                    )
                }))
              }
            />

          </div>

          <div className="form-group">

            <InputCustom
              label="Data de nascimento"
              required
              placeholder="dd/mm/aaaa"
              value={form.dataNascimento}
              error={
                erros.dataNascimento
              }
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,

                  dataNascimento:
                    formatarData(
                      e.target.value
                    )
                }))
              }
            />

          </div>

        </div>

        <div className="form-row">

          <div className="form-group">

            <SelectCustom
              label="Gênero"
              required
              valor={form.genero}
              error={erros.genero}
              onChange={(valor) =>
                setForm(prev => ({
                  ...prev,
                  genero: valor
                }))
              }
              opcoes={[
                {
                  label:
                    "Feminino",

                  valor:
                    "Feminino"
                },
                {
                  label:
                    "Masculino",

                  valor:
                    "Masculino"
                },
                {
                  label:
                    "Outro",

                  valor:
                    "Outro"
                },
                {
                  label:
                    "Prefere não informar",

                  valor:
                    "Prefere não informar"
                }
              ]}
            />

          </div>

          <div className="form-group">

            <InputCustom
              label="Telefone"
              required
              placeholder="(00) 00000-0000"
              value={form.telefone}
              error={erros.telefone}
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,

                  telefone:
                    formatarTelefone(
                      e.target.value
                    )
                }))
              }
            />

          </div>

        </div>

        <div className="form-group">

          <InputCustom
            label="E-mail"
            maxLength={150}
            value={form.email}
            error={erros.email}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                email: limitarTexto(
                  e.target.value,
                  150
                )
              }))
            }
          />

        </div>

        <div className="form-group">

          <InputCustom
            label="CEP"
            value={form.cep}
            error={erros.cep}
            onChange={async (e) => {

              const valor =
                formatarCEP(
                  e.target.value
                );

              setForm(prev => ({
                ...prev,
                cep: valor
              }));

              const cepLimpo =
                limparNumeros(valor);

              if (
                cepLimpo.length === 8
              ) {

                const data =
                  await buscarCep(
                    cepLimpo
                  );

                if (
                  data &&
                  !data.erro
                ) {

                  setForm(prev => ({
                    ...prev,

                    logradouro:
                      data.logradouro,

                    bairro:
                      data.bairro
                  }));
                }
              }
            }}
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <InputCustom
              label="Logradouro"
              maxLength={100}
              value={form.logradouro}
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,

                  logradouro:
                    e.target.value
                }))
              }
            />

          </div>

          <div className="form-group small">

            <InputCustom
              label="Número"
              maxLength={10}
              value={form.numero}
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,

                  numero: e.target.value.replace(
                    /\D/g,
                    ""
                  )
                }))
              }
            />

          </div>

        </div>

        <div className="form-group">

          <InputCustom
            label="Bairro"
            maxLength={100}
            value={form.bairro}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                bairro:
                  e.target.value
              }))
            }
          />

        </div>

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
          Salvar alterações
        </Button>

      </div>

    </Modal>
  );
}

export default ModalEditarPaciente;