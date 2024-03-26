import { Request, Response } from "npm:express@4.18.2";
import { PeliculasModel } from "../db/Peliculas.ts";

export const getPelicula=async(req:Request, res:Response)=>{
    try {
       const nombre=req.req.params;
       const pelicula=await PeliculasModel.findOne({nombre}).exec();
       if(!pelicula){
        res.status(404).send("Pelicula no encontrada");
        return;
      }
      res.status(200).send({
        id:pelicula._id.toString(),
        nombre:pelicula.nombre,
        ubicacion:pelicula.ubicacion,
        reproduciendo:pelicula.reproduciendo,
        abierto:pelicula.abierto
      })
    } catch (error) {
        res.status(404).send(error.message);
        return;
    }
}