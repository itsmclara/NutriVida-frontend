import { useState } from "react";
import { UserPen } from "lucide-react";
import Modal from "../Modal/Modal";
import api from "../../services/api";
import "./ModalEditarPaciente.css"
import { buscarCep } from "../../services/viaCep";

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

function montarForm(paciente) {
  return {
    nome: paciente?.nome || "",
    cpf: formatarCPF(paciente?.cpf || ""),
    dataNascimento: formatarData(paciente?.dataNascimento || ""),
    genero: paciente?.genero || "",
    telefone: formatarTelefone(paciente?.telefone || ""),
    email: paciente?.email || "",
    cep: formatarCEP(paciente?.cep || ""),
    logradouro: paciente?.logradouro || "",
    numero: paciente?.numero || "",
    bairro: paciente?.bairro || ""
  };
}

function ModalEditarPaciente({ aberto, onClose, paciente }) {

  const [form, setForm] = useState(null);

  if (!form && paciente && aberto) {
    setForm(montarForm(paciente));
  }

  function handleClose() {
    setForm(null); 
    onClose();
  }

  async function handleSalvar() {
    try {

      if (!form.nome.trim()) return alert("Nome obrigatório");

      if (!validarCPF(form.cpf)) return alert("CPF inválido");

      if (!validarData(form.dataNascimento)) return alert("Data de nascimento inválida");

      if (!form.genero) return alert("Selecione o gênero");

      if (!form.telefone) return alert("Telefone obrigatório");

      if (!validarTelefone(form.telefone)) return alert("Telefone inválido");

      if (form.email && !validarEmail(form.email)) return alert("E-mail inválido");

      if (form.cep && !validarCEP(form.cep)) return alert("CEP inválido");

      const pacienteAtualizado = {
        nome: form.nome,
        cpf: limparNumeros(form.cpf),
        logradouro: form.logradouro,
        dataNascimento: formatarDataISO(form.dataNascimento),
        email: form.email,
        genero: form.genero,
        bairro: form.bairro,
        numero: form.numero ? Number(form.numero) : null,
        cep: limparNumeros(form.cep),
        telefone: limparNumeros(form.telefone),
      };

      console.log("ATUALIZANDO:", pacienteAtualizado);

      await api.put(`/paciente/${paciente.id}`, pacienteAtualizado);

      alert("Paciente atualizado com sucesso");

      handleClose();

    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      alert("Erro ao atualizar paciente");
    }
  }

  if (!form) return null;

  return (
    <Modal aberto={aberto} onClose={handleClose}>

      <div className="modal-header">
        <div className="modal-title">
          <UserPen size={20} className="modal-icon" />
          <h2>Editar paciente</h2>
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

        <div className="form-row">
          <div className="form-group">
            <label>CPF</label>
            <input
              value={form.cpf}
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,
                  cpf: formatarCPF(e.target.value)
                }))
              }
            />
          </div>

          <div className="form-group">
            <label>Data de nascimento</label>
            <input
              value={form.dataNascimento}
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,
                  dataNascimento: formatarData(e.target.value)
                }))
              }
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Gênero</label>
            <select
              value={form.genero}
              onChange={(e) =>
                setForm(prev => ({ ...prev, genero: e.target.value }))
              }
            >
              <option value="">Selecione</option>
              <option>Feminino</option>
              <option>Masculino</option>
              <option>Outro</option>
              <option>Prefere não informar</option>
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
          <label>CEP</label>
          <input
            value={form.cep}
            onChange={async (e) => {
              const valor = formatarCEP(e.target.value);

              setForm(prev => ({ ...prev, cep: valor }));

              const data = await buscarCep(valor.replace(/\D/g, ""));

              if (data && !data.erro) {
                setForm(prev => ({
                  ...prev,
                  logradouro: data.logradouro,
                  bairro: data.bairro
                }));
              }
            }}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Logradouro</label>
            <input
              value={form.logradouro}
              onChange={(e) =>
                setForm(prev => ({ ...prev, logradouro: e.target.value }))
              }
            />
          </div>

          <div className="form-group small">
            <label>Número</label>
            <input
              value={form.numero}
              onChange={(e) =>
                setForm(prev => ({ ...prev, numero: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Bairro</label>
          <input
            value={form.bairro}
            onChange={(e) =>
              setForm(prev => ({ ...prev, bairro: e.target.value }))
            }
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

export default ModalEditarPaciente;