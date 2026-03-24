import { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo-vertical.svg"

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      setErro("Preencha todos os campos");
      return;
    }

    if (!email.includes("@")) {
      setErro("E-mail inválido");
      return;
    }

    setErro("");

  }

  return (
    <div className="login-container">
      <div className="login-card">

        <img src={logo} alt="Logo" className="login-logo" />

        <h2 className="login-title">Entrar no sistema</h2>
        <p className="login-subtitle">
          Acesse sua conta para continuar
        </p>

        <div className="login-field">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>

        {erro && <p className="erro">{erro}</p>}

      </div>
    </div>
  );
}

export default Login;