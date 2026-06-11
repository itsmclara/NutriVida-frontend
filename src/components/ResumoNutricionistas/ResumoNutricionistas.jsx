import { Clock3, CheckCircle2 } from "lucide-react";

import "./ResumoNutricionistas.css";

function ResumoNutricionistas({ nutricionistas = [] }) {
    function obterIniciais(nome) {
        return nome
            ?.split(" ")
            .slice(0, 2)
            .map((parte) => parte[0])
            .join("")
            .toUpperCase();
    }

    function calcularPendentes(nutri) {
        return (nutri.agendadas || 0) + (nutri.confirmadas || 0);
    }

    function calcularProgresso(nutri) {
        const total = nutri.totalHoje || 0;

        if (total === 0) return 100;

        const pendentes = calcularPendentes(nutri);

        const concluidas = total - pendentes;

        return Math.round((concluidas / total) * 100);
    }

    function obterDemanda(totalHoje) {
        if (totalHoje >= 15) {
            return "Alta demanda";
        }

        if (totalHoje >= 8) {
            return "Média demanda";
        }

        return "Baixa demanda";
    }

    return (
        <section className="resumo-nutris-container">

            <div className="resumo-nutris-grid">
                {nutricionistas.map((nutri) => {
                    const pendentes = calcularPendentes(nutri);

                    const progresso = calcularProgresso(nutri);

                    const demanda =
                        obterDemanda(
                            nutri.totalHoje
                        );

                    const classeDemanda =
                        demanda === "Alta demanda"
                            ? "demanda-alta"
                            : demanda === "Média demanda"
                                ? "demanda-media"
                                : "demanda-baixa";

                    return (
                        <div key={nutri.nutricionistaId} className="resumo-nutri-card">
                            <div className="resumo-nutri-topo">
                                <div className="resumo-nutri-avatar">
                                    {obterIniciais(nutri.nome)}
                                </div>

                                <div>
                                    <h3>{nutri.nome}</h3>

                                    <span>CRN {nutri.crn}</span>
                                </div>
                            </div>

                            <div className={`resumo-nutri-tag ${classeDemanda}`}>
                                {demanda}
                            </div>

                            <div className="resumo-nutri-principal">
                                <strong>{pendentes}</strong>

                                <span>Consultas pendentes</span>
                            </div>

                            <div className="resumo-nutri-status">
                                <div>
                                    <span className="status-agendada">Agendadas</span>

                                    <strong>{nutri.agendadas}</strong>
                                </div>

                                <div>
                                    <span className="status-confirmada">Confirmadas</span>

                                    <strong>{nutri.confirmadas}</strong>
                                </div>

                                <div>
                                    <span className="status-realizada">Realizadas</span>

                                    <strong>{nutri.realizadas}</strong>
                                </div>

                                <div>
                                    <span className="status-cancelada">Canc./Aus.</span>

                                    <strong>
                                        {(nutri.canceladas || 0) + (nutri.ausentes || 0)}
                                    </strong>
                                </div>
                            </div>

                            <div className="resumo-nutri-total">
                                Total do dia: <strong>{nutri.totalHoje}</strong>
                            </div>

                            <div className="resumo-nutri-progresso">
                                <div className="resumo-nutri-progresso-info">
                                    <span>{progresso}% concluído</span>
                                </div>

                                <div className="resumo-nutri-barra">
                                    <div
                                        className="resumo-nutri-barra-fill"
                                        style={{
                                            width: `${progresso}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="resumo-nutri-rodape">
                                {nutri.proximaConsulta ? (
                                    <>
                                        <Clock3 size={16} />

                                        <span>Próxima consulta</span>

                                        <strong>{nutri.proximaConsulta}</strong>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={16} />

                                        <span>Nenhuma consulta restante</span>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default ResumoNutricionistas;
