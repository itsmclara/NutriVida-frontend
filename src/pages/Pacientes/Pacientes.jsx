import { Eye, Pencil } from "lucide-react";
import "./Pacientes.css";

function Pacientes() {

  const pacientes = [
    {
      id: "00001",
      nome: "Lucas Oliveira",
      idade: 20,
      genero: "Masculino",
      contato: "(43) 99123-4567"
    },
    {
      id: "00002",
      nome: "Carla Santos",
      idade: 27,
      genero: "Feminino",
      contato: "(43) 99123-4567"
    },
    {
      id: "00003",
      nome: "Pedro Almeida",
      idade: 31,
      genero: "Masculino",
      contato: "(43) 99123-4567"
    }
  ];

  return (
    <>

      <div className="pacientes-header">

        <div>
          <h1>Pacientes</h1>
          <p>
            Visualize, cadastre e edite os dados dos pacientes da clínica.
          </p>
        </div>

        <button className="btn-primary">
          + Novo paciente
        </button>

      </div>

      <div className="tabela-container">

        <table className="tabela">

          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Gênero</th>
              <th>Contato</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {pacientes.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.idade}</td>
                <td>{p.genero}</td>
                <td>{p.contato}</td>

                <td className="acoes">
                  <Eye size={20} className="icon-view"/>
                  <Pencil size={20} className="icon-edit"/>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </>
  );
}

export default Pacientes;