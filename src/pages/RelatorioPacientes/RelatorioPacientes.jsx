import { useState } from "react";
import { ArrowLeft, FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import InputBusca from "../../components/InputBusca/InputBusca";
import FiltroSelect from "../../components/FiltroSelect/FiltroSelect";
import Button from "../../components/Button/Button";

import "./RelatorioPacientes.css";

function RelatorioPacientes() {

    const navigate = useNavigate();

    const [pacientes] = useState([]);

    return (
        <div className="relatorio-page">

            <button
                className="btn-voltar"
                onClick={() => navigate("/relatorios")}
            >
                <ArrowLeft size={18} />
                Voltar para relatórios
            </button>

            <div className="relatorio-header">

                <div>

                    <h1>
                        Relatório de Pacientes Cadastrados
                    </h1>

                    <p>
                        Lista todos os pacientes cadastrados na clínica.
                    </p>

                </div>

                <Button icon={<FileDown size={18} />}>
                    Emitir relatório (PDF)
                </Button>

            </div>

            <div className="filtros-container">

                <InputBusca
                    label="Nome"
                    placeholder="Buscar por nome..."
                />

                <FiltroSelect
                    label="Gênero"
                    opcoes={[]}
                />

                <FiltroSelect
                    label="Cidade"
                    opcoes={[]}
                />

                <FiltroSelect
                    label="Faixa etária"
                    opcoes={[
                        "0-18",
                        "19-30",
                        "31-50",
                        "50+"
                    ]}
                />

            </div>

            <div className="tabela-container">

                <div className="tabela-topo">

                    <strong>
                        Total de pacientes:
                        <span className="total-valor">
                            {" "}0
                        </span>
                    </strong>

                </div>

                <table className="tabela">

                    <thead>

                        <tr>
                            <th>Prontuário</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Gênero</th>
                            <th>Telefone</th>
                            <th>Cidade</th>
                            <th>Data cadastro</th>
                        </tr>

                    </thead>

                    <tbody>

                        {pacientes.length > 0 ? (

                            pacientes.map((p) => (

                                <tr key={p.id}>
                                    <td>{p.prontuario}</td>
                                    <td>{p.nome}</td>
                                    <td>{p.idade}</td>
                                    <td>{p.genero}</td>
                                    <td>{p.telefone}</td>
                                    <td>{p.cidade}</td>
                                    <td>{p.dataCadastro}</td>
                                </tr>

                            ))

                        ) : (

                            <tr className="empty-row">

                                <td
                                    colSpan="7"
                                    className="empty-message"
                                >
                                    Nenhum paciente encontrado
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default RelatorioPacientes;