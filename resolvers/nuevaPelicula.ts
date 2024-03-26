// @deno-types="npm:@types/express@4"
import {PeliculasModelType, PeliculasModel} from "../db/Peliculas.ts"
import { Request,Response } from "express"
import {Peliculas} from "../types.ts";

export const nuevaPelicula=async(
    req: Request<{}, {}, PeliculasModelType>,
  res: Response<string | { error: unknown }>
)=>{
    try {
       
        const {nombre, ubicacion}=req.body;
        const peli=await PeliculasModel.findOne({nombre});
        if(peli){
            res.status(404).send({ error: "La pelicula ya existe" });
            return;
        }
        const pelicula=new PeliculasModel({
            nombre,
            ubicacion,
            reproduciendo:false,
            abierto:false
        });
      
        
        
        await pelicula.save();
        
        const peliculaResponse:Peliculas={
            id: pelicula._id.toString(),
            nombre:pelicula.nombre,
          ubicacion:pelicula.ubicacion,
          reproduciendo: pelicula.reproduciendo,
          abierto: pelicula.abierto,
          
        }
        res.status(201).json(peliculaResponse).send();
    } catch (error) {
        
        
        res.status(500).send(error)
    }
}