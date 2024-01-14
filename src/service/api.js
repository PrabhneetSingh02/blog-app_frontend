import axios from 'axios';
import { API_NOTIFICATIONS_MESSAGES, SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({       //axios.create() creates a api
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config){
        return config;
    },  
    function (error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        //stop global loader here
        return processResponse(response);
    },
    function(error){
        //stop global loader here. in this project no loader till now
        return Promise.reject(processError(error));
    }
)

/////////////////////////////
// If success -> return { isSuccess: true, data: object }
// If fail -> return { isFailure: true, status: string, msg: string, code: int }
////////////////////////////

const processResponse = (response) => {
    if (response?.status === 200){
        return{ isSuccess: true, data: response.data };
    }
    else{
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

/////////////////////////////
// If success -> return { isSuccess: true, data: object }
// If fail -> return { isFailure: true, status: string, msg: string, code: int }
////////////////////////////
const processError = (error) => {
    if(error.response){
        // Request made and server responded with a status other 
        // that flaas out of the range of 2.x.x 
        console.log('ERROR IN RESPONSE: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATIONS_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if (error.request){
        // Request made but no respoonse was received
        console.log('ERROR IN REQUEST: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATIONS_MESSAGES.requestFailure,
            code: ""
        }

    } else{
        // Something happened in setting up request that triggered an error
        console.log('ERROR IN NETWORK: ', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATIONS_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

// console.log(SERVICE_URLS);

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function(progressEvent) {
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total )
                    showDownloadProgress(percentageCompleted);
                }
            }  
        })
}

export { API };