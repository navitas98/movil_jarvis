import mongoose from "mongoose"
import {Peliculas} from "../types.ts"

const Schema=mongoose.Schema;
const PeliculasSchema=new Schema({
    nombre:String,
    ubicacion:String,
    reproduciendo:String,
    abierto:String
})
export type PeliculasModelType=mongoose.Document&Omit<Peliculas,"id">
export const PeliculasModel=mongoose.model<PeliculasModelType>("Peliculas",PeliculasSchema);