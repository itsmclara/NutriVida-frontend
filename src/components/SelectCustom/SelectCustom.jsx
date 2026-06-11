import {
  useState,
  useRef,
  useEffect
} from "react";

import { createPortal } from "react-dom";

import { ChevronDown } from "lucide-react";

import "./SelectCustom.css";

function SelectCustom({
  label,
  placeholder = "Selecione",
  opcoes = [],
  valor,
  onChange,
  required = false,
  error
}) {

  const [aberto, setAberto] =
    useState(false);

  const [posicao, setPosicao] =
    useState({
      top: 0,
      left: 0,
      width: 0
    });

  const selectRef = useRef(null);

  const opcaoSelecionada =
    opcoes.find(
      (op) => op.valor === valor
    );

  useEffect(() => {

    function fecharAoClicarFora(e) {

      if (
        selectRef.current &&
        !selectRef.current.contains(e.target)
      ) {

        setAberto(false);
      }
    }

    document.addEventListener(
      "mousedown",
      fecharAoClicarFora
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        fecharAoClicarFora
      );
    };

  }, []);

  function toggleDropdown() {

    if (!aberto && selectRef.current) {

      const rect =
        selectRef.current.getBoundingClientRect();

      setPosicao({
        top:
          rect.bottom +
          window.scrollY +
          6,

        left:
          rect.left +
          window.scrollX,

        width: rect.width
      });
    }

    setAberto(!aberto);
  }

  function selecionar(opcao) {

    onChange(opcao.valor);

    setAberto(false);
  }

  return (

    <div
      className="select-custom-container"
      ref={selectRef}
    >

      {label && (

        <label>

          {label}

          {required && (
            <span className="required">
              *
            </span>
          )}

        </label>

      )}

      <div
        className={`
          select-custom
          ${!valor ? "placeholder" : ""}
          ${error ? "error" : ""}
        `}
        onClick={toggleDropdown}
      >

        <span>

          {opcaoSelecionada?.label ||
            placeholder}

        </span>

        <ChevronDown size={16} />

      </div>

      {aberto && createPortal(

        <div
          className="select-custom-dropdown"
          style={{
            top: posicao.top,
            left: posicao.left,
            width: posicao.width
          }}
        >

          {opcoes.map((opcao) => (

            <div
              key={opcao.valor}
              className="select-custom-item"
              onMouseDown={() =>
                selecionar(opcao)
              }
            >

              {opcao.label}

            </div>

          ))}

        </div>,

        document.body
      )}

      {error && (
        <span className="select-error">
          {error}
        </span>
      )}

    </div>
  );
}

export default SelectCustom;