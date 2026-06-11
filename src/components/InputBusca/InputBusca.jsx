import {
  useState,
  useEffect,
  useRef
} from "react";

import { Search } from "lucide-react";

import "./InputBusca.css";

function InputBusca({
  label,
  placeholder = "Buscar...",
  onBuscar,
  delay = 400,
  disabled = false
}) {

  const [valor, setValor] =
    useState("");

  const onBuscarRef =
    useRef(onBuscar);

  useEffect(() => {

    onBuscarRef.current =
      onBuscar;

  }, [onBuscar]);

  useEffect(() => {

    const timeout =
      setTimeout(() => {

        onBuscarRef.current?.(
          valor
        );

      }, delay);

    return () =>
      clearTimeout(timeout);

  }, [valor, delay]);

  return (

    <div className="input-busca-group">

      {label && (

        <label>
          {label}
        </label>

      )}

      <div className="input-busca-container">

        <Search
          size={18}
          className="input-busca-icon"
        />

        <input
          type="text"
          placeholder={placeholder}
          value={valor}
          disabled={disabled}
          onChange={(e) =>
            setValor(
              e.target.value
            )
          }
          className="input-busca"
        />

      </div>

    </div>
  );
}

export default InputBusca;