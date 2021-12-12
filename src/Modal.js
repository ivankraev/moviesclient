import ReactDom from "react-dom";
import { useContext } from "react";
import { ModalContext } from "./Contexts/ModalContext";

function Modal(props) {
  const modalManipulator = useContext(ModalContext);
  if (!modalManipulator.isOpen) {
    props.closeRegister();
    return null;
  }
  return ReactDom.createPortal(
    props.children,
    document.getElementById("portal")
  );
}
export default Modal;
