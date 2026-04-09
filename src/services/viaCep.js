import axios from "axios";

export async function buscarCep(cep) {
  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) return null;

  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${cepLimpo}/json/`
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
}