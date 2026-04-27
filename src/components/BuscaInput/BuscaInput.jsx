import { Search } from "lucide-react";
import "./BuscaInput.css";

function BuscaInput({ placeholder, onBuscar }) {

  function handleChange(e) {
    onBuscar(e.target.value);
  }

  return (
    <div className="busca-container">
        <Search size={18} className="busca-icon" />

        <input
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
            className="busca-input"
        />
    </div>
  );
}

export default BuscaInput;