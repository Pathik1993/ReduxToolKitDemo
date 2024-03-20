import axios from "axios";
import { BASE_URL } from "./utils";

const _REQUEST2SERVER = async (url: string, params: FormData | null | undefined, method: string) => {
    let config = {
          method: method,
          url: BASE_URL + url,
          headers: {
            'Content-Type': 'application/json'
         },
          data: params,
        };   
      return await new Promise(function (resolve, reject) {
        console.log({config});
        
        axios(config)
          .then((data) => {            
            if (data.data.status) resolve(data.data);
            else reject(data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }    
//Home Api

export const onHomeAPICall = (params: FormData | null | undefined) => {
    return _REQUEST2SERVER(`serviceSearch`, params, 'post');
  };

const APIWebCall = {
    onHomeAPICall,
   
  };
  
export default APIWebCall; 