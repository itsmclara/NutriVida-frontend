import "./InputCustom.css";

function InputCustom({
  label,
  required = false,
  error,
  type = "text",
  ...props
}) {

  return (

    <div className="input-custom-container">

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

      <input
        type={type}
        className={`
          input-custom
          ${error ? "error" : ""}
        `}
        {...props}
      />

      {error && (

        <span className="input-error">

          {error}

        </span>

      )}

    </div>
  );
}

export default InputCustom;