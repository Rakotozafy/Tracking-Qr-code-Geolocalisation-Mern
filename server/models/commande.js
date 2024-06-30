import mongoose from 'mongoose';

const commandeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    produits: [
      {
        produit: { type: String, },
        nom_prod: { type: String, },
        qte: { type: Number, default: 1, },
      },
    ],
    magasin: { type: String, required: true },
    status: { type: String, default: "En cours" },
    date_bc: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);


const commande = mongoose.model("Commande", commandeSchema);
export default commande;