import "./Header.css";

function Header() {

  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

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

      <div className="header-user">

        <div className="user-info">
          <span className="user-name">
            {usuario?.nome || "Usuário"}
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

    </div>
  );
}

export default Header;