import "./TextareaCustom.css";

function TextareaCustom({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  disabled = false
}) {

  return (
    <div className="textarea-custom-container">

      {label && (
        <label>
          {label}
        </label>
      )}

      <textarea
        className="textarea-custom"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
      />

    </div>
  );
}

export default TextareaCustom;