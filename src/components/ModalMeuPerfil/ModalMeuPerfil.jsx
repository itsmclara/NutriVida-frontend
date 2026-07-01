import { useState, useEffect } from "react";

import { UserPen } from "lucide-react";

import Modal from "../Modal/Modal";

import Button from "../Button/Button";
import InputCustom from "../InputCustom/InputCustom";

import api from "../../services/api";
import toast from "../../utils/toast";

import "./ModalMeuPerfil.css";

import {
  formatarTelefone,
  formatarCRN,
  limparNumeros
} from "../../utils/formatadores";

import {
  validarTelefone,
  validarEmail,
  validarCRN
} from "../../utils/validadores";

function montarForm(usuario) {

  return {

    nome:
      usuario?.nome || "",

    email:
      usuario?.email || "",

    senha: "",

    telefone:
      formatarTelefone(
        usuario?.telefone || ""
      ),

    crn:
      usuario?.crn || "",

    especialidade:
      usuario?.especialidade || "",

    perfil:
      usuario?.perfil || ""
  };
}

function ModalMeuPerfil({
  aberto,
  onClose,
  usuario,
  onAtualizado
}) {

  const [erros, setErros] =
    useState({});

  const [form, setForm] =
    useState(montarForm(usuario));

  useEffect(() => {

    if (aberto && usuario) {

      setForm(
        montarForm(usuario)
      );
    }

  }, [aberto, usuario]);

  function handleClose() {

    setForm(null);

    setErros({});

    onClose();
  }

  async function handleSalvar() {

    try {

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
        !validarTelefone(form.telefone)
      ) {

        novosErros.telefone =
          "Telefone inválido";
      }

      if (
        form.perfil ===
        "NUTRICIONISTA"
      ) {

        if (
          !validarCRN(form.crn)
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

      const dadosAtualizados = {

        nome:
          form.nome,

        email:
          form.email,

        telefone:
          limparNumeros(form.telefone),

        crn:
          form.perfil === "NUTRICIONISTA"
            ? form.crn
            : null,

        especialidade:
          form.perfil === "NUTRICIONISTA"
            ? form.especialidade
            : null
      };

      if (form.senha) {

        dadosAtualizados.senha =
          form.senha;
      }

      await api.put(
        "/usuarios/me",
        dadosAtualizados
      );

      toast.sucesso(
        "Perfil atualizado com sucesso"
      );

      const usuarioAtualizado = {

        ...usuario,
        ...dadosAtualizados
      };

      sessionStorage.setItem(
        "usuario",
        JSON.stringify(usuarioAtualizado)
      );

      onAtualizado?.();

      handleClose();

    } catch (error) {

      console.error(
        "Erro ao atualizar perfil:",
        error
      );

      toast.erro(

        error?.response?.data?.message ||

        error?.response?.data ||

        "Erro ao atualizar perfil"

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
            Editar meu perfil
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

        <InputCustom
          label="Nome"
          required
          maxLength={150}
          value={form.nome}
          error={erros.nome}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              nome: e.target.value
            }))
          }
        />

        <InputCustom
          label="E-mail"
          required
          maxLength={150}
          value={form.email}
          error={erros.email}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              email: e.target.value
            }))
          }
        />

        <InputCustom
          label="Senha (opcional)"
          type="password"
          placeholder="Deixe em branco para não alterar"
          maxLength={100}
          value={form.senha}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              senha: e.target.value
            }))
          }
        />

        <InputCustom
          label="Telefone"
          required
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

        {form.perfil === "NUTRICIONISTA" && (
          <>

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

            <InputCustom
              label="Especialidade"
              required
              maxLength={100}
              value={form.especialidade}
              error={erros.especialidade}
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,
                  especialidade:
                    e.target.value
                }))
              }
            />

          </>
        )}

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

export default ModalMeuPerfil;