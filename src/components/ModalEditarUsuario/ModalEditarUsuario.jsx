import { useState } from "react";

import { UserPen } from "lucide-react";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import InputCustom from "../InputCustom/InputCustom";
import SelectCustom from "../SelectCustom/SelectCustom";

import api from "../../services/api";
import toast from "../../utils/toast";

import "./ModalEditarUsuario.css";

import {
  formatarTelefone,
  formatarCRN,
  limparNumeros,
  limitarTexto
} from "../../utils/formatadores";

import {
  validarTelefone,
  validarEmail,
  validarCRN
} from "../../utils/validadores";

const PERFIS = {
  NUTRICIONISTA: 1,
  SECRETARIA: 2,
  ADMINISTRADOR: 3
};

function montarForm(usuario) {

  return {

    nome:
      usuario?.nome || "",

    email:
      usuario?.email || "",

    senha: "",

    perfil:
      usuario?.perfil?.toUpperCase() || "",

    telefone:
      formatarTelefone(
        usuario?.telefone || ""
      ),

    crn:
      usuario?.crn || "",

    especialidade:
      usuario?.especialidade || "",

    ativo:
      usuario?.ativo ?? true
  };
}

function ModalEditarUsuario({
  aberto,
  onClose,
  usuario
}) {

  const [form, setForm] =
    useState(null);

  const [erros, setErros] =
    useState({});

  if (
    !form &&
    usuario &&
    aberto
  ) {

    setForm(
      montarForm(usuario)
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

    if (!form.email.trim()) {

      novosErros.email =
        "E-mail obrigatório";

    } else if (
      !validarEmail(form.email)
    ) {

      novosErros.email =
        "E-mail inválido";
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
      !PERFIS[form.perfil]
    ) {

      novosErros.perfil =
        "Perfil inválido";
    }

    if (
      form.perfil ===
      "NUTRICIONISTA"
    ) {

      if (
        !validarCRN(
          form.crn
        )
      ) {

        novosErros.crn =
          "CRN inválido";
      }

      if (
        !form.especialidade.trim()
      ) {

        novosErros.especialidade =
          "Especialidade obrigatória";
      }
    }

    setErros(novosErros);

    if (
      Object.keys(novosErros)
        .length > 0
    ) {

      return;
    }

    try {

      const usuarioAtualizado = {

        nome:
          form.nome,

        email:
          form.email,

        perfilId:
          PERFIS[
          form.perfil
          ],

        telefone:
          limparNumeros(
            form.telefone
          ),

        crn:
          form.perfil ===
            "NUTRICIONISTA"
            ? form.crn
            : null,

        especialidade:
          form.perfil ===
            "NUTRICIONISTA"
            ? form.especialidade
            : null
      };

      if (form.senha) {

        usuarioAtualizado.senha =
          form.senha;
      }

      await api.put(
        `/usuarios/${usuario.id}`,
        usuarioAtualizado
      );

      if (
        form.ativo !==
        usuario.ativo
      ) {

        await api.put(
          `/usuarios/${usuario.id}/status`,
          null,
          {
            params: {
              ativo:
                form.ativo
            }
          }
        );
      }

      toast.sucesso(
        "Usuário atualizado com sucesso"
      );

      handleClose();

    } catch (error) {

      console.error(
        "Erro ao atualizar usuário:",
        error
      );

      toast.erro(
        "Erro ao atualizar usuário"
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
            Editar usuário
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

        <div className="form-group">

          <InputCustom
            label="E-mail"
            required
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
            label="Senha (opcional)"
            type="password"
            placeholder="Deixe em branco para não alterar"
            maxLength={100}
            value={form.senha}
            onChange={(e) =>
              setForm(prev => ({
                ...prev,
                senha:
                  e.target.value
              }))
            }
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <SelectCustom
              label="Perfil"
              required
              valor={form.perfil}
              error={erros.perfil}
              onChange={(valor) =>
                setForm(prev => ({
                  ...prev,
                  perfil: valor
                }))
              }
              opcoes={[
                {
                  label:
                    "Administrador",

                  valor:
                    "ADMINISTRADOR"
                },
                {
                  label:
                    "Secretária",

                  valor:
                    "SECRETARIA"
                },
                {
                  label:
                    "Nutricionista",

                  valor:
                    "NUTRICIONISTA"
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

          <SelectCustom
            label="Status"
            valor={
              form.ativo
                ? "true"
                : "false"
            }
            onChange={(valor) =>
              setForm(prev => ({
                ...prev,

                ativo:
                  valor === "true"
              }))
            }
            opcoes={[
              {
                label: "Ativo",
                valor: "true"
              },
              {
                label: "Inativo",
                valor: "false"
              }
            ]}
          />

        </div>

        {form.perfil ===
          "NUTRICIONISTA" && (

            <>

              <div className="form-group">

                <InputCustom
                  label="CRN"
                  required
                  value={form.crn}
                  error={erros.crn}
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,
                      crn: formatarCRN(
                        e.target.value
                      )
                    }))
                  }
                />

              </div>

              <div className="form-group">

                <InputCustom
                  label="Especialidade"
                  required
                  maxLength={100}
                  value={
                    form.especialidade
                  }
                  error={
                    erros.especialidade
                  }
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,

                      especialidade:
                        e.target.value
                    }))
                  }
                />

              </div>

            </>

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
          Salvar alterações
        </Button>

      </div>

    </Modal>
  );
}

export default ModalEditarUsuario;