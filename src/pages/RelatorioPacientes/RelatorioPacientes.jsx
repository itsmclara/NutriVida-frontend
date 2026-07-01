import { useState, useEffect } from "react";
import { ArrowLeft, FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";

import Modal from "../../components/Modal/Modal";
import PdfRelatorioPacientes from "../../components/PdfRelatorioPacientes/PdfRelatorioPacientes";

import InputCustom from "../../components/InputCustom/InputCustom";
import FiltroSelect from "../../components/FiltroSelect/FiltroSelect";
import Button from "../../components/Button/Button";
import api from "../../services/api";
import toast from "../../utils/toast";
import { formatarData, formatarTelefone } from "../../utils/formatadores";

import "./RelatorioPacientes.css";

function RelatorioPacientes() {

    const navigate = useNavigate();

    const [pacientes, setPacientes] =
        useState([]);

    const [total, setTotal] =
        useState(0);

    const [cidades, setCidades] =
        useState([]);

    const [dataInicio, setDataInicio] =
        useState("");

    const [dataFim, setDataFim] =
        useState("");

    const [genero, setGenero] =
        useState("");

    const [cidade, setCidade] =
        useState("");

    const [faixaEtaria, setFaixaEtaria] =
        useState("");

    const [abrirPdf, setAbrirPdf] =
        useState(false);

    async function carregarCidades() {

        try {

            const res =
                await api.get("/cidades");

            setCidades(res.data);

        } catch (error) {

            console.error(error);

            toast.erro(
                "Erro ao carregar cidades."
            );

        }

    }

    async function buscarPacientes(filtros) {

        try {

            const res = await api.get(
                "/relatorios/pacientes",
                {
                    params: filtros
                }
            );

            setPacientes(res.data.pacientes);
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
        setGenero("");
        setCidade("");
        setFaixaEtaria("");

        buscarPacientes();

    }

    useEffect(() => {

        carregarCidades();

        buscarPacientes({
            dataInicio: "",
            dataFim: "",
            cidade: "",
            genero: "",
            faixaEtaria: ""
        });

    }, []);

    return (
        <>

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
                        Relatório de Pacientes
                    </h1>

                    <p>
                        Lista todos os pacientes cadastrados na clínica.
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
                        label="Gênero"
                        valor={genero}
                        onChange={setGenero}
                        opcoes={[
                            "Feminino",
                            "Masculino",
                            "Outro",
                            "Prefere não informar"
                        ]}
                    />

                    <FiltroSelect
                        label="Cidade"
                        valor={cidade}
                        onChange={setCidade}
                        opcoes={cidades}
                    />

                    <FiltroSelect
                        label="Faixa etária"
                        valor={faixaEtaria}
                        onChange={setFaixaEtaria}
                        opcoes={[
                            "0-18",
                            "19-30",
                            "31-50",
                            "50+"
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
                            buscarPacientes({
                                dataInicio,
                                dataFim,
                                cidade,
                                genero,
                                faixaEtaria
                            })
                        }
                    >
                        Filtrar
                    </Button>
                </div>

            </div>

            <div className="relatorio-tabela">

                <div className="relatorio-topo">

                    <strong>
                        Total de pacientes:
                        <span className="total-valor">
                            {" "}{total}
                        </span>
                    </strong>

                </div>

                <table className="relatorio-table">

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
                                    <td>{p.numeroProntuario}</td>
                                    <td>{p.nome}</td>
                                    <td>{p.idade}</td>
                                    <td>{p.genero}</td>
                                    <td>{formatarTelefone(p.telefone || "-")}</td>
                                    <td>{p.cidade || "-"}</td>
                                    <td>{formatarData(p.dataCadastro)}</td>
                                </tr>

                            ))

                        ) : (

                            <tr className="relatorio-empty-row">

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

                        <PdfRelatorioPacientes
                            pacientes={pacientes}
                            total={total}
                            filtros={{
                                dataInicio,
                                dataFim,
                                cidade,
                                genero,
                                faixaEtaria
                            }}
                        />

                    </PDFViewer>

                </div>

            </Modal>

        </>
    );
}

export default RelatorioPacientes;