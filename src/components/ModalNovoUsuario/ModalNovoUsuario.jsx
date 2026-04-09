import { useState } from "react";
import { UserPlus } from "lucide-react";
import Modal from "../Modal/Modal";
import "./ModalNovoUsuario.css";

function ModalNovoUsuario({ aberto, onClose }) {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [crn, setCrn] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  function limparFormulario() {
    setNome("");
    setEmail("");
    setSenha("");
    setTipo("");
    setTelefone("");
    setCrn("");
    setEspecialidade("");
  }

  function handleClose() {
    limparFormulario();
    onClose();
  }

  function handleSalvar() {
    const novoUsuario = {
      nome,
      email,
      senha,
      tipo,
      telefone,
      crn: tipo === "NUTRICIONISTA" ? crn : null,
      especialidade: tipo === "NUTRICIONISTA" ? especialidade : null
    };

    console.log("USUARIO:", novoUsuario);

    handleClose();
  }

  return (
    <Modal aberto={aberto} onClose={handleClose}>

      <div className="modal-header">
        <div className="modal-title">
          <UserPlus size={20} className="modal-icon" />
          <h2>Novo usuário</h2>
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

        <div className="form-group">
          <label>E-mail</label>
          <input
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tipo de usuário</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className={!tipo ? "placeholder" : ""}
            >
              <option value="">Selecione o tipo</option>
              <option value="ADMIN">Administrador</option>
              <option value="SECRETARIA">Secretária</option>
              <option value="NUTRICIONISTA">Nutricionista</option>
            </select>
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
        </div>

        {tipo === "NUTRICIONISTA" && (
          <>
            <div className="form-group">
              <label>CRN</label>
              <input
                placeholder="Digite o CRN"
                value={crn}
                onChange={(e) => setCrn(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Especialidade</label>
              <input
                placeholder="Ex: Nutrição clínica"
                value={especialidade}
                onChange={(e) => setEspecialidade(e.target.value)}
              />
            </div>
          </>
        )}

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

export default ModalNovoUsuario;