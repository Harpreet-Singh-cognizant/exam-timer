import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as Edit } from "../assets/images/edit.svg";
import DateTimePicker from "react-datetime-picker";

const ModalComponent = (props) => {
  const [value, onChange] = useState(new Date());
  const [show, setShow] = useState(false);

  const sendData = (value) => {
    props.passchild(value);
  };

  return (
    <>
      <button
        variant="primary"
        onClick={() => setShow(true)}
        data-aos="fade-up"
        className="editIcon"
      >
        <Edit className="edit" />
      </button>

      <Modal
        className={
          props.theme === "_light"
            ? "timer_modal light_modal"
            : props.theme === "_love"
            ? "timer_modal love_modal"
            : "timer_modal"
        }
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Body>
          <p className="modal_text">Select Date and Time</p>
          <div className="align_box flexie ">
            <DateTimePicker
              format={"dd/MM/y h:mm:ss a"}
              onChange={onChange}
              value={value}
              on
            />
            <button
              className="set_btn"
              onClick={() => {
                setShow(false);
                sendData(value);
              }}
            >
              SET
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalComponent;
