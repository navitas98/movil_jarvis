// @deno-types="npm:@types/express@4"
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { nuevaPelicula } from "./resolvers/nuevaPelicula.ts";
import { reproducir_pelicula } from "./resolvers/reproducir_pelicula.ts";


const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/",(req:Request,res:Response)=>{res.send("funcionando")})
  .post("/pelicula",nuevaPelicula)
  .put("/reproducir_pelicula/:id",reproducir_pelicula)
  .put("/student/:id", async (req: Request, res: Response) => {})
  .delete("/teacher/:id", async (req: Request, res: Response) => {})
  .delete("/student/:id", async (req: Request, res: Response) => {})

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});