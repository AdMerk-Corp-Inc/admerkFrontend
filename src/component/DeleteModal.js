import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteModal = (props) => {
   const { deletedata, job } = props;
   return (
      <Modal
         {...props}
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
               <div className="d-flex justify-content-center">
                  <i
                     class="fa-regular fa-circle-xmark text-danger"
                     style={{ fontSize: "65px", marginBottom: "20px" }}
                  ></i>
               </div>
               <div>
                  <h1>Are You Sure?</h1>
               </div>
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="d-flex flex-column">
               {job ? (
                  <p
                     className="text-center text-muted"
                     style={{ fontSize: "16px" }}
                  >
                     Are You Sure you want to delete this Job? These Job Cannot
                     Get Back Again.
                  </p>
               ) : (
                  <p
                     className="text-center text-muted"
                     style={{ fontSize: "16px" }}
                  >
                     Are You Sure you want to delete this Bootcamp? This
                     bootcamp Cannot Get Back Again.
                  </p>
               )}
            </div>
         </Modal.Body>
         <Modal.Footer>
            <Button className="btn btn-dark " onClick={props.onHide}>
               Cancel
            </Button>
            <Button className="btn btn-danger ml-3" onClick={deletedata}>
               Delete
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default DeleteModal;
