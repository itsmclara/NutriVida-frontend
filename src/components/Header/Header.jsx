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

      <input
        type="text"
        placeholder="Buscar paciente por nome ou CPF"
        className="header-search"
      />

      <div className="header-user">

        <div className="user-info">
          <span className="user-name">
            {usuario?.nome || "Usuário"}
          </span>

          <span className="user-role">
            {usuario?.tipo === "SECRETARIA"
            ? "Secretária"
            : usuario?.tipo === "NUTRICIONISTA"
            ? "Nutricionista"
            : usuario?.tipo === "ADMINISTRADOR"
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