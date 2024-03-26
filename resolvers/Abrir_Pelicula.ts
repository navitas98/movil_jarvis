// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import {Peliculas} from "../types.ts"
import {PeliculasModelType, PeliculasModel} from "../db/Peliculas.ts"
export const abrir=async(
    req: Request<{ id: string }, {}, PeliculasModelType>,
    res: Response<Peliculas| { error: unknown }>
)=>{
    const id=req.params.id;
    try {
         //Detecta si no hay ninguna pelicula reproduciendo
         
         const peli=await PeliculasModel.find({reproduciendo:true});
         if(peli.length==0){
             res.status(404).send({ error: "No hay ninguna pelicula reproduciendose" });
                 return;
         }

        const pelicula=await PeliculasModel.findById(
            id,{reproduciendo:true},{new:true, runValidators:true}
        )
        if(!pelicula){
            res.status(404).send({ error: "Nombre de la pelicula no encontrado" });
            return;
        }
        const peliculaResponse:Peliculas={
            id: pelicula._id.toString(),
            nombre:pelicula.nombre,
            ubicacion:pelicula.ubicacion,
            reproduciendo: pelicula.reproduciendo,
            abierto: pelicula.abierto,  
        }
        res.status(200).json(peliculaResponse).send();

    } catch (error) {
        res.status(500).send(error);
    }
}