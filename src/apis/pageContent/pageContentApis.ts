import {  postMethod } from "../apiConfig";

interface PageContentData {
    page ? : number,
    limit ? : number,
    search ? : string,
    page_content_id? : number
}

export const getPageContentsApi = (data : PageContentData ) : Promise<any> => {
    return postMethod ("/page-content/get-page-contents", data);
};

export const getPageContentApi = (data : PageContentData ) : Promise<any> => {
    return postMethod ("/page-content/get-page-content", data);
};