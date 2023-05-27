//export const node_url = window.location.origin +  "/";
export const node_url = "http://localhost:3009/";
// export const node_url = "https://platform.admerkcorp.com/";
export const url = node_url + "api/";

export function dateTransformer(date) {
  let date_new = new Date(date);
  return `${date_new.getDate()}/${
    date_new.getMonth() + 1
  }/${date_new.getFullYear()}`;
}

export async function sendEmailInvites(emails, token) {
  console.log("[sendEmailInvites], Emails: ", emails);
  if (!emails || emails.length === 0) {
    console.log("[sendEmailInvites]: No Emails Provided");
    return;
  }

  // const emailInviteUrl = `${url}email-invite?emails=${emails.join(",")}`;

  const payload = {
    emails: emails ? emails : [],
  };

  const response = await fetch(`${url}invite-people`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200)
    console.log("[sendEmailInvites], Emails Sent Successfully: ", response);
  else
    console.log(
      "[sendEmailInvites], Error occurred while sending the emails: ",
      response
    );
}

export async function sendSMS(message, phoneNumbers) {
  if (!message && !phoneNumbers)
    return console.log("[sendSMS] message and phone number not provided!");

  const apiUrl = "https://sender.admerkcorp.com/api/send/sms";
  const params = {
    secret: "16c35e034e510ecd7d3e46dc53131b71b2477c19",
    device: "00000000-0000-0000-3b0d-8130c5ff3180",
    mode: "devices",
    sim: 1,
    message: message,
    phone: null, // E.g. +16172028069
  };

  // If a single phone number in a string is given, convert it into array
  if (typeof phoneNumbers === "string") phoneNumbers = [phoneNumbers];

  for (let i = 0; i < phoneNumbers.length; i++) {
    const fullApiUrl = `${apiUrl}?phone=${phoneNumbers[i]}&message=${params.message}&secret=${params.secret}&device=${params.device}&mode=${params.mode}&sim=${params.sim}&`;

    const response = await fetch(fullApiUrl, {
      method: "POST",
    });
    if (response.status === 200) console.log("SMS Sent Succesfully to: ", phoneNumbers[i]);
    else console.log("Failed to send SMS to: ", phoneNumbers[i]);
  }
}
