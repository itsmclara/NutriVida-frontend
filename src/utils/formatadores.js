// 📄 CPF
export function formatarCPF(cpf) {
  if (!cpf) return "";

  cpf = cpf.replace(/\D/g, "");

  return cpf
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// 📞 TELEFONE
export function formatarTelefone(telefone) {
  if (!telefone) return "";

  telefone = telefone.replace(/\D/g, "");

  if (telefone.length <= 10) {
    return telefone
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return telefone
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

// 📮 CEP
export function formatarCEP(cep) {
  if (!cep) return "";

  cep = cep.replace(/\D/g, "");

  return cep.replace(/(\d{5})(\d)/, "$1-$2");
}

// 📅 DATA
export function formatarData(data) {
  if (!data) return "";

  // se vier do back (yyyy-mm-dd)
  if (data.includes("-")) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  // se estiver digitando
  return data
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
}

// 📅 DATA → ISO (pro back)
export function formatarDataISO(data) {
  if (!data) return null;

  const [dia, mes, ano] = data.split("/");
  return `${ano}-${mes}-${dia}`;
}

export function limparNumeros(valor) {
  if (!valor) return "";
  return valor.replace(/\D/g, "");
}

// 🎂 IDADE
export function calcularIdade(dataNascimento) {
  if (!dataNascimento) return "-";

  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}