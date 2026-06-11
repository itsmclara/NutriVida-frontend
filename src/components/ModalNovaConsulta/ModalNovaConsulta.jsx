import {
  useState,
  useEffect
} from "react";

import { Plus } from "lucide-react";

import Modal from "../Modal/Modal";

import Button from "../Button/Button";
import InputAutocomplete from "../InputAutocomplete/InputAutocomplete";
import SelectCustom from "../SelectCustom/SelectCustom";
import InputCustom from "../InputCustom/InputCustom";

import api from "../../services/api";
import toast from "../../utils/toast";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

import {
  formatarCPF,
  formatarNomeNutri
} from "../../utils/formatadores";

import "./ModalNovaConsulta.css";

import ModalNovoPaciente from "../ModalNovoPaciente/ModalNovoPaciente";

function ModalNovaConsulta({
  aberto,
  onClose,
  dataInicial = "",
  horaInicial = "",
  nutricionista,
  onConsultaCriada
}) {

  const usuario = JSON.parse(
    sessionStorage.getItem("usuario")
  );

  const ehNutricionista =
    usuario?.perfil ===
    "NUTRICIONISTA";

  const [
    modalNovoPacienteAberto,
    setModalNovoPacienteAberto
  ] = useState(false);

  const [
    buscaPaciente,
    setBuscaPaciente
  ] = useState("");

  const [
    pacientes,
    setPacientes
  ] = useState([]);

  const [
    pacienteSelecionado,
    setPacienteSelecionado
  ] = useState(null);

  const [
    nutricionistaSelecionada,
    setNutricionistaSelecionada
  ] = useState(
    nutricionista || null
  );

  const [
    nutricionistas,
    setNutricionistas
  ] = useState([]);

  const [data, setData] =
    useState(
      dataInicial || ""
    );

  const [hora, setHora] =
    useState(
      horaInicial || ""
    );

  const [loading, setLoading] =
    useState(false);

  const [erros, setErros] =
    useState({});

  const [
    modalConfirmacao,
    setModalConfirmacao
  ] = useState(null);

  const [
    agendamentoPendente,
    setAgendamentoPendente
  ] = useState(null);

  const horariosDisponiveis = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30"
  ];

  const horariosOpcoes =
    horariosDisponiveis.map(
      (hora) => ({
        valor: hora,
        label: hora
      })
    );

  useEffect(() => {

    if (!aberto) return;

    setData(
      dataInicial || ""
    );

    setHora(
      horaInicial || ""
    );

    setNutricionistaSelecionada(
      nutricionista || null
    );

  }, [
    aberto,
    dataInicial,
    horaInicial,
    nutricionista
  ]);

  useEffect(() => {

    if (!aberto) return;

    async function buscarNutricionistas() {

      try {

        const res =
          await api.get(
            "/nutricionistas"
          );

        setNutricionistas(
          res.data
        );

      } catch (error) {

        console.error(
          "Erro ao buscar nutricionistas:",
          error
        );
      }
    }

    buscarNutricionistas();

  }, [aberto]);

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

        const res =
          await api.get(
            "/pacientes/busca",
            {
              params: {
                nome:
                  buscaPaciente
              }
            }
          );

        setPacientes(
          res.data
        );

      } catch (error) {

        console.error(
          "Erro ao buscar pacientes:",
          error
        );
      }
    }

    buscarPacientes();

  }, [buscaPaciente]);

  function limparFormulario() {

    setBuscaPaciente("");

    setPacientes([]);

    setPacienteSelecionado(null);

    setData("");

    setHora("");

    setErros({});
  }

  async function salvarConsulta(
    novoAgendamento
  ) {

    try {

      setLoading(true);

      await api.post(
        "/agendamentos",
        novoAgendamento
      );

      toast.sucesso(
        "Consulta agendada com sucesso"
      );

      if (onConsultaCriada) {

        await onConsultaCriada({
          data: novoAgendamento.data,
          nutricionistaId:
            novoAgendamento.nutricionistaId
        });
      }

      handleClose();

    } catch (error) {

      console.error(error);

      toast.erro(
        error?.response?.data?.message ||
        "Erro ao agendar consulta"
      );

    } finally {

      setLoading(false);
    }
  }

  function handleClose() {

    limparFormulario();

    onClose();
  }

  async function handleSalvar() {

    const novosErros = {};

    if (!nutricionistaSelecionada) {
      novosErros.nutricionista =
        "Selecione uma nutricionista";
    }

    if (!pacienteSelecionado) {
      novosErros.paciente =
        "Selecione um paciente";
    }

    if (!data) {
      novosErros.data =
        "Selecione uma data";
    }

    if (!hora) {
      novosErros.hora =
        "Selecione um horário";
    }

    setErros(novosErros);

    if (
      Object.keys(novosErros)
        .length > 0
    ) {
      return;
    }

    try {

      const novoAgendamento = {

        pacienteId:
          pacienteSelecionado.id,

        nutricionistaId:
          nutricionistaSelecionada.id,

        data,
        hora
      };

      const verificarAgenda =
        await api.get(
          "/agendas/dia",
          {
            params: {
              data,

              nutricionistaId:
                nutricionistaSelecionada.id
            }
          }
        );

      if (
        !verificarAgenda.data.existe
      ) {

        setAgendamentoPendente(
          novoAgendamento
        );

        setModalConfirmacao({
          tipo: "ABRIR",
          titulo: "Abrir agenda",
          mensagem:
            "Não existe agenda para esse dia. Deseja abrir automaticamente?"
        });

        setLoading(false);

        return;
      }

      if (
        verificarAgenda.data.agenda?.status ===
        "FINALIZADA"
      ) {

        setAgendamentoPendente(
          novoAgendamento
        );

        setModalConfirmacao({
          tipo: "REABRIR",
          titulo: "Reabrir agenda",
          mensagem:
            "A agenda está fechada. Deseja reabrir automaticamente?"
        });

        setLoading(false);

        return;
      }

      await salvarConsulta(
        novoAgendamento
      );

    } catch (error) {

      console.error(
        "Erro ao agendar consulta:",
        error
      );

      toast.erro(

        error?.response?.data?.message ||

        "Erro ao agendar consulta"
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <Modal
      aberto={aberto}
      onClose={handleClose}
    >

      <div className="modal-header">

        <div className="modal-title">

          <Plus
            size={20}
            className="modal-icon"
          />

          <h2>
            Nova consulta
          </h2>

        </div>

        <button
          className="close-btn"
          onClick={handleClose}
        >
          ×
        </button>

      </div>

      <form
        className="modal-body"
        onSubmit={(e) => {

          e.preventDefault();

          handleSalvar();
        }}
      >

        {!ehNutricionista && (

          <div className="form-group">

            <SelectCustom
              label="Nutricionista"
              required
              error={erros.nutricionista}
              placeholder="Selecione uma nutricionista"
              valor={
                nutricionistaSelecionada?.id
                  ? String(
                    nutricionistaSelecionada.id
                  )
                  : ""
              }
              onChange={(valor) => {

                const nutricionistaEncontrada =
                  nutricionistas.find(
                    (nutricionista) =>
                      nutricionista.id ===
                      Number(valor)
                  );

                setNutricionistaSelecionada(
                  nutricionistaEncontrada || null
                );
              }}
              opcoes={
                nutricionistas.map(
                  (nutricionista) => ({
                    valor:
                      String(
                        nutricionista.id
                      ),

                    label: formatarNomeNutri(nutricionista)
                  })
                )
              }
            />

          </div>

        )}

        <div className="form-group">

          <div className="consulta-paciente-wrapper">

            <InputAutocomplete
              label="Paciente"
              required
              error={erros.paciente}
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

                <>

                  <strong>
                    {paciente.nome}
                  </strong>

                  <span>
                    CPF:
                    {" "}
                    {formatarCPF(
                      paciente.cpf
                    )}
                  </span>

                </>

              )}
            />

            <Button
              type="button"
              variant="secondary"
              className="btn-add-paciente"
              onClick={() =>
                setModalNovoPacienteAberto(true)
              }
            >

              <Plus size={18} />

            </Button>

          </div>

        </div>

        <div className="form-row">

          <InputCustom
            label="Data"
            required
            error={erros.data}
            type="date"
            value={data}
            onChange={(e) =>
              setData(
                e.target.value
              )
            }
          />

          <SelectCustom
            label="Horário"
            required
            error={erros.hora}
            placeholder="Selecione um horário"
            opcoes={
              horariosOpcoes
            }
            valor={hora}
            onChange={setHora}
          />

        </div>

      </form>

      <div className="modal-footer">

        <Button
          variant="secondary"
          type="button"
          onClick={handleClose}
          disabled={loading}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          onClick={handleSalvar}
          disabled={loading}
        >

          {loading
            ? "Salvando..."
            : "Salvar"}

        </Button>

      </div>

      <ModalNovoPaciente
        aberto={
          modalNovoPacienteAberto
        }

        onClose={() =>
          setModalNovoPacienteAberto(false)
        }

        onPacienteCriado={(paciente) => {

          setPacienteSelecionado(
            paciente
          );

          setBuscaPaciente(
            paciente.nome
          );

          setPacientes([]);

          setModalNovoPacienteAberto(false);
        }}
      />

      <ConfirmModal
        aberto={!!modalConfirmacao}
        titulo={
          modalConfirmacao?.titulo
        }
        mensagem={
          modalConfirmacao?.mensagem
        }
        textoConfirmar="Continuar"
        textoCancelar="Cancelar"
        onCancelar={() => {

          setModalConfirmacao(null);

          setAgendamentoPendente(null);
        }}
        onConfirmar={() => {

          const dados = agendamentoPendente;

          setModalConfirmacao(null);
          setAgendamentoPendente(null);

          if (dados) {
            salvarConsulta(dados);
          }
        }}
      />

    </Modal>
  );
}

export default ModalNovaConsulta;