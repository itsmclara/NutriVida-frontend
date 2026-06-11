import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./FiltroSelect.css";
import { formatarTexto } from "../../utils/formatadores";

function FiltroSelect({ label, opcoes, valor, onChange }) {
  const [aberto, setAberto] = useState(false);

  function selecionar(opcao) {
    onChange(opcao);
    setAberto(false);
  }

  return (
    <div className="filtro-container">
      <label>{label}</label>

      <div
        className={`filtro-select ${!valor ? "placeholder" : ""}`}
        onClick={() => setAberto(!aberto)}
      >
        <span>

          {valor
            ? (
              opcoes.find((op) => {

                if (typeof op === "object") {
                  return op.valor === valor;
                }

                return op === valor;

              })?.label || valor
            )
            : "Todos"}

        </span>

        <ChevronDown size={16} />
      </div>

      {aberto && (
        <div className="filtro-dropdown">

          <div
            className="filtro-item"
            onClick={() => selecionar("")}
          >
            Todos
          </div>

          {opcoes.map((op) => {

            const valorOpcao =
              typeof op === "object"
                ? op.valor
                : op;

            const labelOpcao =
              typeof op === "object"
                ? op.label
                : formatarTexto(op);

            return (
              <div
                key={valorOpcao}
                className="filtro-item"
                onClick={() => selecionar(valorOpcao)}
              >
                {formatarTexto(labelOpcao)}
              </div>
            );

          })}

        </div>
      )}
    </div>
  );
}

export default FiltroSelect;