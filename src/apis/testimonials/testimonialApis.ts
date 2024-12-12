import { postMethod } from "../apiConfig";

interface TestimonialData {
    page? : number,
    limit? : number,
    search? : string,
}

export const getTestimonialsApi = (data : TestimonialData ) : Promise<any> => {
    return postMethod ("/testimonial/get-all", data);
};