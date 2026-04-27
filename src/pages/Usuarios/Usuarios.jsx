import { useState, useEffect } from "react";
import { Eye, Pencil } from "lucide-react";
import "./Usuarios.css";

import api from "../../services/api";

import ModalNovoUsuario from "../../components/ModalNovoUsuario/ModalNovoUsuario";
import ModalDetalhesUsuario from "../../components/ModalDetalhesUsuario/ModalDetalhesUsuario";
import ModalEditarUsuario from "../../components/ModalEditarUsuario/ModalEditarUsuario";
import BuscaInput from "../../components/BuscaInput/BuscaInput";

function Usuarios() {

  const [usuarios, setUsuarios] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  async function buscarUsuarios(termo) {
  try {
    let res;

    if (termo) {
      res = await api.get(`/usuario?busca=${termo}`);
    } else {
      res = await api.get("/usuario");
    }

    if (Array.isArray(res.data)) {
      setUsuarios(res.data);
    } else {
      setUsuarios([]);
    }

    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  useEffect(() => {
      async function carregarUsuarios() {
        await buscarUsuarios();
      }
  
      carregarUsuarios();
  }, []);


  return (
    <>

      <div className="usuarios-header">

        <div>
          <h1>Usuarios</h1>
          <p>
            Gerencie os usuários do sistema.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setModalAberto(true)}
        >
          + Novo usuário
        </button>

      </div>

      <div className="busca-wrapper">
        <BuscaInput
          placeholder="Buscar usuário por nome ou perfil"
          onBuscar={buscarUsuarios}
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
                <td colSpan="5" className="empty-message">
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

      <ModalNovoUsuario
        aberto={modalAberto}
        onClose={() => setModalAberto(false)}
        onUsuarioCriado={buscarUsuarios}
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