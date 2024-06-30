import mongoose from 'mongoose';
const boncommandeSchema = mongoose.Schema({
    numero_bc: String,
    magasinier: String,
    magasin: String,
    produit: { type: [String], default: [] },
    // produit: {
    //     nomProd:[String],
    //     type:[String],
    //     unite : [String],
    //     nombre: [Number]
    // },
    date_bc: {
        type: Date,
        default: new Date(),
    },
    status_comm: { type: [String], default:' cours' },
});

const boncommande = mongoose.model("Boncommande", boncommandeSchema);
export default boncommande;