import mongoose from 'mongoose';
const adminSchema = mongoose.Schema({
    nom_utilisateur: String,
    prenom_utilisateur: String,
    mail_utilisateur: String,
    mdp_utilisateur: String
});

const admin = mongoose.model("Admin", adminSchema);
export default admin;