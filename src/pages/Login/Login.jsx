import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import InputCustom from "../../components/InputCustom/InputCustom";
import Button from "../../components/Button/Button";
import { validarEmail } from "../../utils/validadores";

import "./Login.css";

import logo from "../../assets/logo-vertical.svg";

function Login() {

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [erro, setErro] =
    useState("");

  const navigate =
    useNavigate();

  async function handleLogin(e) {

    e.preventDefault();

    if (
      !email.trim() ||
      !senha.trim()
    ) {

      setErro(
        "Preencha todos os campos"
      );

      return;
    }

    if (
      !validarEmail(email)
    ) {

      setErro(
        "E-mail inválido"
      );

      return;
    }

    setErro("");

    // 🔥 MODO MOCK
    const USAR_MOCK = false;

    if (USAR_MOCK) {

      const usuarioFake = {

        nome:
          "Sarah Duarte",

        perfil:
          email.includes("nutri")
            ? "NUTRICIONISTA"
            : email.includes("admin")
              ? "ADMINISTRADOR"
              : "SECRETARIA"
      };

      sessionStorage.setItem(
        "usuario",
        JSON.stringify(usuarioFake)
      );

      sessionStorage.setItem(
        "token",
        "fake-token"
      );

      navigate("/dashboard");

      return;
    }

    // 🔥 LOGIN REAL
    try {

      const res =
        await api.post(
          "/usuarios/login",
          {
            email,
            senha
          }
        );

      sessionStorage.setItem(
        "token",
        res.data.token
      );

      const usuario =
        res.data.usuario;

      sessionStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
      );

      navigate("/dashboard");

    } catch (err) {

      console.error(err);

      setErro(
        "E-mail ou senha inválidos"
      );
    }
  }

  return (

    <div className="login-container">

      <form
        className="login-card"
        onSubmit={handleLogin}
      >

        <img
          src={logo}
          alt="Logo"
          className="login-logo"
        />

        <h2 className="login-title">
          Entrar no sistema
        </h2>

        <p className="login-subtitle">
          Acesse sua conta para continuar
        </p>

        <div className="login-form">

          <InputCustom
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <InputCustom
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) =>
              setSenha(
                e.target.value
              )
            }
          />

        </div>

        {erro && (
          <p className="erro">
            {erro}
          </p>
        )}

        <Button
          type="submit"
          className="btn-login"
        >
          Entrar
        </Button>

      </form>

    </div>
  );
}

export default Login;