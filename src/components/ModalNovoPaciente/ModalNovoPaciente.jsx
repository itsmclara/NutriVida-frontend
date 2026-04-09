import { useState } from "react";
import { UserPlus } from "lucide-react";
import Modal from "../Modal/Modal";
import { buscarCep } from "../../services/viaCep";
import "./ModalNovoPaciente.css";

function ModalNovoPaciente({ aberto, onClose }) {

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
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  function formatarCPF(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function formatarTelefone(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  function formatarData(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2");
  }

  function formatarCEP(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

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
    setCidade("");
    setUf("");
  }

  function handleClose() {
    limparFormulario();
    onClose();
  }

  function handleSalvar() {
    const novoPaciente = {
      nome,
      cpf,
      dataNascimento,
      genero,
      telefone,
      email,
      endereco: {
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        uf
      }
    };

    console.log("PACIENTE:", novoPaciente);

    handleClose();
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

              const data = await buscarCep(valor);

              if (data && !data.erro) {
                setLogradouro(data.logradouro);
                setBairro(data.bairro);
                setCidade(data.localidade);
                setUf(data.uf)
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

        <div className="form-row">
          <div className="form-group">
            <label>Cidade</label>
            <input
              placeholder="Ivaiporã"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>

          <div className="form-group small">
            <label>UF</label>
            <input
              placeholder="PR"
              value={uf}
              maxLength={2}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>
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