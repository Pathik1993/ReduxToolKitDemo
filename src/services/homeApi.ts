import  { onHomeAPICall } from "../common/useAPiCall";
import { setImage_path, setIsLoading, setSearchArr } from "../reducer/homeReducer";

export const homeScreenAPI = (data: FormData | null | undefined) => async (dispatch: (arg0: any) => void) => {    
    try {
    const response =  await onHomeAPICall(data);
    dispatch(setIsLoading(false));
    dispatch(setSearchArr(response?.data?.data));
    dispatch(setImage_path('http://192.168.1.201:7777/spibo/storage/'));
    } catch (error) {
    console.error('Error fetching data: ', error);
    }
   };
