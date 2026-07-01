// 📄 CPF
export function formatarCPF(cpf) {
  if (!cpf) return "";

  cpf = cpf
    .replace(/\D/g, "")
    .slice(0, 11);

  return cpf
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// 📞 TELEFONE
export function formatarTelefone(telefone) {
  if (!telefone) return "";

  telefone = telefone
    .replace(/\D/g, "")
    .slice(0, 11);

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

  cep = cep
    .replace(/\D/g, "")
    .slice(0, 8);

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
  data = data
    .replace(/\D/g, "")
    .slice(0, 8);

  return data
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
}

export function formatarDataAtual() {

  const hoje = new Date();

  const dia = String(
    hoje.getDate()
  ).padStart(2, "0");

  const mes = String(
    hoje.getMonth() + 1
  ).padStart(2, "0");

  const ano = hoje.getFullYear();

  return `${dia}/${mes}/${ano}`;

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

// 👩🏼‍⚕️ NUTRI
export function formatarNomeNutri(n) {
  if (!n) return "";

  const crn = n.crn ? ` (CRN ${n.crn})` : "";
  return `Dra. ${n.nome}${crn}`;
}

// ✏️ TEXTO
export function formatarTexto(texto) {
  if (!texto) return "";

  return texto
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/(^|\s)\S/g, letra => letra.toUpperCase());
}

export function criarDataLocal(dataString) {
  if (!dataString) return null;

  const [ano, mes, dia] = dataString.split("-");

  return new Date(
    Number(ano),
    Number(mes) - 1,
    Number(dia)
  );
}

// 📅 DATE → ISO
export function dateParaISO(date) {
  if (!date) return "";

  const ano = date.getFullYear();

  const mes = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const dia = String(
    date.getDate()
  ).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
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

// ✂️ LIMITAR TEXTO
export function limitarTexto(
  texto,
  tamanho
) {

  if (!texto) return "";

  return texto.slice(
    0,
    tamanho
  );
}

// CRN
export function formatarCRN(crn) {

  if (!crn) return "";

  return crn
    .replace(/\D/g, "")
    .slice(0, 10);
}

// ⚖️ PESO
export function formatarPeso(valor) {

  if (!valor) return "";

  valor = valor
    .replace(/[^0-9,.]/g, "")
    .replace(",", ".");

  return valor.slice(0, 6);
}

// 📏 ALTURA
export function formatarAltura(valor) {

  if (!valor) return "";

  valor = valor
    .replace(/[^0-9,.]/g, "")
    .replace(",", ".");

  return valor.slice(0, 4);
}

// 📊 %
export function formatarPercentual(valor) {

  if (!valor) return "";

  valor = valor
    .replace(/[^0-9,.]/g, "")
    .replace(",", ".");

  return valor.slice(0, 5);
}

// 📐 MEDIDAS
export function formatarCircunferencia(valor) {

  if (!valor) return "";

  valor = valor
    .replace(/[^0-9,.]/g, "")
    .replace(",", ".");

  return valor.slice(0, 6);
}