import axios from "axios"

export const client = axios.create({
	// production
	baseURL: "https://outerbase-hackathon-server.onrender.com/",
	// dev
	// baseURL: "http://localhost:7000/",

	headers: {
		"Access-Control-Allow-Origin": "*",
	},
})
