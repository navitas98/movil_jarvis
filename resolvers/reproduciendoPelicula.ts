import { Request, Response } from "npm:express@4.18.2";
import { PeliculasModel } from "../db/Peliculas.ts";
export const reproduciendo=async(req:Request, res:Response)=>{
    try {
        const nombre=req.params.id;
        const pelicula=await PeliculasModel.findOne({reproduciendo:true}).exec();
       if(pelicula){
      res.status(200).send({
        id:pelicula._id.toString(),
        nombre:pelicula.nombre,
        ubicacion:pelicula.ubicacion,
        reproduciendo:pelicula.reproduciendo,
        abierto:pelicula.abierto
      })}
      else{
        res.status(200).send(false)
      }
    } catch (error) {
        res.status(404).send(error.message);
        return;
    }
}