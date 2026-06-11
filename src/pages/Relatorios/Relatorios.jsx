import {
  Users,
  MapPin,
  ClipboardList,
  UserCheck,
  CalendarDays,
  Shield
} from "lucide-react";

import RelatorioCard from "../../components/RelatorioCard/RelatorioCard";

import "./Relatorios.css";

function Relatorios() {

  const relatorios = [

    {
      titulo: "Pacientes",

      descricao:
        "Lista todos os pacientes cadastrados na clínica.",

      icon: <Users size={22} />,

      rota: "/relatorios/pacientes"
    },

    {
      titulo: "Consultas",

      descricao:
        "Exibe todas as consultas realizadas em determinado período.",

      icon: <ClipboardList size={22} />,

      rota: "/relatorios/consultas"
    },

    {
      titulo: "Agenda",

      descricao:
        "Exibe todos os horários agendados de uma determinada data.",

      icon: <CalendarDays size={22} />,

      rota: "/relatorios/agenda-dia"
    },

    {
      titulo: "Usuários",

      descricao:
        "Lista os usuários cadastrados no sistema.",

      icon: <Shield size={22} />,

      rota: "/relatorios/usuarios"
    }
  ];

  return (
    <div className="relatorios">

      <div className="relatorios-header">

        <div>

          <h1>Relatórios</h1>

          <p>
            Visualize e gere relatórios da clínica.
          </p>

        </div>

      </div>

      <div className="relatorios-grid">


        {relatorios.map((relatorio) => (

        <RelatorioCard
            key={relatorio.titulo}
            titulo={relatorio.titulo}
            descricao={relatorio.descricao}
            icon={relatorio.icon}
            rota={relatorio.rota}
        />

        ))}


      </div>

    </div>
  );
}

export default Relatorios;