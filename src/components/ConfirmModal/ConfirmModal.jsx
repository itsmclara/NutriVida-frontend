import "./ConfirmModal.css";

function ConfirmModal({
    aberto,
    titulo,
    mensagem,
    textoConfirmar = "Confirmar",
    textoCancelar = "Cancelar",
    onConfirmar,
    onCancelar
}) {

    if (!aberto) return null;

    return (
        <div
            className="confirm-overlay"
            onClick={onCancelar}
        >

            <div
                className="confirm-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <h2>{titulo}</h2>

                <p>{mensagem}</p>

                <div className="confirm-actions">

                    <button
                        className="confirm-btn-cancelar"
                        onClick={onCancelar}
                    >
                        {textoCancelar}
                    </button>

                    <button
                        className="confirm-btn-confirmar"
                        onClick={onConfirmar}
                    >
                        {textoConfirmar}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmModal;