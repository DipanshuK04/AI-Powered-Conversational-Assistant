import express from "express";
import "dotenv/config";
import cors from "cors";
import axios from "axios";
import mongoose from "mongoose";
import chatRoute from "./routes/chat.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api",chatRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port", process.env.PORT);
    connectDB();
});

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with database");
    } catch (error) {
        console.log("Connection Refused",error);
    }
}




// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//     apiKey: process.env.GROQ_API_KEY,
//     baseURL: 'https://api.groq.com/openai/v1',
// });

// const response = await client.responses.create({
//     model: 'openai/gpt-oss-20b',
//     input: 'Joke related to Computer Science',
// });

// console.log(response.output_text);