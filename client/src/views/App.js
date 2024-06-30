/*eslint-disable*/
import React, { useRef, useState } from "react";
import axios from "axios";
import { arrayOf } from "prop-types";

const Test = () => {
  const url = "http://localhost:5000/mobile";
const [mouv , setMouv]= useState({
            qte: '',
            produit: '',
            nom_prod: '',
            mouvement: [

              {date_depart: null,
              date_arriver: null,
              lng_depart: null,
              lng_arriver: null,
              lat_depart: null,
              lat_arriver: null,}
            ]

})

  const [datas, setDatas] = useState({ });

  let id="626d31ee8155aa3748b80ef0"
  const listerlivraisons = async () => {
    await axios
      .get(`${url}/${id}`)
      .then((doc) => setDatas(doc.data))
      .catch((err) => console.log(err));
         let te = datas
      let et = te.produits
      setMouv(et)
  };

  const ajoutmouvement = async (e, b) => {
    let tmpdata = datas;
    let d = new Date();
    tmpdata.produits[1].mouvement=({
      date_depart: d.toISOString(),
      date_arriver: null,
      lng_depart: 12345678 ,
      lat_depart: 87654321,
      lng_arriver:null,
      lat_arriver :null,
    });
  await   axios
      .patch(`${url}/${tmpdata._id}`, tmpdata)
      .catch((err) => console.log(err));
      alert("Mety Depart")
  };

  const ajoutmouvement2 = async (e, b) => {
    let tmpdata = datas;
    let d = new Date();
    let data = datas
                
                 let z = data.produits[1]
    let x = z.mouvement
    let y = x[0]

    tmpdata.produits[1].mouvement=({
      date_depart: y.date_depart,
      date_arriver: d.toISOString(),
      lng_depart: y.lng_depart ,
      lng_arriver: 40000000,
      lat_depart: y.lat_depart,
      lat_arriver: 1111111
    });
  await   axios
      .patch(`${url}/${tmpdata._id}`, tmpdata)
      .catch((err) => console.log(err));
      alert("Mety arriver")
  };

    

  React.useEffect(() => {
    listerlivraisons();
    // console.log(mouv)
  }, [datas]);

  return (
  <div>
       <h4>Livraisons</h4>
       <hr />
   
             Magasin :{datas.magasin} - User : {datas.userId} | Nbr_produits:
            
             <div>
                 <button onClick={(e) => {

                let data = datas
                
                 let z = data.produits[1]
    let x = z.mouvement
    let y = x[0]
    console.log(y)

  
        if (y.date_depart === null & y.lat_depart === null & y.lng_depart===null  &  y.date_arriver === null & y.lat_arriver ===null & y.lng_arriver === null ){
    ajoutmouvement()
    }else if ( y.date_depart !== null & y.lat_depart !==null & y.lng_depart!==null   & y.date_arriver === null & y.lat_arriver === null & y.lng_arriver === null  ){
      //jerena
     ajoutmouvement2()
    }if(y.date_depart !== null & y.lat_depart !==null & y.lng_depart!==null & y.date_arriver !== null & y.lat_arriver !== null & y.lng_arriver!==null){
      alert('efa feno')
      console.log(y.date_arriver)
    }


   
             }    
                }>+</button>
               {/* <ul>
                 {mouv?.map((produit, b) => (
                  <li key={b}>
                    Produits : {produit.produit} | Nom du producteur :{" "}
                    {produit.nom_prod} |{" "}
                    <div>
                      <ul>
                        {produit?.mouvement.map((mv, c) => (
                          <li key={c}>
                            Depart: {mv.date_depart} à longitude:{" "}
                            {mv.lng_depart} / latitude: {mv.lat_depart} 
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul> */}
            </div>
    </div>
  );
};

export default Test;

// import React, { useRef, useState } from "react";
// import axios from "axios";

// const Test = () => {
//   const url = "http://localhost:5000/mobile/";

//   const [datas, setDatas] = useState({});
//   const [viewproduit, setViewproduit] = useState(-1) ;
//   const [mproduit, setmproduit] = useState({
//     produit: "",
//     nom_prod: "",
//     qte: "",
//     mouvement: []
//   });

//   const frmprod = useRef(null);
//   const chgfrmproduit = (m) => {
//     setmproduit({ ...mproduit, [m]: frmprod.current[m].value });
//   };

//   const ajoutproduit = async (e, x) => {
//     e.preventDefault();
//     let tmpdata = datas[x];
//     tmpdata.produits.push(mproduit);
//     await axios
//       .patch(`${url}/${tmpdata._id}`, tmpdata)
//       .catch((err) => console.log(err));
//   };

//   const formproduits = (x) => {
//     // modele form fanatsofohana produits
//     return (
//       <div style={{ backgroundColor: "#eee", padding: "5px", width: "350px" }}>
//         <h1>Insertion produits</h1>
//         <form
//           style={{ width: "177px" }}
//           ref={frmprod}
//           onSubmit={(e) => ajoutproduit(e, x)}
//         >
//           <input
//             autoFocus
//             required
//             type="text"
//             name="produit"
//             placeholder="produit..."
//             onChange={(e) => chgfrmproduit(e.currentTarget.name)}
//           />
//           <input
//             required
//             type="text"
//             name="nom_prod"
//             placeholder="nom_prod..."
//             onChange={(e) => chgfrmproduit(e.currentTarget.name)}
//           />
//           <input
//             type="number"
//             name="qte"
//             defaultValue={0}
//             onChange={(e) => chgfrmproduit(e.currentTarget.name)}
//           />

//           <button type="submit">ajouter</button>
//         </form>
//       </div>
//     );
//   };

//   const formmouvement = (x) => {
//     <form style={{ width: "300px" }}></form>;
//   };
// let id="626d31ee8155aa3748b80ef0"
//   const listerlivraisons = async () => {
//     await axios
//       .get(`${url}/${id}`)
//       .then((doc) => setDatas(doc.data))
//       .catch((err) => console.log(err));
//       let te = datas
//       let et = te.produits
//       setMouv(et)
//   };

//   const ajoutmouvement =  (e, b,) => {
//     let tmpdata = datas;
//     let d = new Date();
//     let x = tmpdata.produits[b]
//     let y = x.mouvement
//   y=({
//       date_depart: d.toISOString(),
//       date_arriver: d.toISOString(),
//       lng_depart: 40,
//       lng_arriver: 70,
//       lat_depart: 10,
//       lat_arriver: 20
//     });
//      axios
//       .patch(`${url}/${tmpdata._id}`, tmpdata)
//       .catch((err) => console.log(err));
//   };
//   const [mouv , setMouv]= useState()

//   React.useEffect(() => {
//     listerlivraisons();
//   }, [datas]);
  

//   return (
//     <div>
//       <h4>Livraisons</h4>
//       <hr />
   
//             Magasin :{datas.magasin} - User : {datas.userId} | Nbr_produits:
             
//             <div>
//               <ul>
//                 {mouv?.map((produit, b) => (
//                   <li key={b}>
//                     Produits : {produit.produit} | Nom du producteur :{" "}
//                     {produit.nom_prod} |{" "}
//                     <button onClick={(e) => ajoutmouvement(e ,b)}>+</button>
//                     <div>
//                       <ul>
//                         {produit.mouvement.map((mv, c) => (
//                           <li key={c}>
//                             Depart: {mv.date_depart} à longitude:{" "}
//                             {mv.lng_depart} / latitude: {mv.lat_depart}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//     </div>
//   );
// };

// export default Test;

// import React, { useState } from "react";

// const App = () => {
//   // PRODUITS
//   const [produits, setProduits] = useState([
//     { id: 0, nom_produit: "prd1", type: "electricite", unite:"metres", stock: 480 },
//     { id: 1, nom_produit: "prd2", type: "electricite",unite:"kg", stock: 90 },
//   ]);
//   // COMMANDE

//   const [commande, setCommande] = useState({
//     num_commande: 0,
//     // listes: [{ id: 0, nom_produit: "prd1", stock: 0 }],
//     listes: [],
//   });
//   // PASSER LA COMMANDE

//   const ajouterPanier = (e, id) => {
//     let pos = commande["listes"].findIndex(
//       (pr) => pr.nom_produit === produits[id].nom_produit
//     );
//     if (pos === -1) {
//       setCommande({
//         ...commande,
//         num_commande: "N°" + 1,
//         magasinier: "rakoto",
//         listes: [
//           ...commande.listes,
//           { ...produits[id], quantite: produits[id].stock },
//         ],
//       });
//     }
//   };

//   const supprimer = (i) => {
//     setCommande({
//       ...commande,
//       listes: commande.listes.filter((x) => x.id !== i),
//     });
//   };

//   const reduire = (e, ls) => {
//     setCommande({
//       ...commande,
//       listes: commande["listes"].map((uv) => {
//           if (uv.id === ls.id) {
//             return {
//               ...uv,
//               quantite: e.target.value,
//             };
//           }else{
//             return uv
//           }
//         })
//     });
//   };



//   const [babas, setBabas]=useState({depart:'', arrive:''})
//   const pointage = ()=>{
//     let i = 0;
//     let t = 20
    
//     if(babas.depart===''){
//       setBabas({
//         ...babas,
//         depart:i
//       })
//     }else if(babas.depart !==''){
//       setBabas({
//         ...babas,
//         arrive:t
//       })
//     }
//     if(babas.depart!=='' & babas.arrive!==''){
//       alert('efa feno')
//     }
//   }

//   return (
//     <>
//     <button onClick={()=>pointage()}>pointage</button>
//     {JSON.stringify(babas)}

//       {/* AFFICHAGE PRODUITS */}
//       <h3>Listes des produits</h3>
//       {produits.map((pr, index) => (
//         <p key={index}>
//           {JSON.stringify(pr)}
//           {"\t \t"}
//           <button
//             name={pr.nom_produit}
//             onClick={(e) => ajouterPanier(e, index)}
//           >
//             +
//           </button>
//         </p>
//       ))}
//       <hr />
//       {/* FAIRE LA COMMANDE */}
      
      
//       <h3>Commande</h3>
//       {/* {JSON.stringify(commande)} */}
      
//       Numero commande : {commande.num_commande}
//       <br />
//       Magasinier : {commande.magasinier}
//       <br />
      
//       Listes des commandes:
//       {/* {JSON.stringify(commande.listes)} */}
//       {commande["listes"].map((ls, i) => (
//         <p key={i}>
//           Id: {ls.id} - Produit: {ls.nom_produit} - Type: {ls.type} - Quantites: {ls.quantite + ' ' + ls.unite}
//           {"\t \t"}
//           <input
//             type="range"
//             min="1"
//             max={ls.stock}
//             value={ls.quantite}
//             onChange={(e)=>reduire(e, ls)}
//           />
//           {"\t \t"}
//           <button onClick={() => supprimer(ls.id)}>-</button>
//         </p>
//       ))}
//       <button>Enregistrer</button>

//     </>
//   );
// };

// export default App;
