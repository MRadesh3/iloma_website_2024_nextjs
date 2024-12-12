// Collection Data

export interface ICollectionItem {
  id: number;
  collection_id: number;
  title: string;
  description: string;
  media_type: string;
  status: string;
  file_path: string | null;
  banner : string | null;
}

export interface CollectionData {
  id: number;
  title: string;
  description: string;
  tags: string;
  thumbnail?: string;
  visibility: string;
  status: string;
  date: string | null;
  author: string | null;
  category: string | null;
  client : string | null;
  technology : string | null;
  platform : string | null;
  applink? : string | null;
  CollectionItem ? : ICollectionItem[];
  slides? :{
    src: string;
    title: string;
    description: string;
  }[ ] | undefined
};

export interface JobData {
  id: number | string;
  title: string;
  date : string;
  min_salary: string;
  max_salary: string;
  location: string;
  description: string;
  sub_description : string;
  created_at: string,
  updated_at: string,
  deleted_at: string | null
}

export interface TestimonialData {
  id : number,
  user_name : string,
  message : string,
  profile_image : string,
  designation : string,
  contact_number : string,
  rating : number,
}

export interface TeamData {
  id : number,
  user_name : string,
  designation : string,
  profile_image : string,
}

export interface EnquiryFormValues {
  name: string;
  phone_no: string;
  email: string;
  message: string;
  status : string;
}

export interface CeoMessageData {
  id : number,
  name : string,
  title : string,
  education : string,
  designation : string,
  image : string,
  description : string,
  sub_description : string,
  status : string,
  visibility : string,
  created_by: number,
  updated_by: number,
  deleted_by: number | null,
  created_at: string,
  updated_at: string,
  deleted_at: string | null
}

export interface SocialLinkData{
  id : number,
  name : string,
  url : string,
  description : string,
  icon : string,
} 

export interface PageContentData {
  id : number,
  name : string,
  type :  string,
  description : string
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: {
    data: {
      rows: T[] ;
    };
  };
}

export interface ApiResponseSingle<T> {
  status: number;
  message: string;
  data: {
    data : T;
  }
}

export interface ApiResponseMulti<T> {
  status: number;
  message: string;
  data: {
    data : T[];
  }
}

export interface ApiResponseContent<T> {
  status: number;
  message: string;
  data : T;
}
