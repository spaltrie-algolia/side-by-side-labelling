import Toast from "react-bootstrap/Toast";

function CustomToast({ text, show, setShow, variant }) {
  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={2500}
      autohide
      bg={variant}
      style={{ marginBottom: "3px" }}
    >
      {/* <Toast.Header>
        <strong className="me-auto">{header}</strong>
      </Toast.Header> */}
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
}

export default CustomToast;
