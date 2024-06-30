import mongoose from 'mongoose';
const produitSchema = mongoose.Schema({

    ref_prod : String,
    nom_prod: String,
    type_prod: String,
    unite_prod : String,
    etat_stock : String,
});

const produit = mongoose.model("Produit", produitSchema);
export default produit;