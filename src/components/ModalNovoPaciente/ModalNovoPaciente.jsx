import { useState } from "react";

import { UserPlus } from "lucide-react";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import InputCustom from "../InputCustom/InputCustom";
import SelectCustom from "../SelectCustom/SelectCustom";

import { buscarCep } from "../../services/viaCep";
import api from "../../services/api";
import toast from "../../utils/toast";

import "./ModalNovoPaciente.css";

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

function ModalNovoPaciente({
  aberto,
  onClose,
  onPacienteCriado
}) {

  const [nome, setNome] =
    useState("");

  const [cpf, setCpf] =
    useState("");

  const [
    dataNascimento,
    setDataNascimento
  ] = useState("");

  const [genero, setGenero] =
    useState("");

  const [telefone, setTelefone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [cep, setCep] =
    useState("");

  const [logradouro, setLogradouro] =
    useState("");

  const [numero, setNumero] =
    useState("");

  const [bairro, setBairro] =
    useState("");

  const [erros, setErros] =
    useState({});

  function limparFormulario() {

    setNome("");
    setCpf("");
    setDataNascimento("");
    setGenero("");
    setTelefone("");
    setEmail("");
    setCep("");
    setLogradouro("");
    setNumero("");
    setBairro("");

    setErros({});
  }

  function handleClose() {

    limparFormulario();

    onClose();
  }

  function validarFormulario() {

    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome =
        "Nome obrigatório";
    }

    if (!validarCPF(cpf)) {
      novosErros.cpf =
        "CPF inválido";
    }

    if (
      !validarData(dataNascimento)
    ) {

      novosErros.dataNascimento =
        "Data inválida";
    }

    if (!genero) {
      novosErros.genero =
        "Selecione o gênero";
    }

    if (
      !validarTelefone(telefone)
    ) {

      novosErros.telefone =
        "Telefone inválido";
    }

    if (
      email &&
      !validarEmail(email)
    ) {

      novosErros.email =
        "E-mail inválido";
    }

    if (
      cep &&
      !validarCEP(cep)
    ) {

      novosErros.cep =
        "CEP inválido";
    }

    setErros(novosErros);

    return (
      Object.keys(novosErros)
        .length === 0
    );
  }

  async function handleSalvar() {

    try {

      if (
        !validarFormulario()
      ) return;

      const novoPaciente = {

        nome,

        cpf: limparNumeros(cpf),

        dataNascimento:
          formatarDataISO(
            dataNascimento
          ),

        genero,

        email,

        telefone:
          limparNumeros(
            telefone
          ),

        cep:
          cep
            ? limparNumeros(cep)
            : null,

        logradouro:
          logradouro.trim()
            ? logradouro
            : null,

        bairro:
          bairro.trim()
            ? bairro
            : null,

        numero:
          numero
            ? Number(numero)
            : null,
      };

      const res =
        await api.post(
          "/pacientes",
          novoPaciente
        );

      toast.sucesso(
        "Paciente cadastrado com sucesso"
      );

      await onPacienteCriado?.(
        res.data
      );

      handleClose();

    } catch (error) {

      console.error(
        "Erro ao salvar paciente:",
        error
      );

      toast.erro(

        error?.response?.data?.message ||

        error?.response?.data ||

        "Erro ao salvar paciente"

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
            Novo paciente
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

        <div className="form-row">

          <div className="form-group">

            <InputCustom
              label="CPF"
              required
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) =>
                setCpf(
                  formatarCPF(
                    e.target.value
                  )
                )
              }
              error={erros.cpf}
            />

          </div>

          <div className="form-group">

            <InputCustom
              label="Data de nascimento"
              required
              placeholder="dd/mm/aaaa"
              value={dataNascimento}
              onChange={(e) =>
                setDataNascimento(
                  formatarData(
                    e.target.value
                  )
                )
              }
              error={
                erros.dataNascimento
              }
            />

          </div>

        </div>

        <div className="form-row">

          <div className="form-group">

            <SelectCustom
              label="Gênero"
              required
              placeholder="Selecione o gênero"
              valor={genero}
              onChange={setGenero}
              error={erros.genero}
              opcoes={[
                {
                  label: "Feminino",
                  valor: "Feminino"
                },
                {
                  label: "Masculino",
                  valor: "Masculino"
                },
                {
                  label: "Outro",
                  valor: "Outro"
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

        <div className="form-group">

          <InputCustom
            label="E-mail"
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
            label="CEP"
            placeholder="00000-000"
            value={cep}
            onChange={async (e) => {

              const valor =
                formatarCEP(
                  e.target.value
                );

              setCep(valor);

              const cepLimpo =
                limparNumeros(valor);

              if (
                cepLimpo.length === 8
              ) {

                buscarCep(cepLimpo)
                  .then((data) => {

                    if (
                      data &&
                      !data.erro
                    ) {

                      setLogradouro(
                        data.logradouro
                      );

                      setBairro(
                        data.bairro
                      );
                    }

                  })
                  .catch(() => { });
              }
            }}
            error={erros.cep}
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <InputCustom
              label="Logradouro"
              placeholder="Rua, avenida..."
              maxLength={100}
              value={logradouro}
              onChange={(e) =>
                setLogradouro(
                  e.target.value
                )
              }
            />

          </div>

          <div className="form-group small">

            <InputCustom
              label="Número"
              placeholder="123"
              maxLength={10}
              value={numero}
              onChange={(e) =>
                setNumero(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
            />

          </div>

        </div>

        <div className="form-group">

          <InputCustom
            label="Bairro"
            placeholder="Centro"
            maxLength={100}
            value={bairro}
            onChange={(e) =>
              setBairro(
                e.target.value
              )
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
          Salvar
        </Button>

      </div>

    </Modal>
  );
}

export default ModalNovoPaciente;