import mongoose from 'mongoose';
const bcSchema = mongoose.Schema({
    numero_bc: String,
    magasinier: String,
    magasin: String,
    produit : [String],
    // produit: {
    //     nomProd:[String],
    //     type:[String],
    //     unite : [String],
    //     nombre: [Number]
    // },
    date_bc: Date
});

const bc = mongoose.model("Bc", bcSchema);
export default bc;