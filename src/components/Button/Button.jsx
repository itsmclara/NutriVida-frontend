import "./Button.css";

function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  icon,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;