import { useState } from "react";

import { UserPlus } from "lucide-react";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import InputCustom from "../InputCustom/InputCustom";
import SelectCustom from "../SelectCustom/SelectCustom";

import api from "../../services/api";
import toast from "../../utils/toast";

import "./ModalNovoUsuario.css";

import {
  formatarTelefone,
  limparNumeros,
  limitarTexto,
  formatarCRN
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

function ModalNovoUsuario({
  aberto,
  onClose,
  onUsuarioCriado
}) {

  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [perfil, setPerfil] =
    useState("");

  const [telefone, setTelefone] =
    useState("");

  const [crn, setCrn] =
    useState("");

  const [
    especialidade,
    setEspecialidade
  ] = useState("");

  const [erros, setErros] =
    useState({});

  function limparFormulario() {

    setNome("");
    setEmail("");
    setSenha("");
    setPerfil("");
    setTelefone("");
    setCrn("");
    setEspecialidade("");

    setErros({});
  }

  function handleClose() {

    limparFormulario();

    onClose();
  }

  async function handleSalvar() {

    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome =
        "Nome obrigatório";
    }

    if (!email.trim()) {

      novosErros.email =
        "E-mail obrigatório";

    } else if (
      !validarEmail(email)
    ) {

      novosErros.email =
        "E-mail inválido";
    }

    if (!senha.trim()) {
      novosErros.senha =
        "Senha obrigatória";
    }

    if (!perfil) {
      novosErros.perfil =
        "Selecione o perfil";
    }

    if (!telefone) {

      novosErros.telefone =
        "Telefone obrigatório";

    } else if (
      !validarTelefone(telefone)
    ) {

      novosErros.telefone =
        "Telefone inválido";
    }

    if (
      perfil ===
      "NUTRICIONISTA"
    ) {

      if (!validarCRN(crn)) {
        novosErros.crn =
          "CRN obrigatório";
      }

      if (
        !especialidade.trim()
      ) {

        novosErros.especialidade =
          "Especialidade obrigatória";
      }
    }

    if (
      senha.length < 6
    ) {

      novosErros.senha =
        "Mínimo 6 caracteres";
    }

    setErros(novosErros);

    if (
      Object.keys(novosErros)
        .length > 0
    ) {

      return;
    }

    try {

      const novoUsuario = {

        nome,

        email,

        senha,

        perfilId:
          PERFIS[perfil],

        telefone:
          limparNumeros(
            telefone
          ),

        ativo: true,

        crn:
          perfil ===
            "NUTRICIONISTA"
            ? crn
            : null,

        especialidade:
          perfil ===
            "NUTRICIONISTA"
            ? especialidade
            : null
      };

      await api.post(
        "/usuarios",
        novoUsuario
      );

      toast.sucesso(
        "Usuário cadastrado com sucesso"
      );

      onUsuarioCriado();

      handleClose();

    } catch (error) {

      console.error(
        "Erro ao cadastrar usuário:",
        error
      );

      toast.erro(
        "Erro ao cadastrar usuário"
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

          <UserPlus
            size={20}
            className="modal-icon"
          />

          <h2>
            Novo usuário
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
            placeholder="Digite o nome completo"
            maxLength={150}
            value={nome}
            onChange={(e) =>
              setNome(
                limitarTexto(
                  e.target.value,
                  150
                )
              )
            }
            error={erros.nome}
          />

        </div>

        <div className="form-group">

          <InputCustom
            label="E-mail"
            required
            placeholder="exemplo@email.com"
            maxLength={150}
            value={email}
            onChange={(e) =>
              setEmail(
                limitarTexto(
                  e.target.value,
                  150
                )
              )
            }
            error={erros.email}
          />

        </div>

        <div className="form-group">

          <InputCustom
            label="Senha"
            required
            type="password"
            placeholder="Digite a senha"
            maxLength={100}
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
            error={erros.senha}
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <SelectCustom
              label="Perfil de usuário"
              required
              placeholder="Selecione o perfil"
              valor={perfil}
              onChange={setPerfil}
              error={erros.perfil}
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
              value={telefone}
              onChange={(e) =>
                setTelefone(
                  formatarTelefone(
                    e.target.value
                  )
                )
              }
              error={erros.telefone}
            />

          </div>

        </div>

        {perfil ===
          "NUTRICIONISTA" && (

            <>

              <div className="form-group">

                <InputCustom
                  label="CRN"
                  required
                  placeholder="Digite o CRN"
                  value={crn}
                  onChange={(e) =>
                    setCrn(
                      formatarCRN(
                        e.target.value
                      )
                    )
                  }
                  error={erros.crn}
                />

              </div>

              <div className="form-group">

                <InputCustom
                  label="Especialidade"
                  required
                  placeholder="Ex: Nutrição clínica"
                  maxLength={100}
                  value={especialidade}
                  onChange={(e) =>
                    setEspecialidade(
                      e.target.value
                    )
                  }
                  error={
                    erros.especialidade
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
          Salvar
        </Button>

      </div>

    </Modal>
  );
}

export default ModalNovoUsuario;