import {
  useState,
  useEffect,
  useRef
} from "react";

import { createPortal } from "react-dom";

import { Search } from "lucide-react";

import "./InputAutocomplete.css";

function InputAutocomplete({
  label,
  placeholder = "Buscar...",
  value,
  onChange,
  resultados = [],
  onSelecionar,
  renderItem,
  required = false,
  error
}) {

  const [
    focado,
    setFocado
  ] = useState(false);

  const [
    posicao,
    setPosicao
  ] = useState({
    top: 0,
    left: 0,
    width: 0
  });

  const containerRef =
    useRef(null);

  useEffect(() => {

    function handleClickFora(e) {

      if (
        containerRef.current &&
        !containerRef.current.contains(
          e.target
        )
      ) {

        setFocado(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickFora
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickFora
      );
    };

  }, []);

  const aberto =

    focado &&
    value &&
    resultados.length > 0;

  return (

    <div
      className="autocomplete-group"
      ref={containerRef}
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
            autocomplete-input-container
            ${error ? "error" : ""}
        `}
      >

        <Search
          size={18}
          className="autocomplete-icon"
        />

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onFocus={() => {

            if (containerRef.current) {

              const rect =
                containerRef.current.getBoundingClientRect();

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

            setFocado(true);
          }}
          onChange={onChange}
          className="autocomplete-input"
        />

      </div>

      {aberto && createPortal(

        <div
          className="autocomplete-dropdown"
          style={{
            top: posicao.top,
            left: posicao.left,
            width: posicao.width
          }}
        >

          {resultados.map((item) => (

            <div
              key={item.id}
              className="autocomplete-item"
              onMouseDown={() => {

                onSelecionar(item);

                setFocado(false);
              }}
            >

              {renderItem(item)}

            </div>

          ))}

        </div>,

        document.body
      )}

      {error && (
        <span className="autocomplete-error">
          {error}
        </span>
      )}

    </div>
  );
}

export default InputAutocomplete;