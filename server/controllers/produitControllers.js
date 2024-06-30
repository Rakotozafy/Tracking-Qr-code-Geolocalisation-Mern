//  const produit = require('../models/Produit');
import Produit from "../models/Produit.js";

 export const getAllProduits = async(req,res) => {
     try{
         const produits = await Produit.find({});
         res.json(produits)
     }catch(error){
         console.error(error);
         res.status(500).json({message:"Server Error"});
     }
 }

 export const getProduitById = async(req,res) => {
     try{
         const produit = await Produit.findById(req.params.id);
         res.json(produit)
     }catch(error){
         console.error(error);
         res.status(500).json({message:"Server Error"});
     }
 }

//  module.exports= {
//      getAllProduits,
//      getProduitById,
//  }