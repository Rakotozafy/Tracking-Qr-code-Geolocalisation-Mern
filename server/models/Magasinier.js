import mongoose from 'mongoose';
const magasinierSchema = mongoose.Schema({

    matricule: { type: String  },
    name: { type: String  },
    mail_magasinier: { type: String  },
    adresse_magasinier: { type: String  },
    magasin: { type: String  },
    mdp_magasinier: { type: String  },

  role: {
        type: String,
        default: "magasinier",
    },
})

const magasinier = mongoose.model("Magasinier", magasinierSchema);
export default magasinier;
