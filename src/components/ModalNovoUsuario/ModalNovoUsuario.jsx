import { useState } from "react";
import { UserPlus } from "lucide-react";
import Modal from "../Modal/Modal";
import api from "../../services/api";
import "./ModalNovoUsuario.css";

import {
  formatarTelefone,
  limparNumeros
} from "../../utils/formatadores";

import { 
  validarTelefone, 
  validarEmail
} from "../../utils/validadores";

const PERFIS = {
    NUTRICIONISTA: 1,
    SECRETARIA: 2,
    ADMINISTRADOR:3
};

function ModalNovoUsuario({ aberto, onClose, onUsuarioCriado }) {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("");
  const [telefone, setTelefone] = useState("");
  const [crn, setCrn] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  function limparFormulario() {
    setNome("");
    setEmail("");
    setSenha("");
    setPerfil("");
    setTelefone("");
    setCrn("");
    setEspecialidade("");
  }

  function handleClose() {
    limparFormulario();
    onClose();
  }

  async function handleSalvar() {
    try {

      if (!nome.trim()) return alert("Nome obrigatório");

      if (!email.trim()) return alert("E-mail obrigatório");

      if (!validarEmail(email)) return alert("E-mail inválido");

      if (!senha.trim()) return alert("Senha obrigatória");

      if (!perfil) return alert("Selecione o perfil");

      if (!telefone) return alert("Telefone obrigatório");

      if (!validarTelefone(telefone)) return alert("Telefone inválido");

      const novoUsuario = {
        nome,
        email,
        senha,
        perfilId: PERFIS[perfil],
        telefone: limparNumeros(telefone),
        crn: perfil === "NUTRICIONISTA" ? crn : null,
        especialidade: perfil === "NUTRICIONISTA" ? especialidade : null
      };

      console.log("ENVIANDO:", novoUsuario);

      await api.post("/usuario", novoUsuario);

      alert("Usuário cadastrado com sucesso");
      
      onUsuarioCriado();
      handleClose();

    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário");
    }
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
            <label>Perfil de usuário</label>
            <select
              value={perfil}
              onChange={(e) => setPerfil(e.target.value)}
              className={!perfil ? "placeholder" : ""}
            >
              <option value="">Selecione o perfil</option>
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="SECRETARIA">Secretária</option>
              <option value="NUTRICIONISTA">Nutricionista</option>
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

        {perfil === "NUTRICIONISTA" && (
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