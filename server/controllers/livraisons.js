import express from 'express';
import mongoose from 'mongoose';
// import asyncHandler from 'express-async-handler'

import LivraisonModel from '../models/livraison.js';

const router = express.Router();

export const getLivraisons = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await LivraisonModel.countDocuments({});
        const livraisons = await LivraisonModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: livraisons, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getLivraison = async (req, res) => {
    const { id } = req.params;

    try {
        const livraison = await LivraisonModel.findById(id);

        res.status(200).json(livraison);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createLivraison = async (req, res) => {
    const livraison = req.body;
    const newLivraisonModel = new LivraisonModel({ ...livraison, status: "En attente" })

    try {
        await newLivraisonModel.save();

        res.status(201).json(newLivraisonModel);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
//vaovao

export const updateLivraison = async (req, res) => {
    const { id } = req.params;
    const { produits } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Livraison with id: ${id}`);

    const updatedLivraison = { produits, _id: id };

    await LivraisonModel.findByIdAndUpdate(id, updatedLivraison, { new: true });

    res.json(updatedLivraison);
}

// //Mobile 
// //update mouvement
// export const mouvement = async (req, res) => {
//     const { id } = req.params;
//     const { value } = req.body;

//     const livraison = await LivraisonModel.findById(id);

//     livraison.produits.mouvement.push(value);

//     const updated = await LivraisonModel.findByIdAndUpdate(id, livraison, { new: true });

//     res.json(updated);
// };

export const deleteLivraison = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Livraison with id: ${id}`);

    await LivraisonModel.findByIdAndRemove(id);

    res.json({ message: "Livraison deleted successfully." });
}


export default router;