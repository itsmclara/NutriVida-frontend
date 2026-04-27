export const usuarios = [
  {
    id: 1,
    nome: "Dr. João Martins",
    email: "joao@nutri.com",
    telefone: "(43) 91234-5678",
    perfil: "NUTRICIONISTA",
    crn: "1235",
    especialidade: "NutriçãoClínica"
  },
  {
    id: 2,
    nome: "Mariana Souza",
    email: "mariana@nutri.com",
    perfil: "SECRETARIA"
  },
  {
    id: 3,
    nome: "Carlos Almeida",
    email: "admin@nutri.com",
    perfil: "ADMINISTRADOR"
  }
];

export const pacientes = [
  {
    id: "00001",
    nome: "Lucas Oliveira",
    idade: 20,
    genero: "Masculino",
    cpf: "123.456.789-00",
    telefone: "(43) 99123-4567",
    email: "lucasoliveira@email.com",
    dataNascimento: "18/04/2005",
    dataCadastro: "09/03/2026",

    endereco: {
      cep: "86870-000",
      logradouro: "Avenida Brasil",
      numero: "123",
      bairro: "Centro",
      cidade: "Ivaiporã",
      uf: "PR"
    }
  },

  {
    id: "00002",
    nome: "Ana Souza",
    idade: 27,
    genero: "Feminino",
    cpf: "987.654.321-00",
    telefone: "(43) 99876-5432",
    email: "ana@email.com",
    dataNascimento: "12/08/1998",
    dataCadastro: "01/04/2026",

    endereco: {
      cep: "86870-000",
      logradouro: "Rua Paraná",
      numero: "45",
      bairro: "Jardim Alegre",
      cidade: "Ivaiporã",
      uf: "PR"
    }
  }
];

export const consultas = [
  {
    id: 1,
    id_paciente: 1,
    nome: "Lucas Oliveira",
    hora: "08:00",
    data: "2026-07-01",
    status: "Confirmada"
  },
  {
    id: 2,
    id_paciente: 2,
    nome: "Carla Santos",
    hora: "09:30",
    data: "2026-04-11",
    status: "Agendada"
  },
  {
    id: 3,
    id_paciente: 3,
    nome: "Pedro Almeida",
    hora: "10:30",
    data: "2026-04-08",
    status: "Realizada"
  },
  {
    id: 4,
    id_paciente: 4,
    nome: "Juliana Costa",
    hora: "11:30",
    data: "2026-04-08",
    status: "Cancelada"
  }
];