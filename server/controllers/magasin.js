import magasin from "../models/Magasin.js";
import magasinData from "../models/Magasin.js";
//Liste
export const getMagasin = async (req, res) => {
    try {
        const allMagasin = await magasinData.find();
        res.status(200).json(allMagasin);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const getMagasins = async (req, res) => {
    const { id } = req.params;

    try {
        const magasin = await magasinData.findById(id);

        res.status(200).json(magasin);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
//Ajout
export const ajoutMagasin = async (req, res) => {
    const magasin = req.body;

    const newMagasin = new magasinData(magasin);
    try {
        await newMagasin.save();
        res.status(201).json(newMagasin);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
//Supprimer
export const deleteMagasin = async (req, res) => {
    const id = req.params.id;
    try {
        await magasinData.findByIdAndRemove(id).exec();
    res.send("suprimer");
    } catch (error) {
        console.log(error);
    }

}
//Modifier
export const updateMagasin = async (req, res,next) => {

   magasin.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
    
}
