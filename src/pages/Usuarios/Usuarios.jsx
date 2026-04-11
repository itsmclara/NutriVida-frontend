import { useState } from "react";
import { Eye, Pencil } from "lucide-react";
import ModalNovoUsuario from "../../components/ModalNovoUsuario/ModalNovoUsuario";
import ModalDetalhesUsuario from "../../components/ModalDetalhesUsuario/ModalDetalhesUsuario";

import "./Usuarios.css";
import { usuarios } from "../../mocks/dadosFake";

function Usuarios() {

  const [modalAberto, setModalAberto] = useState(false);

  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

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

      <div className="tabela-container">

        <table className="tabela">

          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Tipo</th>
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
                    <span className={`tipo ${u.tipo.toLowerCase()}`}>
                      {u.tipo}
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

                    <Pencil size={20} className="icon-edit" />
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
      />

      <ModalDetalhesUsuario
        aberto={modalDetalhesAberto}
        onClose={() => setModalDetalhesAberto(false)}
        usuario={usuarioSelecionado}
      />

    </>
  );
}

export default Usuarios;