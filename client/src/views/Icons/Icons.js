/*eslint-disable*/
import React, { useState } from "react";
// import { unstable_renderSubtreeIntoContainer } from "react-dom";
// import QRCode from "react-qr-code";
// import Produits from "./components/produits";

const Icons = () => {
  // PRODUITS
  const [produits, setProduits] = useState([
    { id: 0, nom_produit: "prd1", type: "electricite", unite:"metres", stock: 480 },
    { id: 1, nom_produit: "prd2", type: "electricite",unite:"kg", stock: 90 },
  ]);
  // COMMANDE

  const [commande, setCommande] = useState({
    num_commande: 0,
    // listes: [{ id: 0, nom_produit: "prd1", stock: 0 }],
    listes: [],
  });
  // PASSER LA COMMANDE

  const ajouterPanier = (e, id) => {
    let pos = commande["listes"].findIndex(
      (pr) => pr.nom_produit === produits[id].nom_produit
    );
    if (pos === -1) {
      setCommande({
        ...commande,
        num_commande: "N°" + 1,
        magasinier: "rakoto",
        listes: [
          ...commande.listes,
          { ...produits[id], quantite: produits[id].stock },
        ],
      });
    }
  };

  const supprimer = (i) => {
    setCommande({
      ...commande,
      listes: commande.listes.filter((x) => x.id !== i),
    });
  };

  const reduire = (e, ls) => {
    setCommande({
      ...commande,
      listes: commande["listes"].map((uv) => {
          if (uv.id === ls.id) {
            return {
              ...uv,
              quantite: e.target.value,
            };
          }else{
            return uv
          }
        })
    });
  };



  const [babas, setBabas]=useState({depart:'', arrive:''})
  const pointage = ()=>{
    let i = 0;
    if(babas.depart===''){
      setBabas({
        ...babas,
        depart:i
      })
    }else if(babas.depart !==''){
      setBabas({
        ...babas,
        arrive:i
      })
    }
    if(babas.depart!=='' & babas.arrive!==''){
      alert('efa feno')
    }
  }

  return (
    <>
    <button onClick={()=>pointage()}>pointage</button>
    {JSON.stringify(babas)}

      {/* AFFICHAGE PRODUITS */}
      <h3>Listes des produits</h3>
      {produits.map((pr, index) => (
        <p key={index}>
          {JSON.stringify(pr)}
          {"\t \t"}
          <button
            name={pr.nom_produit}
            onClick={(e) => ajouterPanier(e, index)}
          >
            +
          </button>
        </p>
      ))}
      <hr />
      {/* FAIRE LA COMMANDE */}
      
      
      <h3>Commande</h3>
      {/* {JSON.stringify(commande)} */}
      
      Numero commande : {commande.num_commande}
      <br />
      Magasinier : {commande.magasinier}
      <br />
      
      Listes des commandes:
      {/* {JSON.stringify(commande.listes)} */}
      {commande["listes"].map((ls, i) => (
        <p key={i}>
          Id: {ls.id} - Produit: {ls.nom_produit} - Type: {ls.type} - Quantites: {ls.quantite + ' ' + ls.unite}
          {"\t \t"}
          <input
            type="range"
            min="1"
            max={ls.stock}
            value={ls.quantite}
            onChange={(e)=>reduire(e, ls)}
          />
          {"\t \t"}
          <button onClick={() => supprimer(ls.id)}>-</button>
        </p>
      ))}
      <button>Enregistrer</button>

    </>
  );
};

export default Icons;
