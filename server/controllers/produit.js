import produit from "../models/Produit.js";
import produitData from "../models/Produit.js";
//Liste
export const getProduit = async (req, res) => {
    try {
        const allProduit = await produitData.find();
        res.status(200).json(allProduit);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
//Ajout
export const ajoutProduit = async (req, res) => {
    const produit = req.body;

    const newProduit = new produitData(produit);
    try {
        await newProduit.save();
        res.status(201).json(newProduit);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
//Supprimer
export const deleteProduit = async (req, res) => {
    const id = req.params.id;
    try {
        await produitData.findByIdAndRemove(id).exec();
    res.send("suprimer");
    } catch (error) {
        console.log(error);
    }

}

export const updateProduit = async (req, res,next) => {

   produit.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
    
}