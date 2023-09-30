import axios from "axios";

export const client = axios.create({
    baseURL: "https://outerbase-hackathon-server.onrender.com/",
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})