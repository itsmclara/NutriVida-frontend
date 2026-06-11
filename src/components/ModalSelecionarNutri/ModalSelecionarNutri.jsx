import { User } from "lucide-react";
import Modal from "../Modal/Modal";
import "./ModalSelecionarNutri.css";
import Button from "../Button/Button";

function ModalSelecionarNutri({
  aberto,
  onClose,
  nutricionistas,
  onSelecionar
}) {
  return (
    <Modal aberto={aberto} onClose={onClose}>

      <div className="modal-header">
        <div className="modal-title">
          <User size={20} className="modal-icon" />
          <h2>Selecionar nutricionista</h2>
        </div>

        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="modal-body">

        {nutricionistas.length > 0 ? (
          <div className="nutri-lista">
            {nutricionistas.map((n) => (
              <div
                key={n.id}
                className="nutri-option"
                onClick={() => {
                  onSelecionar(n);
                  onClose();
                }}
              >
                <strong>Dra. {n.nome}</strong>
                <p>CRN: {n.crn}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-message">
            Nenhuma nutricionista encontrada
          </div>
        )}

      </div>



      <div className="modal-footer">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Fechar
        </Button>
      </div>

    </Modal>
  );
}

export default ModalSelecionarNutri;