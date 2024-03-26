// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Peliculas } from "../types.ts";
import { PeliculasModel } from "../db/Peliculas.ts";
export const mostrarPeliculas=async(
    req: Request,
    res: Response<Peliculas[] | { error: unknown }>
)=>{
    try {
        const pelicula=await PeliculasModel.find({}).exec();
        const peliculaResponse=await Promise.all(
            pelicula.map((peli)=>({
                id:peli._id.toString(),
                nombre:peli.nombre,
                ubicacion:peli.ubicacion,
                reproduciendo:peli.reproduciendo,
                abierto:peli.abierto
            }))
        )
        res.status(200).json(peliculaResponse).send();
    } catch (error) {
        res.status(500).send(error);
    }
}