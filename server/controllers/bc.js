import bc from "../models/Bc.js";
import bcData from "../models/Bc.js";
//Liste
export const getBc = async (req, res) => {
    try {
        const allBc = await bcData.find();
        res.status(200).json(allBc);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
//Ajout
export const ajoutBc = async (req, res) => {
    const bc = req.body;

    const newBc = new bcData(bc);
    try {
        await newBc.save();
        res.status(201).json(newBc);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
//Supprimer
export const deleteBc = async (req, res) => {
    const id = req.params.id;
    try {
        await bcData.findByIdAndRemove(id).exec();
        res.send("suprimer");
    } catch (error) {
        console.log(error);
    }
}
//update bc

export const updateBc = async (req, res, next) => {
const id= req.params.id;
const bc = req.body;
try {
    await bcData.findByIdAndUpdate(id,bc).exec();
    res.send("Modifier");
} catch (error) {
    console.log(error);
}

}