import livraisonData from "../models/livraison.js";
//Liste
export const getLivs = async (req, res) => {
    try {
        const livs = await livraisonData.find();
        res.status(200).json(livs);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getLiv = async (req, res) => {
    const { id } = req.params;

    try {
        const liv = await livraisonData.findById(id);
        // const mouv = liv.produits
        res.status(200).json(liv);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Ajout
export const ajoutMouvement = async (req, res) => {

    let strtodate = (str) => {
        let d = new Date();
        let st = str.split("/")
        d.setDate(st[0])
        d.setMonth(st[1] - 1)
        d.setFullYear(st[2])
        return d
    }

    let bd = req.body
    let produits = bd.produits
    produits.map(
        mouvement => {
            mouvement.mouvement.map(
                mv => {
                    let lst = Object.keys(mv)
                    lst.map(
                        r => {
                            if (r === "date_depart" || r === "date_arriver") {
                                mv[r] = strtodate(mv[r])
                            }
                        }
                    )
                }
            )
        }
    )


    // res.json(bd)

    await livraisonData.insertMany(bd).then(doc => res.json(doc)).catch(err => res.json(err))
}


export const updateMouvement = async (req, res, next) => {


    // livraisonData.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    //     if (err) return next(err);
    //     res.json(post);
    //     console.log('Mety')
    // });
     await livraisonData.findByIdAndUpdate(req.params.id,req.body,{new:true}).then(
            doc=>res.json(doc)
        ).catch(err=>res.json(err))

    // [hafa]

    // livraisonData.findOneAndUpdate({
    //     _id: new mongoose.Types.ObjectId(orderID),
    //     "produits._id": new mongoose.Types.ObjectId(mouvementDetails.produit)
    // },

    //     {
    //         // $set : { "produits.$.mouvement.$[v].status":mouvementDetails.status}
    //         "$set": {
    //             "produits.$.mouvement.$[inner].date_depart": mouvementDetails.date_depart,
    //             "produits.$.mouvement.$[inner].date_arriver": mouvementDetails.date_arriver,
    //             "produits.$.mouvement.$[inner].lng_depart": mouvementDetails.lng_depart,
    //             "produits.$.mouvement.$[inner].lng_arriver": mouvementDetails.lng_arriver,
    //             "produits.$.mouvement.$[inner].lat_depart": mouvementDetails.lat_depart,
    //             "produits.$.mouvement.$[inner].lat_arriver": mouvementDetails.lat_arriver,
    //         }

    //     },
    //     {
    //         arrayFilters: [{ "inner._id": mouvementDetails._id }],
    //         upsert: true,
    //         new: true
    //     })



    // {hafa}

    // await livraisonData.updateOne({
    //     userID: "njakakely",
    //     produits: { $elemMatch: { qte: 50 } }
    // },
    //     { $push: { "produits.$.mouvement": req.body.mouvement } },
    //     function (err, val) {
    //         if (err) return next(err);
    //         res.json(val);
    //         console.log('Mety')
    //     }

    // )



    // const { idp, idm, } = req.params
    // const { id } = req.params.id
    // const { date_arriver, date_depart, lng_depart, lng_arriver, lat_depart, lat_arriver } = req.body
    // livraisonData.update(
    //     {
    //         "_id": id,
    //         "produits": {
    //             "$elemMatch": {
    //                 idp,
    //                 "mouvement._id": idm
    //             }
    //         }
    //     }, {
    //     "$set": {
    //         "produits.$[outer].mouvement.$[inner].date_depart": date_depart,
    //         "produits.$[outer].mouvement.$[inner].date_arriver": date_arriver,
    //         "produits.$[outer].mouvement.$[inner].lng_depart": lng_depart,
    //         "produits.$[outer].mouvement.$[inner].lng_arriver": lng_arriver,
    //         "produits.$[outer].mouvement.$[inner].lat_depart": lat_depart,
    //         "produits.$[outer].mouvement.$[inner].lat_arriver": lat_arriver,
    //     }
    // },

    //     {
    //         "arrayFilters": [
    //             { "outer._id": idp },
    //             { "inner._id": idm }
    //         ]
    //     }, (err, result) => {
    //         if (err) {
    //             console.log('mess:' + err)
    //         } else {
    //             res.send(result)
    //             console.log('vita')
    //         }
    //     }
    // )





}


export const updateMouvement1 = async (req, res) => {
    const { id } = req.params;
    const { produits } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Mouvement with id: ${id}`);

    const updatedMouvement = { produits, _id: id };

    await livraisonData.findByIdAndUpdate(id, updatedMouvement, { new: true });

    res.json(updatedMouvement);
}
