// 📄 CPF
export function validarCPF(cpf) {
  if (!cpf) return false;

  cpf = cpf.replace(/\D/g, "");
  return cpf.length === 11;
}

// 📞 TELEFONE
export function validarTelefone(telefone) {
  if (!telefone) return false;

  telefone = telefone.replace(/\D/g, "");
  return telefone.length >= 10 && telefone.length <= 11;
}

// 📮 CEP
export function validarCEP(cep) {
  if (!cep) return false;

  cep = cep.replace(/\D/g, "");
  return cep.length === 8;
}

// 📅 DATA
export function validarData(data) {
  if (!data) return false;

  const partes = data.split("/");
  if (partes.length !== 3) return false;

  const [dia, mes, ano] = partes.map(Number);

  if (!dia || !mes || !ano) return false;
  if (mes < 1 || mes > 12) return false;

  const diasNoMes = new Date(ano, mes, 0).getDate();

  if (dia < 1 || dia > diasNoMes) return false;

  return true;
}

// 📩 E-MAIL
export function validarEmail(email) {
  if (!email) return false;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}