import mongoose from 'mongoose';

const commandeSchema = mongoose.Schema({
    numero_bc: String,
    magasin: String,
    name: String,
    creator: String,
    produit: { type: [String], default: [] },
    status_comm: { type: [String], default: 'En cours' },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    date_bc: {
        type: Date,
        default: new Date(),
    },

    // title: String,
    // message: String,
    // name: String,
    // creator: String,
    // tags: [String],
    // selectedFile: String,
    // likes: { type: [String], default: [] },
    // comments: { type: [String], default: [] },
    // createdAt: {
    //     type: Date,
    //     default: new Date(),
    // },
})

var BCommande = mongoose.model('Commande', commandeSchema);

export default BCommande;