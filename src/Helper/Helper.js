// export const node_url = window.location.origin +  "/";
// export const node_url = "http://localhost:3009/";
export const node_url = "https://platform.admerkcorp.com/";
export const url = node_url + 'api/';

export function dateTransformer(date){
    let date_new = new Date(date)
    return `${date_new.getDate()}/${date_new.getMonth()+1}/${date_new.getFullYear()}`
}