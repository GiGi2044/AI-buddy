// OPENAI
//import OpenAI from "openai";
//import express from 'express'
//import cors from 'cors'
//import * as dotenv from 'dotenv'
//
//dotenv.config()
//
////Instantiating OpenAi
//const openai = new OpenAI({
//    apiKey: process.env.OPENAI_API_KEY
//})
//
//
////Setting up Express
//const app = express()
//app.use(cors())
//app.use(express.json())
//
//
////Setting up the routes
////get Route
//app.get('/', (req, res)=>{
//    res.status(200).send({
//        message:'Hello, this works fine'
//    })
//})
//
//
////Post Route
//app.post('/', async(req, res)=>{
//    try{
//        const prompt = req.body.prompt
//        const response = await openai.completions.create({
//            model: "gpt-3.5-turbo-instruct",
//            prompt: `${prompt}`,
//            temperature: 0,
//            max_tokens: 3000,
//            top_p: 1,
//            frequency_penalty: 0.5,
//            presence_penalty: 0
//        })
//        res.status(200).send({
//            bot: response.choices[0].text
//        })
//    }
//    catch(error){
//        console.log(error)
//        res.status(500).send({error})
//    }
//})
//
////Listen
//app.listen(3000, ()=>{
//    console.log("Server is running on Port http://localhost:3000")
//})

// Claude

import express from 'express';
import { config } from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

config(); // Loads .env variables

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0,
      system: "Respond only with brief but precise answers and only commenting the code and the code",
      messages: [{
        role: "user",
        content: [{
          type: "text",
          text: `${question}`
        }]
      }]
    });

    // Log the response to verify structure
    console.log(JSON.stringify(response, null, 2));

    // Check if the content array exists and has elements
    if (response.content && response.content.length > 0 && response.content[0].type === "text") {
      res.json({ answer: response.content[0].text });
    } else {
      throw new Error('No valid response content received');
    }
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    res.status(500).send({ error: 'Failed to fetch response from Anthropic.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
