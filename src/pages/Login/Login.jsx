import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api"; 

import "./Login.css";
import logo from "../../assets/logo-vertical.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
  if (!email.trim() || !senha.trim()) {
    setErro("Preencha todos os campos");
    return;
  }

  if (!email.includes("@")) {
    setErro("E-mail inválido");
    return;
  }

  setErro("");

  // 🔥 MODO MOCK (sem back)
  const USAR_MOCK = true;
  
  if (USAR_MOCK) {

    const usuarioFake = {
      nome: "Sarah Duarte",
      tipo: email.includes("nutri")
        ? "NUTRICIONISTA"
        : email.includes("admin")
        ? "ADMIN"
        : "SECRETARIA"
    };

    localStorage.setItem("usuario", JSON.stringify(usuarioFake));
    localStorage.setItem("token", "fake-token");

    navigate("/dashboard");
    return;
  }

  // 🔥 MODO REAL (com back)
  try {
    const res = await api.post("/usuario/login", {
      email,
      senha,
    });


    localStorage.setItem("token", res.data.token);

    const usuario = {
      nome: res.data.nome,
      tipo: res.data.perfil, 
      email: res.data.email,
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    setErro("E-mail ou senha inválidos");
  }
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