import { useState, useEffect } from "react";
import {
    ArrowLeft,
    FileDown
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { PDFViewer } from "@react-pdf/renderer";

import PdfRelatorioConsultas from "../../components/PdfRelatorioConsultas/PdfRelatorioConsultas";

import api from "../../services/api";
import toast from "../../utils/toast";

import {
    formatarCPF,
    formatarData,
    formatarNomeNutri,
    formatarTexto
} from "../../utils/formatadores";

import Button from "../../components/Button/Button";
import InputCustom from "../../components/InputCustom/InputCustom";
import FiltroSelect from "../../components/FiltroSelect/FiltroSelect";
import InputAutocomplete from "../../components/InputAutocomplete/InputAutocomplete";

import "./RelatorioConsultas.css";

function RelatorioConsultas() {

    const navigate = useNavigate();

    const [consultas, setConsultas] = useState([]);

    const [total, setTotal] = useState(0);

    const [nutricionistas, setNutricionistas] = useState([]);

    const [nutricionistaId, setNutricionistaId] = useState("");

    const [buscaPaciente, setBuscaPaciente] = useState("");

    const [pacientes, setPacientes] = useState([]);

    const [pacienteSelecionado, setPacienteSelecionado] =
        useState(null);

    const [dataInicio, setDataInicio] = useState("");

    const [dataFim, setDataFim] = useState("");

    const [statusConsulta, setStatusConsulta] = useState("");

    const [abrirPdf, setAbrirPdf] = useState(false);

    async function carregarNutricionistas() {

        try {

            const res =
                await api.get("/nutricionistas");

            setNutricionistas(res.data);

        } catch (error) {

            console.error(error);

            toast.erro(
                "Erro ao carregar nutricionistas."
            );

        }

    }

    async function buscarConsultas(filtros) {

        try {

            const res = await api.get(
                "/relatorios/consultas",
                {
                    params: filtros
                }
            );

            setConsultas(res.data.consultas);

            setTotal(res.data.total);

        } catch (error) {

            console.error(error);

            toast.erro(
                "Erro ao carregar relatório."
            );

        }

    }

    function limparFiltros() {

        setDataInicio("");
        setDataFim("");
        setNutricionistaId("");
        setBuscaPaciente("");
        setPacienteSelecionado(null);
        setPacientes([]);
        setStatusConsulta("");

        buscarConsultas({
            dataInicio: "",
            dataFim: "",
            nutricionistaId: "",
            pacienteId: "",
            statusConsulta: ""
        });

    }

    useEffect(() => {

        carregarNutricionistas();

        buscarConsultas({
            dataInicio: "",
            dataFim: "",
            nutricionistaId: "",
            pacienteId: "",
            statusConsulta: ""
        });

    }, []);

    useEffect(() => {

        if (
            !buscaPaciente ||
            buscaPaciente.trim().length < 2
        ) {

            setPacientes([]);

            return;
        }

        async function buscarPacientes() {

            try {

                const res = await api.get(
                    "/pacientes/busca",
                    {
                        params: {
                            nome: buscaPaciente
                        }
                    }
                );

                setPacientes(res.data);

            } catch (error) {

                console.error(
                    "Erro ao buscar pacientes:",
                    error
                );
            }

        }

        buscarPacientes();

    }, [buscaPaciente]);

    return (
        <>

            <button
                className="btn-voltar"
                onClick={() =>
                    navigate("/relatorios")
                }
            >
                <ArrowLeft size={18} />
                Voltar para relatórios
            </button>

            <div className="relatorio-header">

                <div>

                    <h1>
                        Relatório de Consultas
                    </h1>

                    <p>
                        Exibe todas as consultas registradas em um determinado período.
                    </p>

                </div>

                <Button
                    icon={<FileDown size={18} />}
                    onClick={() => setAbrirPdf(true)}
                >
                    Emitir relatório (PDF)
                </Button>

            </div>

            <div className="relatorio-filtros">

                <div className="relatorio-filtros-linha">

                    <InputCustom
                        label="Data inicial"
                        type="date"
                        value={dataInicio}
                        onChange={(e) =>
                            setDataInicio(e.target.value)
                        }
                    />

                    <InputCustom
                        label="Data final"
                        type="date"
                        value={dataFim}
                        onChange={(e) =>
                            setDataFim(e.target.value)
                        }
                    />

                    <FiltroSelect
                        label="Nutricionista"
                        valor={nutricionistaId}
                        onChange={setNutricionistaId}
                        opcoes={nutricionistas.map((nutricionista) => ({
                            valor: nutricionista.id,
                            label: formatarNomeNutri(nutricionista)
                        }))}
                    />

                    <InputAutocomplete
                        label="Paciente"
                        placeholder="Buscar paciente"
                        value={buscaPaciente}
                        resultados={pacientes}
                        onChange={(e) => {

                            setBuscaPaciente(
                                e.target.value
                            );

                            setPacienteSelecionado(null);

                        }}
                        onSelecionar={(paciente) => {

                            setPacienteSelecionado(
                                paciente
                            );

                            setBuscaPaciente(
                                paciente.nome
                            );

                            setPacientes([]);

                        }}
                        renderItem={(paciente) => (

                            <div className="autocomplete-info">

                                <strong>
                                    {paciente.nome}
                                </strong>

                                <span>
                                    CPF: {formatarCPF(paciente.cpf)}
                                </span>

                            </div>

                        )}
                    />

                    <FiltroSelect
                        label="Status"
                        valor={statusConsulta}
                        onChange={setStatusConsulta}
                        opcoes={[
                            "AGENDADA",
                            "CONFIRMADA",
                            "REALIZADA",
                            "CANCELADA",
                            "AUSENTE"
                        ]}
                    />

                </div>

                <div className="relatorio-acoes">

                    <Button
                        variant="secondary"
                        onClick={limparFiltros}
                    >
                        Limpar
                    </Button>

                    <Button
                        onClick={() =>
                            buscarConsultas({
                                dataInicio,
                                dataFim,
                                nutricionistaId,
                                pacienteId: pacienteSelecionado?.id || "",
                                statusConsulta
                            })
                        }
                    >
                        Filtrar
                    </Button>
                </div>

            </div>

            <div className="tabela-container">

                <div className="relatorio-topo">

                    <strong>
                        Total de consultas:
                        <span className="total-valor">
                            {" "}{total}
                        </span>
                    </strong>

                </div>

                <table className="relatorio-table">

                    <thead>

                        <tr>
                            <th>Data</th>
                            <th>Horário</th>
                            <th>Paciente</th>
                            <th>Nutricionista</th>
                            <th>Tipo</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        {consultas.length > 0 ? (

                            consultas.map((c) => (

                                <tr key={c.id}>
                                    <td>{formatarData(c.data)}</td>
                                    <td>{c.hora}</td>
                                    <td>{c.paciente}</td>
                                    <td>{c.nutricionista}</td>
                                    <td>{formatarTexto(c.tipoConsulta)}</td>
                                    <td>{formatarTexto(c.status)}</td>
                                </tr>

                            ))

                        ) : (

                            <tr className="relatorio-empty-row">

                                <td
                                    colSpan="6"
                                    className="empty-message"
                                >
                                    Nenhuma consulta encontrada
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

            <Modal
                aberto={abrirPdf}
                onClose={() => setAbrirPdf(false)}
                className="modal-sem-scroll"
            >

                <div className="pdf-container">

                    <button
                        className="btn-fechar-pdf"
                        onClick={() => setAbrirPdf(false)}
                    >
                        ✕
                    </button>

                    <PDFViewer className="pdf-viewer">

                        <PdfRelatorioConsultas
                            consultas={consultas}
                            total={total}
                            filtros={{
                                dataInicio,
                                dataFim,

                                nutricionista:
                                    nutricionistas.find(
                                        n => String(n.id) === String(nutricionistaId)
                                    )?.nome || "Todos",

                                paciente:
                                    pacienteSelecionado?.nome || "Todos",

                                statusConsulta
                            }}
                        />

                    </PDFViewer>

                </div>

            </Modal>

        </>
    );
}

export default RelatorioConsultas;