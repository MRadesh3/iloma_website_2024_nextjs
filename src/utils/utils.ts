import {jwtDecode} from "jwt-decode";
import axios from "axios";

interface DecodedToken {
    exp : number;
}

const isValidToken = (accessToken : string | null) : boolean => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<DecodedToken>(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const setSession = (accessToken : string | null, type? : string ) : void => {
    if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      } else {
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common.Authorization;
      }
};

const getAccessToken = () : string | null => localStorage.getItem("accessToken");

export { isValidToken, setSession, getAccessToken };
