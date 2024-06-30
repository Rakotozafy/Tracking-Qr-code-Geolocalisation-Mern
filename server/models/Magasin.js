import mongoose from 'mongoose';
const magasinSchema = mongoose.Schema({

    nom_magasin:{type: String},
    adresse_magasin: {type: String},
    province: {type : String},
    lng: {type:Number},
    lat: {type:Number},

});

const magasin = mongoose.model("Magasin", magasinSchema);
export default magasin;