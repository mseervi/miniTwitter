import axios from "axios";
import config from "../config/config.js";

const apiKey = config.ZEROBOUNCE_API_KEY;

export const verifyEmailAddress = async (email) => {
try {
    const response = await axios.get(`https://api.zerobounce.net/v2/activity?api_key=${apiKey}&email=${email}`)

    if(!response.data.found) return {
        isData: false,
        message: "Invalid Email Id!. Please check you email"
    }

    if(response.data.found) return {
        isData: true,
        message: "Email is verified"
    }
} catch (error) {
    return {
        isData: false,
        Error: `Invalid API key: ${error.message}`
    }
}
}