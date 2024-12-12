import { postMethod } from "../apiConfig";

interface CeoMessageData {
    page? : number,
    limit? : number,
    search? : string,
}

export const getCeoMessageApi = (data : CeoMessageData ) : Promise<any> => {
    return postMethod ("/ceo-message/fetch", data);
};