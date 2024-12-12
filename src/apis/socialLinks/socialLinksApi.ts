import { postMethod } from "../apiConfig";

interface SocialLinkData {
    page? : number,
    limit? : number,
    search? : string,
}

export const getSocialLinksApi = (data : SocialLinkData ) : Promise<any> => {
    return postMethod ("/social_link/get-all-social_links", data);
};