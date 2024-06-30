import express from 'express';
import mongoose from 'mongoose';
// import asyncHandler from 'express-async-handler'

import CommandeModel from '../models/commande.js';
import Produit from '../models/Produit.js'

const router = express.Router();

export const getCommandes = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await CommandeModel.countDocuments({});
        const commandes = await CommandeModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: commandes, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getCommande = async (req, res) => {
    const { id } = req.params;

    try {
        const commande = await CommandeModel.findById(id);

        res.status(200).json(commande);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCommande = async (req, res) => {
    const commande = req.body;

    const newCommandeModel = new CommandeModel({ ...commande, userId: req.userId, date_bc: new Date().toISOString(), status: "En cours" })

    try {
        await newCommandeModel.save();

        res.status(201).json(newCommandeModel);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
//vaovao

export const updateCommande = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const commande = await CommandeModel.findById(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Commande with id: ${id}`);

    const updatedCommande = { status, _id: id };

    await CommandeModel.findByIdAndUpdate(id, updatedCommande, { new: true });

    res.json(updatedCommande);

    // if (req.body.status === "Confirmé") {
    //     commande.produits.forEach(async (o) => {
    //         await updateStock(o.product, o.qte);
    //     });
    // } commande.produits = req.body.status;
}

// //updateStatus
// export const updateStatus = async (req, res) => {
//     const { id } = req.params;
//     const { value } = req.body;

//     const commande = await CommandeModel.findById(id);

//     commande.status.push(value);

//     const updated = await CommandeModel.findByIdAndUpdate(id, commande, { new: true });

//     res.json(updated);
// };

export const deleteCommande = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Commande with id: ${id}`);

    await CommandeModel.findByIdAndRemove(id);

    res.json({ message: "Commande deleted successfully." });
}

// Stock
async function updateStock(id, qte) {
// export const updateStock = async (id, qte) => {
    const product = await Produit.findById(id);

    product.etat_stock -= qte;

    await product.save({ validateBeforeSave: false });
}


export default router;