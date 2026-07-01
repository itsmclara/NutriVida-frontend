import { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileDown
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Modal from "../../components/Modal/Modal";
import { PDFViewer } from "@react-pdf/renderer";

import PdfRelatorioAgendas from "../../components/PdfRelatorioAgendas/PdfRelatorioAgendas";

import api from "../../services/api";
import toast from "../../utils/toast";

import {
  formatarData,
  formatarNomeNutri,
  formatarTexto
} from "../../utils/formatadores";

import Button from "../../components/Button/Button";
import FiltroSelect from "../../components/FiltroSelect/FiltroSelect";
import InputCustom from "../../components/InputCustom/InputCustom";

import "./RelatorioAgenda.css";

function RelatorioAgenda() {

  const navigate = useNavigate();

  const [agendas, setAgendas] = useState([]);

  const [total, setTotal] = useState(0);

  const [nutricionistas, setNutricionistas] = useState([]);

  const [dataInicio, setDataInicio] = useState("");

  const [dataFim, setDataFim] = useState("");

  const [nutricionistaId, setNutricionistaId] = useState("");

  const [status, setStatus] = useState("");

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

  async function buscarAgendas(filtros) {

    try {

      const res = await api.get(
        "/relatorios/agendas",
        {
          params: filtros
        }
      );

      setAgendas(res.data.agendas);

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

    setStatus("");

    buscarAgendas({

      dataInicio: "",

      dataFim: "",

      nutricionistaId: "",

      status: ""

    });

  }

  useEffect(() => {

    carregarNutricionistas();

    buscarAgendas({

      dataInicio: "",

      dataFim: "",

      nutricionistaId: "",

      status: ""

    });

  }, []);

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
            Relatório de Agendas
          </h1>

          <p>
            Exibe as agendas das nutricionistas em um determinado período.
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
            opcoes={
              nutricionistas.map((nutricionista) => ({
                valor: nutricionista.id,
                label: formatarNomeNutri(nutricionista)
              }))
            }
          />

          <FiltroSelect
            label="Status"
            valor={status}
            onChange={setStatus}
            opcoes={[
              "ABERTA",
              "FINALIZADA"
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
              buscarAgendas({
                dataInicio,
                dataFim,
                nutricionistaId,
                status
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
            Total de agendas:
            <span className="total-valor">
              {" "}{total}
            </span>
          </strong>

        </div>

        <table className="relatorio-table relatorio-agenda-table">

          <thead>

            <tr>
              <th className="col-data">Data</th>
              <th className="col-nutri">Nutricionista</th>
              <th className="col-status">Status</th>
              <th className="col-ocupados">Horários ocupados</th>
              <th className="col-livres">Horários livres</th>
            </tr>

          </thead>

          <tbody>

            {agendas.length > 0 ? (

              agendas.map((agenda) => (

                <tr key={`${agenda.data}-${agenda.nutricionista}`}>
                  <td className="col-data">
                    {formatarData(agenda.data)}
                  </td>

                  <td className="col-nutri">
                    {agenda.nutricionista}
                  </td>

                  <td className="col-status">
                    {formatarTexto(agenda.status)}
                  </td>

                  <td className="col-ocupados">
                    {agenda.horariosOcupados}
                  </td>

                  <td className="col-livres">
                    {agenda.horariosLivres}
                  </td>
                </tr>

              ))

            ) : (

              <tr className="empty-row">

                <td
                  colSpan="5"
                  className="empty-message"
                >
                  Nenhuma agenda encontrada
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

            <PdfRelatorioAgendas
              agendas={agendas}
              total={total}
              filtros={{
                dataInicio,
                dataFim,

                nutricionista:
                  nutricionistas.find(
                    n => String(n.id) === String(nutricionistaId)
                  )?.nome || "Todos",

                status
              }}
            />

          </PDFViewer>

        </div>

      </Modal>

    </>
  );
}

export default RelatorioAgenda;