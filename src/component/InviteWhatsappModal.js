import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import "./InviteWhatsappModal.css";
import { sendEmailInvites, sendSMS, sendWpMsg } from "../Helper/Helper";
import { useContext, useState } from "react";
import { userContext } from "../context/UserContext";
import Dropdown from "react-bootstrap/Dropdown";

function TagLabel({ text, onCancel }) {
  return (
    <div className="tag-label">
      <p>{text}</p>
      <button onClick={onCancel}>&#x2715;</button>
    </div>
  );
}

function TagLabelsList({ texts, onCancel }) {
  if (!texts || texts.length === 0) return;

  return (
    <div className="tag-label-list">
      {texts.map((text, ind) => {
        return <TagLabel text={text} key={ind} onCancel={() => onCancel(ind)} />;
      })}
    </div>
  );
}

function InviteWhatsappModal({ show, handleClose }) {
  const { user, setUser } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteText, setInviteText] = useState(
    inviteTextTranslations["English"]
  );
  const [emailStr, setEmailStr] = useState("");
  const [phoneStr, setPhoneStr] = useState("");

  const [emails, setEmails] = useState([]);
  const [phones, setPhones] = useState([]);

  async function getEmailsAndInvite() {
    // If no email or phone number is provided, then close the modal
    if (emailStr.trim().length === 0 && phoneStr.trim().length === 0)
      handleClose();

    setIsLoading(true);
    let emailAddrs = emails;
    let phoneNumbers = phones;

    // console.log("Emails: ", emailAddrs);
    // console.log("Phones: ", phoneNumbers);

    // Format Emails and Phone Numbers
    // emailAddrs = emailStr.split(",");
    // phoneNumbers = phoneStr.split(",");

    const smsMessage = `Your friend ${user?.name} has invited you to join Admerk Corp.
    Join us by using the link platform.admerkcorp.com`;
    await sendEmailInvites(emailAddrs, user?.token);
    await sendSMS(smsMessage, phoneNumbers);
    await sendWpMsg(smsMessage, phoneNumbers);

    // Update user locally //
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
                  return (
                    <Dropdown.Item
                      key={ind}
                      onClick={() =>
                        setInviteText(inviteTextTranslations[langName])
                      }
                    >
                      {langName}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <p className="text-center m-0 mt-3 w-full font-weight-bold">
            {inviteText}
          </p>
          <p className="text-center">
            Separate different emails and phone numbers with comma.
          </p>
          <div className="my-3">
            <p className="font-weight-bold text-primary m-0">Emails</p>
            <div>
              <TagLabelsList
                texts={emails}
                onCancel={(index) => {
                  // Remove the element at given index
                  setEmails(
                    emails.slice(0, index).concat(emails.slice(index + 1))
                  );
                }}
              />
            </div>
            <input
              className="p-1 w-full"
              style={{ width: "100%" }}
              placeholder="myname@gmail.com,yourname@gmail.com"
              value={emailStr}
              onChange={(e) => {
                const lastLetter = e.target.value[e.target.value.length - 1];
                if (lastLetter === ",") {
                  if (e.target.value && e.target.value.length > 1)
                    setEmails([e.target.value.slice(0, -1), ...emails]);
                  setEmailStr("");
                } else setEmailStr(e.target.value);
              }}
            />
          </div>
          <div className="my-3">
            <p className="font-weight-bold text-primary m-0">Phones</p>
            <TagLabelsList
              texts={phones}
              onCancel={(index) => {
                // Remove the element at given index
                setPhones(
                  phones.slice(0, index).concat(phones.slice(index + 1))
                );
              }}
            />
            <input
              className="p-1"
              style={{width: "100%"}}
              value={phoneStr}
              placeholder="+16172028069,+8872020042"
              onChange={(e) => {
                const lastLetter = e.target.value[e.target.value.length - 1];
                if (lastLetter === ",") {
                  if (e.target.value && e.target.value.length > 1)
                    setPhones([e.target.value.slice(0, -1), ...phones]);
                  setPhoneStr("");
                } else setPhoneStr(e.target.value);
              }}
            />
          </div>
        </Col>
        <Modal.Footer>
          <Button variant="primary" onClick={getEmailsAndInvite}>
            Send Invite
          </Button>
        </Modal.Footer>
      </Container>
    </Modal>
  );
}

const inviteTextTranslations = {
  English: "Before proceeding further, please invite your contacts.",
  "kreyòl ayisyen": "Avant d'aller plus loin, veuillez inviter vos contacts.",
  français: "Anvan w kontinye pi lwen, tanpri envite kontak ou yo.",
};

const numbers = [
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
  "+923448374607",
];

export default InviteWhatsappModal;
