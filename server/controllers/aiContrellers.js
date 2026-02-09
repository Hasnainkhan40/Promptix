import { GoogleGenAI } from "@google/genai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateArticle = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!prompt || typeof prompt !== "string") {
      return res.json({ success: false, message: "Prompt is required." });
    }

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit reached. Please upgrade to premium.",
      });
    }

    // Clamp tokens (avoid insane values)
    const maxOutputTokens = Math.max(200, Math.min(Number(length) || 800, 4000));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens,
      },
    });

    const content = response?.text || "";

    if (!content) {
      return res.json({ success: false, message: "No content generated." });
    }

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    return res.json({ success: true, content });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}


export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (!prompt || typeof prompt !== "string") {
      return res.json({ success: false, message: "Prompt is required." });
    }

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit reached. Please upgrade to premium.",
      });
    }

    // Clamp tokens (avoid insane values)
    const maxOutputTokens = Math.max(200, Math.min(Number(length) || 800, 4000));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        max_tokens: 100,
      },
    });

    const content = response?.text || "";

    if (!content) {
      return res.json({ success: false, message: "No content generated." });
    }

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    return res.json({ success: true, content });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}


export const generateImage = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (!prompt || typeof prompt !== "string") {
      return res.json({ success: false, message: "Prompt is required." });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }
    
    const formData = new FormData()
    formData.append('prompt', prompt)
    await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType: "arraybuffer",
            })
                

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    return res.json({ success: true, content });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}

