import "dotenv/config";
import axios from "axios";

export const getOpenAIAPIResponse = async (message) =>{
    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            // BODY
            {
                model: "openai/gpt-oss-20b",
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]
            },
            // Request HEADERS
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {
        console.error(error.response?.data || error.message);
        // res.status(500).json({
        //     error: "Something went wrong"
        // });
        throw error;
    }
};  