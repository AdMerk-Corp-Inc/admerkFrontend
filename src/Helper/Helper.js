// export const node_url = window.location.origin +  "/";
export const node_url = "http://localhost:3009/";
// export const node_url = "https://platform.admerkcorp.com/";
export const url = node_url + 'api/';

export function dateTransformer(date){
    let date_new = new Date(date)
    return `${date_new.getDate()}/${date_new.getMonth()+1}/${date_new.getFullYear()}`
}

export async function sendEmailInvites(emails, numbers, token) {
    console.log("[sendEmailInvites], Emails: ", emails);
    if(!emails || emails.length === 0) {
        console.log("[sendEmailInvites]: No Emails Provided");
        return ;
    }
    const emailInviteUrl = `${url}email-invite?emails=${emails.join(",")}`;
    if(!emails) emails = [];
    if(!numbers) numbers = [];
    
    const payload = {
        emails: emails ? emails : [],
        numbers: numbers ? numbers : []
    }

    const response = await fetch(emailInviteUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    if(response.status === 200) console.log("[sendEmailInvites], Emails Sent Successfully: ", emailInviteUrl, response);
    else console.log("[sendEmailInvites], Error occurred while sending the emails: ", emailInviteUrl, response);
}