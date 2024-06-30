import express from 'express';
import mongoose from 'mongoose';

import MouvementModel from '../models/mouvement.js';
// import { mouvement } from './mobile.js';

const router = express.Router();
export const getMouvements = async (req, res) => {
    try {
        const allMouvement = await MouvementModel.find();
        res.status(200).json(allMouvement);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const getMouvement = async (req, res) => {
    const { id } = req.params;

    try {
        const mouvement = await MouvementModel.findById(id);

        res.status(200).json(mouvement);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMouvement = async (req, res) => {
    const mouvement = req.body;

    const newMouvementModel = new MouvementModel({ ...mouvement, status: "En route" })

    try {
        await newMouvementModel.save();

        res.status(201).json(newMouvementModel);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateMouvement = async (req, res) => {
    const { id } = req.params;
    const {  produits } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Mouvement with id: ${id}`);

    const updatedMouvement = {  produits, _id: id };

    await MouvementModel.findByIdAndUpdate(id, updatedMouvement, { new: true });

    res.json(updatedMouvement);
}


export const deleteMouvement = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Mouvement with id: ${id}`);

    await MouvementModel.findByIdAndRemove(id);

    res.json({ message: "Mouvement deleted successfully." });
}


export default router;