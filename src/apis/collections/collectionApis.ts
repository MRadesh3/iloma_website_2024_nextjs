import { postMethod } from "../apiConfig";

interface CollectionData {
    tags : string,
    page? : number,
    limit? : number,
    search? : string,
    is_details : string
}

interface CollectionIdData {
    collection_id : string | number,
}

export const getCollectionsApi = (data : CollectionData ) : Promise<any> => {
    return postMethod ("/collection/fetch-collections-by-tag", data);
};

export const getCollectionApi = (data : CollectionIdData ) : Promise<any> => {
    return postMethod ("/collection/fetch-by-id", data);
};