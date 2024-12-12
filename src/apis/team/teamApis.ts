import { postMethod } from "../apiConfig";

interface TeamData {
    page? : number,
    limit? : number,
    search? : string,
}

export const getTeamApi = (data : TeamData ) : Promise<any> => {
    return postMethod ("/team/get-all", data);
};