import { useState, useEffect } from "react";
import { Eye, Pencil, Plus } from "lucide-react";
import "./Usuarios.css";

import api from "../../services/api";

import ModalNovoUsuario from "../../components/ModalNovoUsuario/ModalNovoUsuario";
import ModalDetalhesUsuario from "../../components/ModalDetalhesUsuario/ModalDetalhesUsuario";
import ModalEditarUsuario from "../../components/ModalEditarUsuario/ModalEditarUsuario";
import InputBusca from "../../components/InputBusca/InputBusca";
import FiltroSelect from "../../components/FiltroSelect/FiltroSelect";
import Button from "../../components/Button/Button";

function Usuarios() {

  const [usuarios, setUsuarios] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);

  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const [perfil, setPerfil] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
  async function carregarInicial() {
    try {
      const res = await api.get("/usuarios", {
        params: { limit: 5 }
      });
      setUsuarios(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  }

  carregarInicial();
}, []);

  async function buscarUsuarios(termo, perfilParam = perfil, statusParam = status) {
    try {
      const params = {};

      if (termo) {
        params.busca = termo;
      } else {
        params.limit = 5;
      }

      if (perfilParam) params.perfil = perfilParam;
      if (statusParam) params.ativo = statusParam === "ATIVO";

      const res = await api.get("/usuarios", { params });

      setUsuarios(Array.isArray(res.data) ? res.data : []);

    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  return (
    <>
      <div className="usuarios-header">
        <div>
          <h1>Usuários</h1>
          <p>Gerencie os usuários do sistema.</p>
        </div>

        <Button
          onClick={() => setModalAberto(true)}
          icon={<Plus size={18} />}
        >
          Novo usuário
        </Button>
      </div>

      <div className="filtros-container">

        <InputBusca
          label="Buscar"
          placeholder="Buscar usuário por nome ou e-mail"
          onBuscar={(termo) =>
            buscarUsuarios(termo)
          }
        />

        <FiltroSelect
          label="Perfil"
          valor={perfil}
          onChange={(valor) => {
            setPerfil(valor);
            buscarUsuarios(null, valor, status);
          }}
          opcoes={["ADMINISTRADOR", "NUTRICIONISTA", "SECRETARIA"]}
        />

        <FiltroSelect
          label="Status"
          valor={status}
          onChange={(valor) => {
            setStatus(valor);
            buscarUsuarios(null, perfil, valor);
          }}
          opcoes={["ATIVO", "INATIVO"]}
        />

      </div>

      <div className="tabela-container">
        <table className="tabela">

          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Perfil</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nome}</td>
                  <td>{u.email}</td>

                  <td>
                    <span className={`perfil ${u.perfil?.toLowerCase() || ""}`}>
                      {u.perfil}
                    </span>
                  </td>

                  <td>
                    <span className={`usuario-status ${u.ativo ? "ativo" : "inativo"}`}>
                      {u.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  <td className="acoes">

                    <Eye
                      size={20}
                      className="icon-view"
                      onClick={() => {
                        setUsuarioSelecionado(u);
                        setModalDetalhesAberto(true);
                      }}
                    />

                    <Pencil
                      size={20}
                      className="icon-edit"
                      onClick={() => {
                        setUsuarioSelecionado(u);
                        setModalEditarAberto(true);
                      }}
                    />

                  </td>
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan="6" className="empty-message">
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* MODAIS */}

      <ModalNovoUsuario
        aberto={modalAberto}
        onClose={() => setModalAberto(false)}
        onUsuarioCriado={() => buscarUsuarios()}
      />

      <ModalDetalhesUsuario
        aberto={modalDetalhesAberto}
        onClose={() => setModalDetalhesAberto(false)}
        usuario={usuarioSelecionado}
        onEditar={() => {
          setModalDetalhesAberto(false);
          setModalEditarAberto(true);
        }}
      />

      <ModalEditarUsuario
        aberto={modalEditarAberto}
        onClose={() => {
          setModalEditarAberto(false);
          buscarUsuarios();
        }}
        usuario={usuarioSelecionado}
      />

    </>
  );
}

export default Usuarios;