import mongoose from 'mongoose';

const livraisonSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        produits: [
            {
                produit: { type: String, },
                nom_prod: { type: String, },
                qte: { type: Number, default: 1, },
                mouvement: [
                    {
                        date_depart: { type: Date, default:  null },
                        date_arriver: { type: Date, default: null },
                        lng_depart: { type: Number, default: null },
                        lng_arriver: { type: Number, default: null },
                        lat_depart: { type: Number, default: null },
                        lat_arriver: { type: Number, default: null },

                    }
                ]

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


const livraison = mongoose.model("Livraison", livraisonSchema);
export default livraison;