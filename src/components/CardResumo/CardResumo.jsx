import "./CardResumo.css";

function CardResumo({
  titulo,
  valor,
  descricao,
  icon: Icon,
  cor = "azul"
}) {

  return (

    <div className="card-resumo">

      <div className={`card-resumo-icone card-${cor}`}>

        {Icon && (
          <Icon size={22} />
        )}

      </div>

      <div className="card-resumo-conteudo">

        <span className="card-resumo-titulo">
          {titulo}
        </span>

        <strong className="card-resumo-valor">
          {valor ?? 0}
        </strong>

        <span className="card-resumo-descricao">
          {descricao}
        </span>

      </div>

    </div>

  );
}

export default CardResumo;