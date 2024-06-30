import express from 'express';
import mongoose from 'mongoose';

import BCommande from '../models/bCommande.js';

const router = express.Router();

export const getCommandes = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await BCommande.countDocuments({});
        const commandes = await BCommande.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: commandes, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getCommandesBySearch = async (req, res) => {
    const { searchQuery, produit } = req.query;

    try {
        const numero_bc = new RegExp(searchQuery, "i");

        const commandes = await BCommande.find({ $or: [ { numero_bc }, { produit: { $in: produit.split(',') } } ]});

        res.json({ data: commandes });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getCommandesByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const commandes = await BCommande.find({ name });

        res.json({ data: commandes });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getCommande = async (req, res) => { 
    const { id } = req.params;

    try {
        const commande = await BCommande.findById(id);
        
        res.status(200).json(commande);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCommande = async (req, res) => {
    const commande = req.body;

    const newBCommande = new BCommande({ ...commande, creator: req.userId, date_bc: new Date().toISOString() })

    try {
        await newBCommande.save();

        res.status(201).json(newBCommande);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCommande = async (req, res) => {
    const { id } = req.params;
    const { numero_bc, magasin, creator, status_comm, produit } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Commande with id: ${id}`);

    const updatedCommande = { creator, numero_bc, magasin, produit, status_comm, _id: id };

    await BCommande.findByIdAndUpdate(id, updatedCommande, { new: true });

    res.json(updatedCommande);
}

export const deleteCommande = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Commande with id: ${id}`);

    await BCommande.findByIdAndRemove(id);

    res.json({ message: "Commande deleted successfully." });
}

export const likeCommande = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Commande with id: ${id}`);
    
    const commande = await BCommande.findById(id);

    const index = commande.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      commande.likes.push(req.userId);
    } else {
      commande.likes = commande.likes.filter((id) => id !== String(req.userId));
    }

    const updatedCommande = await BCommande.findByIdAndUpdate(id, commande, { new: true });

    res.status(200).json(updatedCommande);
}

export const commentCommande = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const commande = await BCommande.findById(id);

    commande.comments.push(value);

    const updatedCommande = await BCommande.findByIdAndUpdate(id, commande, { new: true });

    res.json(updatedCommande);
};

export default router;