import express from 'express';
import mongoose from 'mongoose';

import Boncommande from '../models/Boncommande.js';

const router = express.Router();

export const getBoncommandes = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Boncommande.countDocuments({});
        const boncommandes = await Boncommande.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: boncommandes, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getBoncommandeBySearch = async (req, res) => {
    const { searchQuery, produit } = req.query;

    try {
        const numero_bc = new RegExp(searchQuery, "i");

        const boncommandes = await Boncommande.find({ $or: [ { numero_bc }, { produit: { $in: produit.split(',') } } ]});

        res.json({ data: boncommandes });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getBoncommandeByCreator = async (req, res) => {
    const { magasinier,magasin } = req.query;

    try {
        const boncommandes = await Boncommande.find({ magasinier,magasin });

        res.json({ data: boncommandes });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getBoncommande = async (req, res) => { 
    const { id } = req.params;

    try {
        const boncommande = await Boncommande.findById(id);
        
        res.status(200).json(boncommande);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createBoncommande = async (req, res) => {
    const boncommande = req.body;

    const newBoncommande = new Boncommande({ ...boncommande, magasinier: req.userId, date_bc: new Date().toISOString() })

    try {
        await newBoncommande.save();

        res.status(201).json(newBoncommande);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateBoncommande = async (req, res) => {
    const { id } = req.params;
    const { numero_bc, magasin, magasinier, produit,status_comm } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedBoncommande = { magasinier, numero_bc, magasin, produit,status_comm, _id: id };

    await Boncommande.findByIdAndUpdate(id, updatedBoncommande, { new: true });

    res.json(updatedBoncommande);
}

export const deleteBoncommande = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Boncommande.findByIdAndRemove(id);

    res.json({ message: "Bon commande supprimer avec succes." });
}

export const likeBoncommande = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ magasin: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No commande with id: ${id}`);
    
    const boncommande = await Boncommande.findById(id);

    const index = boncommande.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      boncommande.likes.push(req.userId);
    } else {
      boncommande.likes = boncommande.likes.filter((id) => id !== String(req.userId));
    }

    const updatedBoncommande = await Boncommande.findByIdAndUpdate(id, boncommande, { new: true });

    res.status(200).json(updatedBoncommande);
}

export const commentBoncommande = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const boncommande = await Boncommande.findById(id);

    boncommande.comments.push(value);

    const updatedBoncommande = await Boncommande.findByIdAndUpdate(id, boncommande, { new: true });

    res.json(updatedBoncommande);
};

export default router;