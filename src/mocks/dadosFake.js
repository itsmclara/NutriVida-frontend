export const usuarios = [
  {
    id: 1,
    nome: "Dr. João Martins",
    email: "joao@nutri.com",
    tipo: "NUTRICIONISTA"
  },
  {
    id: 2,
    nome: "Mariana Souza",
    email: "mariana@nutri.com",
    tipo: "SECRETARIA"
  },
  {
    id: 3,
    nome: "Carlos Almeida",
    email: "admin@nutri.com",
    tipo: "ADMIN"
  }
];

export const pacientes = [
  {
    id: 1,
    nome: "Lucas Oliveira",
    idade: 20,
    genero: "Masculino",
    contato: "(43) 99123-4567",
    prontuario: "00001",
    objetivo: "Emagrecimento",
    infoClinicas: "Diabetes tipo 2",
    restricoes: "Intolerância à lactose"
  },
  {
    id: 2,
    nome: "Carla Santos",
    idade: 27,
    genero: "Feminino",
    contato: "(43) 99876-5432",
    prontuario: "00002",
    objetivo: "Ganho de massa",
    infoClinicas: "Nenhuma",
    restricoes: "Nenhuma"
  },
  {
    id: 3,
    nome: "Pedro Almeida",
    idade: 31,
    genero: "Masculino",
    contato: "(43) 99111-2222",
    prontuario: "00003",
    objetivo: "Reeducação alimentar",
    infoClinicas: "Hipertensão",
    restricoes: "Baixo sódio"
  },
  {
    id: 4,
    nome: "Juliana Costa",
    idade: 24,
    genero: "Feminino",
    contato: "(43) 99222-3333",
    prontuario: "00004",
    objetivo: "Emagrecimento",
    infoClinicas: "Ansiedade",
    restricoes: "Sem cafeína"
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