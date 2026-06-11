import "./Header.css";
import { formatarNomeNutri } from "../../utils/formatadores";
import { useState } from "react";
import ModalMeuPerfil from "../ModalMeuPerfil/ModalMeuPerfil";

function Header() {

  const [modalPerfilAberto, setModalPerfilAberto] = useState(false)

  const usuario = JSON.parse(sessionStorage.getItem("usuario")) || {};

  const iniciais = usuario?.nome
    ?.trim()
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="header">

      <div
        className="header-user"
        onClick={() => setModalPerfilAberto(true)}
      >

        <div className="user-info">
          <span className="user-name">
            {usuario?.perfil === "NUTRICIONISTA"
              ? formatarNomeNutri(usuario)
              : usuario?.nome || "Usuário"}
          </span>

          <span className="user-role">
            {usuario?.perfil === "SECRETARIA"
              ? "Secretária"
              : usuario?.perfil === "NUTRICIONISTA"
                ? "Nutricionista"
                : usuario?.perfil === "ADMINISTRADOR"
                  ? "Administrador"
                  : "Usuário"}
          </span>
        </div>

        <div className="user-avatar">
          {iniciais || "U"}
        </div>

      </div>

      <ModalMeuPerfil
        aberto={modalPerfilAberto}
        onClose={() => setModalPerfilAberto(false)}
        usuario={usuario}
      />

    </div>
  );
}

export default Header;