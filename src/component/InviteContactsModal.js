import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import "./InviteContactsModal.css";
import LoadGAuth from "./LoadGAuth";
import { sendEmailInvites, sendSMS } from "../Helper/Helper";
import { useContext, useState } from "react";
import { userContext } from "../context/UserContext";
import Dropdown from "react-bootstrap/Dropdown";

function InviteContactsModal({ show, handleClose }) {
  const { user, setUser } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteText, setInviteText] = useState(
    inviteTextTranslations["English"]
  );

  async function getEmailsAndInvite(contacts) {
    setIsLoading(true);
    let emails = [];
    let phoneNumbers = [];

    for (let i = 0; i < contacts.length; i++) {
      const thisEmail = contacts[i]?.emailAddresses[0]?.value;
      const thisNumber = contacts[i]?.phoneNumbers[0]?.value;
      if (thisEmail) emails.push(thisEmail);
      if (thisNumber) phoneNumbers.push(thisNumber);
    }

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
          <p className="text-align-center m-0 mt-3">{inviteText}</p>
        </Col>
        <Modal.Footer>
          <LoadGAuth onClick={getEmailsAndInvite} isLoading={isLoading}>
            <Button variant="primary">Send Invite</Button>
          </LoadGAuth>
        </Modal.Footer>
      </Container>
    </Modal>
  );
}

const inviteTextTranslations = {
  English:
    "Before proceeding further, please invite your contacts. You don't have to invite them manually, we will invite them for you through google. Please login with your best google account.",
  "kreyòl ayisyen":
    "Avant d'aller plus loin, veuillez inviter vos contacts. Vous n'avez pas à les inviter manuellement, nous les inviterons pour vous via Google. Veuillez vous connecter avec votre compte Google.",
  français:
    "Anvan w kontinye pi lwen, tanpri envite kontak ou yo. Ou pa bezwen envite yo manyèlman, n ap envite yo pou ou atravè google. Tanpri konekte ak kont Google ou a.",
};

export default InviteContactsModal;
