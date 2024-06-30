import magasinier from "../models/Magasinier.js";
import magasinierData from "../models/Magasinier.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secret = 'test';
//Liste
export const getMagasinier = async (req, res) => {
  try {
    const allMagasinier = await magasinierData.find();
    res.status(200).json(allMagasinier);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
export const getMagasiniers = async (req, res) => {
    const { id } = req.params;

    try {
        const magasinier = await magasinierData.findById(id);

        res.status(200).json(magasinier);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
//Ajout
export const ajoutMagasinier = async (req, res) => {
  const magasinier = req.body;

  const newMagasinier = new magasinierData(magasinier);
  try {

    await newMagasinier.save();
    res.status(201).json(newMagasinier);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

//Sign in LOGIN
export const signin = async (req, res) => {
  const { mail_magasinier, mdp_magasinier } = req.body;

  try {
    const oldUser = await magasinierData.findOne({ mail_magasinier });

    if (!oldUser) return res.status(404).json({ message: "Magasinier n'exist pas" });

    const isPasswordCorrect = await bcrypt.compare(mdp_magasinier, oldUser.mdp_magasinier);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ mail_magasinier: oldUser.mail_magasinier, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
//Ajout Bcrypts


export const singup = async (req, res) => {
  const { matricule, nom, prenom, mail_magasinier, adresse_magasinier, magasin, mdp_magasinier } = req.body;


  try {
    const oldUser = await magasinierData.findOne({ mail_magasinier });

    if (oldUser) return res.status(400).json({ message: "Magasinier deja existé" });

    const hashedPassword = await bcrypt.hash(mdp_magasinier, 12);

    const result = await magasinierData.create({ mail_magasinier, mdp_magasinier: hashedPassword, name: `${nom} ${prenom}`, matricule, adresse_magasinier, magasin });
    const token = jwt.sign({ mail_magasinier: result.mail_magasinier, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};




//Supprimer
export const deleteMagasinier = async (req, res) => {
  const id = req.params.id;
  try {
    await magasinierData.findByIdAndRemove(id).exec();
    res.send("suprimer");
  } catch (error) {
    console.log(error);
  }
}
// Modifier

export const updateMagasinier = async (req, res, next) => {

  magasinier.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });

}
