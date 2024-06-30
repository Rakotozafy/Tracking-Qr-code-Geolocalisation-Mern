import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from './routes/admin.js';
import magasinRoutes from './routes/magasin.js';
import magasinierRoutes from './routes/magasinier.js';
import produitRoutes from './routes/produit.js';
import userRouter from "./routes/user.js";
import commandeRoutes from "./routes/commandes.js"
import bcRoutes from './routes/bc.js'
import livraisonRouter from './routes/livraisons.js'
import mobileRouter from './routes/mobile.js'
import mouvementRouter from './routes/mouvement.js'
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use('/magasin', magasinRoutes);
app.use('/magasinier',magasinierRoutes);
app.use('/admin', adminRoutes);
app.use('/produit',produitRoutes);
app.use('/commandes',commandeRoutes)
app.use('/livraisons',livraisonRouter)
app.use("/user", userRouter);
app.use('/bc', bcRoutes);
app.use('/mobile',mobileRouter)

app.use('/mouvement',mouvementRouter)

const CONNECTION_URL = 'mongodb://127.0.0.1:27017/jirama';
// const CONNECTION_URL = 'mongodb+srv://js_mastery:M6WfDnJEoj9HkV2d@practice.jto9p.mongodb.net/memories_app?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewURLParser: true, useUnifiedTopology: true
}).then(() => app.listen(PORT, () =>
    console.log(`Connection demarrer sur le port  : ${PORT}`)
)).catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);