import { showLoader } from "./loader.js";

export const fetchData = async (url) => {
    showLoader();
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log(error)
    }
    
}
