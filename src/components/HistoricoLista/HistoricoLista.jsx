import { FileText, Eye, Archive } from "lucide-react";
import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";

import api from "../../services/api";
import toast from "../../utils/toast";

import PdfConsulta from "../PdfConsulta/PdfConsulta";
import Modal from "../Modal/Modal";
import ModalDetalhesConsulta from "../ModalDetalhesConsulta/ModalDetalhesConsulta";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

import "./HistoricoLista.css";

import {
    formatarData,
    formatarTexto
} from "../../utils/formatadores";

function HistoricoLista({
    paciente,
    historico,
    onAtualizar
}) {

    const [abrirPdf, setAbrirPdf] =
        useState(false);

    const [
        consultaSelecionada,
        setConsultaSelecionada
    ] = useState(null);

    const [
        modalDetalhesAberto,
        setModalDetalhesAberto
    ] = useState(false);

    const [
        modalOcultarAberto,
        setModalOcultarAberto
    ] = useState(false);

    const [
        consultaOcultarId,
        setConsultaOcultarId
    ] = useState(null);

    async function abrirDetalhes(id) {

        try {

            const res =
                await api.get(`/consultas/${id}`);

            setConsultaSelecionada(res.data);

            setModalDetalhesAberto(true);

        } catch (error) {

            console.error(error);

            toast.erro(

                error?.response?.data?.message ||

                error?.response?.data ||

                "Erro ao carregar detalhes"

            );
        }
    }

    async function ocultarConsulta() {

        try {

            await api.put(
                `/consultas/${consultaOcultarId}/visibilidade`,
                {
                    visivel: false
                }
            );

            setModalOcultarAberto(false);

            onAtualizar?.();

            toast.sucesso(
                "Consulta ocultada com sucesso."
            );

        } catch (error) {

            console.error(error);

            toast.erro(

                error?.response?.data?.message ||

                error?.response?.data ||

                "Erro ao ocultar consulta"

            );
        }
    }

    if (!historico || historico.length === 0) {

        return (
            <div className="empty-historico">
                Nenhum histórico encontrado
            </div>
        );
    }



    return (
        <>
            <div className="historico-card-body">

                {historico.map((item) => (

                    <div
                        key={item.id}
                        className="historico-item"
                    >

                        <span className="historico-texto">

                            {formatarData(item.data)}
                            {" • "}
                            {formatarTexto(item.tipoConsulta)}
                            {" • "}
                            {item.resumo}

                        </span>

                        <div className="historico-actions">

                            <Eye
                                size={20}
                                className="icon-eye"
                                onClick={() =>
                                    abrirDetalhes(item.id)
                                }
                            />

                            <FileText
                                size={20}
                                className="icon-pdf"
                                onClick={async () => {

                                    try {

                                        const res =
                                            await api.get(
                                                `/consultas/${item.id}`
                                            );

                                        setConsultaSelecionada(
                                            res.data
                                        );

                                        setAbrirPdf(true);

                                    } catch (error) {

                                        console.error(error);

                                        toast.erro(

                                            error?.response?.data?.message ||

                                            error?.response?.data ||

                                            "Erro ao carregar PDF"

                                        );
                                    }
                                }}
                            />

                            <Archive
                                size={20}
                                className="icon-arquivar"
                                onClick={() => {
                                    setConsultaOcultarId(
                                        item.id
                                    );
                                    setModalOcultarAberto(true);

                                }}
                            />

                        </div>

                    </div>

                ))}

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

                    {consultaSelecionada && (
                        <PDFViewer className="pdf-viewer">

                            <PdfConsulta
                                consulta={consultaSelecionada}
                                paciente={paciente}
                            />

                        </PDFViewer>
                    )}

                </div>

            </Modal>

            <ModalDetalhesConsulta
                aberto={modalDetalhesAberto}
                onClose={() =>
                    setModalDetalhesAberto(false)
                }
                consulta={consultaSelecionada}
                onGerarPdf={() => {

                    setModalDetalhesAberto(false);

                    setAbrirPdf(true);

                }}
            />

            <ConfirmModal
                aberto={modalOcultarAberto}
                titulo="Ocultar consulta"
                mensagem="Deseja realmente ocultar esta consulta?"
                textoConfirmar="Ocultar"
                onConfirmar={ocultarConsulta}
                onCancelar={() =>
                    setModalOcultarAberto(false)
                }
            />

        </>
    );
}

export default HistoricoLista;