import { Request, Response } from "npm:express@4.18.2";
import { PeliculasModel } from "../db/Peliculas.ts";
export const reproduciendo=async(req:Request, res:Response)=>{
    try {
        
        const pelicula=await PeliculasModel.findOne({reproduciendo:true}).exec();
        
        
        
       if(pelicula){
        console.log(pelicula.nombre);
      res.status(200).send({
        id:pelicula._id.toString(),
        nombre:pelicula.nombre,
        ubicacion:pelicula.ubicacion,
        reproduciendo:pelicula.reproduciendo,
        abierto:pelicula.abierto
      })}
      else{
        console.log("no hay ninguna pelicula reproduciendose");
        
        res.status(200).send(false)
      }
    } catch (error) {
        res.status(404).send(error.message);
        return;
    }
}