import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectcloudinary from "./config/cloudinary.js";

const app = express();

await connectcloudinary();
// app.use((req, res, next) => {
//   console.log("HIT =>", req.method, req.url);
//   next();
// });

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("ROOT_OK"));

app.use(requireAuth())

app.use("/api/ai", requireAuth(), aiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port", PORT));
