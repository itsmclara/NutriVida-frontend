import { useState } from "react";
import { UserPlus } from "lucide-react";
import Modal from "../Modal/Modal";
import { buscarCep } from "../../services/viaCep";
import api from "../../services/api";
import "./ModalNovoPaciente.css";

import {
  formatarCPF,
  formatarTelefone,
  formatarData,
  formatarCEP,
  formatarDataISO,
  limparNumeros
} from "../../utils/formatadores";

import { 
  validarCPF, 
  validarData, 
  validarTelefone, 
  validarCEP, 
  validarEmail
} from "../../utils/validadores";

function ModalNovoPaciente({ aberto, onClose, onPacienteCriado }) {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");

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
  }

  function handleClose() {
    limparFormulario();
    onClose();
  }

  async function handleSalvar() {
    try {

      if (!nome.trin()) return alert("Nome obrigatório");

      if (!validarCPF(cpf)) return alert("CPF inválido");

      if (!validarData(dataNascimento)) return alert("Data de nascimento inválida");

      if (!genero) return alert("Selecione o gênero");

      if (!validarTelefone(telefone)) alert("Telefone inválido");

      if (email && !validarEmail(email)) alert("E-mail inválido");

      if (cep && !validarCEP(cep)) alert("CEP inválido");

      const novoPaciente = {
        nome,
        cpf: limparNumeros(cpf),
        dataNascimento: formatarDataISO(dataNascimento),
        genero,
        email,
        telefone: limparNumeros(telefone),

        cep: limparNumeros(cep),
        logradouro,
        bairro,
        numero: numero ? Number(numero) : null,
      };

      console.log("ENVIANDO:", novoPaciente);

      await api.post("/paciente", novoPaciente);

      alert("Paciente cadastrado com sucesso");

      onPacienteCriado();
      handleClose();

    } catch (error) {
      console.error("Erro ao salvar paciente:", error);
      alert("Erro ao salvar paciente");
    }
  }

  return (
    <Modal aberto={aberto} onClose={handleClose}>

      <div className="modal-header">
        <div className="modal-title">
          <UserPlus size={20} className="modal-icon" />
          <h2>Novo paciente</h2>
        </div>

        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div className="modal-body">

        <div className="form-group">
          <label>Nome</label>
          <input
            placeholder="Digite o nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>CPF</label>
            <input
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatarCPF(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Data de nascimento</label>
            <input
              placeholder="dd/mm/aaaa"
              value={dataNascimento}
              onChange={(e) =>
                setDataNascimento(formatarData(e.target.value))
              }
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Gênero</label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className={!genero ? "placeholder" : ""}
            >
              <option value="">Selecione o gênero</option>
              <option>Feminino</option>
              <option>Masculino</option>
              <option>Outro</option>
              <option>Prefere não informar</option>
            </select>
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) =>
                setTelefone(formatarTelefone(e.target.value))
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <input
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>CEP</label>
          <input
            placeholder="00000-000"
            value={cep}
            onChange={async (e) => {
              const valor = formatarCEP(e.target.value);
              setCep(valor);

              const cepLimpo = limparNumeros(valor);

              if (cepLimpo.length === 8) {
                const data = await buscarCep(cepLimpo);

                if (data && !data.erro) {
                  setLogradouro(data.logradouro);
                  setBairro(data.bairro);
                }
              }
            }}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Logradouro</label>
            <input
              placeholder="Rua, avenida..."
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
            />
          </div>

          <div className="form-group small">
            <label>Número</label>
            <input
              placeholder="123"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Bairro</label>
          <input
            placeholder="Centro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>

      </div>

      <div className="modal-footer">
        <button className="btn-secondary" onClick={handleClose}>
          Cancelar
        </button>

        <button className="btn-primary" onClick={handleSalvar}>
          Salvar
        </button>
      </div>

    </Modal>
  );
}

export default ModalNovoPaciente;