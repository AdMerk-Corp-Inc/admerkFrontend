import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import "./InviteContactsModal.css";
import LoadGAuth from "./LoadGAuth";

function handleClose() {}
const show = true;

function InviteContactsModal() {
  return (
    <Modal show={show} onHide={handleClose} className="" centered>
      <Container>
        <Row className="justify-content-between align-items-center pt-4 pb-3 px-4 border-bottom">
          <h3 style={{ width: "fit-content" }} className="p-0 m-0">
            Invite Contacts
          </h3>
          <CloseButton className="p-0" style={{ display: "none" }} />
        </Row>
        <Col className="p-3">
          <p className="text-align-center m-0">
            Before proceeding further, please invite your contacts. You don't
            have to invite them manually, we will invite them for you through
            google. Please login with your best google account
          </p>
        </Col>
        <Modal.Footer>
          <LoadGAuth onClick={() => console.log("Fetched All Contacts, now send emails, let database know and close")}>
            <Button variant="primary">
              Send Invite
            </Button>
          </LoadGAuth>
        </Modal.Footer>
      </Container>
    </Modal>
  );
}

export default InviteContactsModal;
