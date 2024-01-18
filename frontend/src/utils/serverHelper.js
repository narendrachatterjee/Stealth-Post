import {backendUrl} from "./config";

export const makeUnauthenticatedPostRequest = async (route,body) =>{
    try{
        const response = await fetch(backendUrl +""+ route, {
            method : "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const formattedResponse = await response.json();
        return formattedResponse;
    }catch(error){
        console.log(error);
    }
};

export const makeUnauthenticatedGetRequest = async (route) =>{
    try{
        const response = await fetch(backendUrl +""+ route, {
            method : "GET",
            headers:{
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const formattedResponse = await response.json();
        return formattedResponse;
    }catch(error){
        console.log(error);
    }
};

export const makeForgotPasswordRequest = async (route,body) =>{
    try{
        const response = await fetch(backendUrl +""+ route, {
            method : "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const formattedResponse = await response.json();
        return formattedResponse;
    }catch(error){
        console.log(error);
    }
};
