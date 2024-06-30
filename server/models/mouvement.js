import mongoose from 'mongoose';

const mouvementSchema = new mongoose.Schema(
    {
       
                        date_depart: { type: Date },
                        date_arriver: { type: Date },
                        lng_depart: { type: Number },
                        lng_arriver: { type: Number },
                        lat_depart: { type: Number },
                        lat_arriver: { type: Number },

    }
);


const mouvement = mongoose.model("Mouvement", mouvementSchema);
export default mouvement;