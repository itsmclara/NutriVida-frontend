import {
  useState,
  useEffect,
  useRef
} from "react";

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
          onFocus={() =>
            setFocado(true)
          }
          onChange={onChange}
          className="autocomplete-input"
        />

      </div>

      {aberto && (

        <div className="autocomplete-dropdown">

          {resultados.map((item) => (

            <div
              key={item.id}
              className="autocomplete-item"
              onClick={() => {

                onSelecionar(item);

                setFocado(false);
              }}
            >

              {renderItem(item)}

            </div>

          ))}

        </div>

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