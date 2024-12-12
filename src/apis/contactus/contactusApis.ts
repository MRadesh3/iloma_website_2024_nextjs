import { postMethod } from "../apiConfig";

interface ContactUsData {
    name : string,
    email : string,
    phone_no : string,
    message : string,
    status : string,
}

export const submitEnquiry = (data : ContactUsData ) : Promise<any> => {
    return postMethod ("/contact_us/submit", data);
};