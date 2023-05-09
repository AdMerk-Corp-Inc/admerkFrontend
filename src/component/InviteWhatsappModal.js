import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import "./InviteWhatsappModal.css";
import { sendEmailInvites, sendSMS } from "../Helper/Helper";
import { useContext, useState } from "react";
import { userContext } from "../context/UserContext";
import Dropdown from "react-bootstrap/Dropdown";

function InviteWhatsappModal({ show, handleClose }) {
  const { user, setUser } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteText, setInviteText] = useState(
    inviteTextTranslations["English"]
  );
  const [emailStr, setEmailStr] = useState("");
  const [phoneStr, setPhoneStr] = useState("");

  async function getEmailsAndInvite() {

    // If no email or phone number is provided, then close the modal
    if(emailStr.trim().length === 0 && phoneStr.trim().length === 0) handleClose();

    setIsLoading(true);
    let emails = [];
    let phoneNumbers = [];

    // Format Emails and Phone Numbers
    emails = emailStr.split(",");
    phoneNumbers = phoneStr.split(",");

    const smsMessage = `Your friend ${user?.name} has invited you to join Admerk Corp.
    Join us by using the link platform.admerkcorp.com`;
    await sendEmailInvites(emails, user?.token);
    await sendSMS(smsMessage, phoneNumbers);

    // Update user locally
    setUser((prev) => ({ ...prev, has_invited: 1 }));
    setIsLoading(false);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} className="" centered>
      <Container>
        <Row className="justify-content-between align-items-center pt-4 pb-3 px-4 border-bottom">
          <h3 style={{ width: "fit-content" }} className="p-0 m-0">
            Invite Contacts
          </h3>
          <CloseButton className="p-0" onClick={handleClose} />
        </Row>
        <Col className="p-3">
          <div className="">
            <Dropdown>
              <Dropdown.Toggle
                size="sm"
                variant="secondary"
                id="dropdown-basic"
              >
                Language
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(inviteTextTranslations).map((langName, ind) => {
                  return <Dropdown.Item key={ind} onClick={() => setInviteText(inviteTextTranslations[langName])}>{langName}</Dropdown.Item>
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <p className="text-center m-0 mt-3 w-full font-weight-bold">{inviteText}</p>
          <p className="text-center">Separate different emails and phone numbers with comma.</p>
          <div className="my-3">
            <label className="d-flex flex-column">
                <span className="font-weight-bold">Emails</span>
                <input className="p-1"  value={emailStr} onChange={(e) => setEmailStr(e.target.value)} />
            </label>
          </div>
          <div className="my-3">
            <label className="d-flex flex-column">
                <span className="font-weight-bold">Phones</span>
                <input className="p-1" value={phoneStr} onChange={(e) => setPhoneStr(e.target.value)} />
            </label>
          </div>
        </Col>
        <Modal.Footer>
            <Button variant="primary" onClick={getEmailsAndInvite}>Send Invite</Button>
        </Modal.Footer>
      </Container>
    </Modal>
  );
}

const inviteTextTranslations = {
  English:
    "Before proceeding further, please invite your contacts.",
  "kreyòl ayisyen":
    "Avant d'aller plus loin, veuillez inviter vos contacts.",
  français:
    "Anvan w kontinye pi lwen, tanpri envite kontak ou yo.",
};

export default InviteWhatsappModal;
