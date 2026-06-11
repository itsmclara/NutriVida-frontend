import { useState } from "react";
import {
    ArrowLeft,
    FileDown
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import InputBusca from "../../components/InputBusca/InputBusca";
import FiltroSelect from "../../components/FiltroSelect/FiltroSelect";

import "./RelatorioConsultas.css";

function RelatorioConsultas() {

    const navigate = useNavigate();

    const [consultas] = useState([]);

    return (
        <>
            <div className="relatorio-header">

                <div>

                    <button
                        className="btn-voltar"
                        onClick={() =>
                            navigate("/relatorios")
                        }
                    >
                        <ArrowLeft size={18} />
                        Voltar para relatórios
                    </button>

                    <h1>
                        Relatório de Consultas
                    </h1>

                    <p>
                        Exibe todas as consultas realizadas em determinado período.
                    </p>

                </div>

                <Button
                    icon={<FileDown size={18} />}
                >
                    Emitir relatório (PDF)
                </Button>

            </div>

            <div className="filtros-container">

                <InputBusca
                    label="Paciente"
                    placeholder="Buscar paciente..."
                />

                <FiltroSelect
                    label="Nutricionista"
                    valor=""
                    onChange={() => { }}
                    opcoes={[
                        "Dra. Patricia",
                        "Dra. Ana"
                    ]}
                />

                <FiltroSelect
                    label="Tipo da consulta"
                    valor=""
                    onChange={() => { }}
                    opcoes={[
                        "AVALIACAO_INICIAL",
                        "RETORNO"
                    ]}
                />

            </div>

            <div className="tabela-container">

                <div className="tabela-topo">

                    <strong>
                        Total de consultas:
                        <span className="total-valor">
                            {" "}0
                        </span>
                    </strong>

                </div>

                <table className="tabela">

                    <thead>

                        <tr>
                            <th>Data</th>
                            <th>Horário</th>
                            <th>Paciente</th>
                            <th>Nutricionista</th>
                            <th>Tipo</th>
                        </tr>

                    </thead>

                    <tbody>

                        {consultas.length > 0 ? (

                            consultas.map((c) => (

                                <tr key={c.id}>
                                    <td>{c.data}</td>
                                    <td>{c.hora}</td>
                                    <td>{c.paciente}</td>
                                    <td>{c.nutricionista}</td>
                                    <td>{c.tipo}</td>
                                </tr>

                            ))

                        ) : (

                            <tr className="empty-row">

                                <td
                                    colSpan="5"
                                    className="empty-message"
                                >
                                    Nenhuma consulta encontrada
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default RelatorioConsultas;