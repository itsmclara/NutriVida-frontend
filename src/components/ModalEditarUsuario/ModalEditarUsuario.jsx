import { useState } from "react";
import { UserPen } from "lucide-react";
import Modal from "../Modal/Modal";
import api from "../../services/api";
import "./ModalEditarUsuario.css";

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

function montarForm(usuario) {
  return {
    nome: usuario?.nome || "",
    email: usuario?.email || "",
    senha: "", 
    perfil: usuario?.perfil || "",
    telefone: formatarTelefone(usuario?.telefone || ""),
    crn: usuario?.crn || "",
    especialidade: usuario?.especialidade || ""
  };
}

function ModalEditarUsuario({ aberto, onClose, usuario }) {

  const [form, setForm] = useState(null);

  if (!form && usuario && aberto) {
    setForm(montarForm(usuario));
  }

  function handleClose() {
    setForm(null);
    onClose();
  }

  async function handleSalvar() {
    try {

      if (!form.nome.trim()) return alert("Nome obrigatório");

      if (!form.email.trim()) return alert("E-mail obrigatório");

      if (!validarEmail(form.email)) return alert("E-mail inválido");

      if (!form.telefone) return alert("Telefone obrigatório");

      if (!validarTelefone(form.telefone)) return alert("Telefone inválido");

      if (!PERFIS[form.perfil]) return alert("Perfil de usuário inválido");

      const usuarioAtualizado = {
        nome: form.nome,
        email: form.email,
        perfilId: PERFIS[form.perfil],
        telefone: limparNumeros(form.telefone),

        crn: form.perfil === "NUTRICIONISTA" ? form.crn : null,
        especialidade:
          form.perfil === "NUTRICIONISTA" ? form.especialidade : null
      };

      if (form.senha) {
        usuarioAtualizado.senha = form.senha;
      }

      console.log("ATUALIZANDO USUARIO:", usuarioAtualizado);

      await api.put(`/usuario/${usuario.id}`, usuarioAtualizado);

      alert("Usuário atualizado com sucesso");

      handleClose();

    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar usuário");
    }
  }

  if (!form) return null;

  return (
    <Modal aberto={aberto} onClose={handleClose}>

      <div className="modal-header">
        <div className="modal-title">
          <UserPen size={20} className="modal-icon" />
          <h2>Editar usuário</h2>
        </div>

        <button className="close-btn" onClick={handleClose}>×</button>
      </div>

      <div className="modal-body">

        <div className="form-group">
          <label>Nome</label>
          <input
            value={form.nome}
            onChange={(e) =>
              setForm(prev => ({ ...prev, nome: e.target.value }))
            }
          />
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <input
            value={form.email}
            onChange={(e) =>
              setForm(prev => ({ ...prev, email: e.target.value }))
            }
          />
        </div>

        <div className="form-group">
          <label>Senha (opcional)</label>
          <input
            type="password"
            placeholder="Deixe em branco para não alterar"
            value={form.senha}
            onChange={(e) =>
              setForm(prev => ({ ...prev, senha: e.target.value }))
            }
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Perfil de usuário</label>
            <select
              value={form.perfil}
              onChange={(e) =>
                setForm(prev => ({ ...prev, perfil: e.target.value }))
              }
              className={!form.perfil ? "placeholder" : ""}
            >
              <option value="">Selecione</option>
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="SECRETARIA">Secretária</option>
              <option value="NUTRICIONISTA">Nutricionista</option>
            </select>
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              value={form.telefone}
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,
                  telefone: formatarTelefone(e.target.value)
                }))
              }
            />
          </div>

        </div>

        {form.perfil === "NUTRICIONISTA" && (
          <>
            <div className="form-group">
              <label>CRN</label>
              <input
                value={form.crn}
                onChange={(e) =>
                  setForm(prev => ({ ...prev, crn: e.target.value }))
                }
              />
            </div>

            <div className="form-group">
              <label>Especialidade</label>
              <input
                value={form.especialidade}
                onChange={(e) =>
                  setForm(prev => ({
                    ...prev,
                    especialidade: e.target.value
                  }))
                }
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

export default ModalEditarUsuario;