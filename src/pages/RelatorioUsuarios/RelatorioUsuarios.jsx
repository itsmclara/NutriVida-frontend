import { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileDown
} from "lucide-react";
import { PDFViewer } from "@react-pdf/renderer";

import Modal from "../../components/Modal/Modal";
import PdfRelatorioUsuarios from "../../components/PdfRelatorioUsuarios/PdfRelatorioUsuarios";

import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import InputBusca from "../../components/InputBusca/InputBusca";
import InputCustom from "../../components/InputCustom/InputCustom";
import FiltroSelect from "../../components/FiltroSelect/FiltroSelect";
import {
  formatarTexto,
  formatarTelefone
} from "../../utils/formatadores";
import api from "../../services/api";
import toast from "../../utils/toast";

import "./RelatorioUsuarios.css";

function RelatorioUsuarios() {

  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);

  const [total, setTotal] = useState(0);

  const [perfil, setPerfil] = useState("");

  const [status, setStatus] = useState("");

  const [dataInicio, setDataInicio] =
    useState("");

  const [dataFim, setDataFim] =
    useState("");

  const [abrirPdf, setAbrirPdf] = useState(false);

  async function buscarUsuarios(filtros) {

    try {

      const res = await api.get(
        "/relatorios/usuarios",
        {
          params: filtros
        }
      );

      setUsuarios(res.data.usuarios);

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

    setPerfil("");

    setStatus("");

    buscarUsuarios({
      perfil: "",
      status: ""
    });

  }

  useEffect(() => {

    buscarUsuarios({
      dataInicio: "",
      dataFim: "",
      perfil: "",
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
            Relatório de Usuários
          </h1>

          <p>
            Lista os usuários cadastrados no sistema.
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
            label="Perfil"
            valor={perfil}
            onChange={setPerfil}
            opcoes={[
              "SECRETARIA",
              "NUTRICIONISTA",
              "ADMINISTRADOR"
            ]}
          />

          <FiltroSelect
            label="Status"
            valor={status}
            onChange={setStatus}
            opcoes={[
              "ATIVO",
              "INATIVO"
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
              buscarUsuarios({
                dataInicio,
                dataFim,
                perfil,
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
            Total de usuários:
            <span className="total-valor">
              {" "}{total}
            </span>
          </strong>

        </div>

        <table className="relatorio-table">

          <thead>

            <tr>
              <th>Nome</th>
              <th>Perfil</th>
              <th>Status</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>CRN</th>
              <th>Especialidade</th>
            </tr>

          </thead>

          <tbody>

            {usuarios.length > 0 ? (

              usuarios.map((usuario) => (

                <tr key={usuario.email}>
                  <td>{usuario.nome}</td>
                  <td>{formatarTexto(usuario.perfil)}</td>
                  <td>{formatarTexto(usuario.status)}</td>
                  <td>{formatarTelefone(usuario.telefone) || "-"}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.crn || "-"}</td>
                  <td>{usuario.especialidade || "-"}</td>
                </tr>

              ))

            ) : (

              <tr className="relatorio-empty-row">

                <td
                  colSpan="7"
                  className="empty-message"
                >
                  Nenhum usuário encontrado
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

            <PdfRelatorioUsuarios
              usuarios={usuarios}
              total={total}
              filtros={{
                dataInicio,
                dataFim,
                perfil,
                status
              }}
            />

          </PDFViewer>

        </div>

      </Modal>

    </>
  );
}

export default RelatorioUsuarios;