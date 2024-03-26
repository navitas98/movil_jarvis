// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { PeliculasModel } from "../db/Peliculas.ts";
export const alguna_pelicula_reproduciendo=async(
    req: Request,
    res: Response<boolean | { error: unknown }>
)=>{
    try {
        const pelicula=await PeliculasModel.find({reproduciendo:true}).exec();
        if(pelicula.length==0){
            res.status(200).send(false);
        }else{
            res.status(200).send(true)
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
}