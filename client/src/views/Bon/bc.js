/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import AjoutBc from 'components/bc/ajoutBc'
import List from 'components/bc/listProd'
import { useHistory } from 'react-router'

import axios from 'axios';
import useStyles from 'styles.js';


export default function Bc() {
    const classes = useStyles();
    const history = useHistory()
    const [ListBc, setListBc] = useState([])
    const [listProd , setListProd]=useState([])

    //liste produit 
    useEffect(() => {
        axios.get('http://localhost:5000/produit').then((allProduit) => {
            setListProd(allProduit.data);
        })
    }, []);

//     // PASSER LA COMMANDE
//     const [commande, setCommande] = useState({
//     num_commande: 0,
//     // listes: [{ id: 0, nom_produit: "prd1", stock: 0 }],
//     listes: [],
//   });

//   const ajouterPanier = (e, id) => {
//     let pos = commande["listes"].findIndex(
//       (pr) => pr.nom_prod === listProd[id].nom_prod
//     );
//     if (pos === -1) {
//       setCommande({
//         ...commande,
//         num_commande: "N°" + 1,
//         magasinier: "rakoto",
//         listes: [
//           ...commande.listes,
//           { ...listProd[id], quantite: listProd[id].etat_stock },
//         ],
//       });
//     }
//   };

//add

const [add,setAdd]=useState(
    {ref_prod :'',
    nom_prod: '',
    type_prod: '',
    unite_prod :'',
    etat_stock : '',}
)
const adds = (da) => (e) => {
    e.preventDefault()
    history.push(`/admin/bc/${da._id}`)
    setAdd(da)
  }

   const rem = () => {
    setAdd(
         {ref_prod :'',
    nom_prod: '',
    type_prod: '',
    unite_prod :'',
    etat_stock : '',}

    )

    history.push('/admin/BC/')
    document.getElementById('ref_prod').focus()
  }

    //suprr
    // const deleteBc = async (id) => {
    //     let question = confirm("Voulez vous supprimer? ")
    //     question ?
    //         await axios.delete(`http://localhost:5000/bc/${id}`).then(() => {
    //             setListBc(ListBc.filter(item => item._id !== id))
    //         }) :
    //         alert("Annulation effectuer")
    // }

    const [edit, setEdit] = useState(
        {
            numero_bc: '',
            magasinier: '',
            magasin: '',
            produit: [],
            // produit: {
            //     nomProd: '',
            //     type: '',
            //     unite: '',
            //     nombre: ''
            // },
            date_bc: '',

        }
    )

    const editer = (da) => (e) => {
        e.preventDefault()
        history.push(`/admin/Bc/${da._id}`)
        setEdit(da)
        setType('edition')
    }

    const remise = () => {
        setEdit(
            {
                numero_bc: '',
                magasinier: '',
                magasin: '',
                produit:[],
                // produit: {
                //     nomProd: '',
                //     type: '',
                //     unite: '',
                //     nombre: ''
                // },
                date_bc: '',

            }
        )

        history.push('/admin/Bc/')
        document.getElementById('numero_bc').focus()
        setType('nouvel')
    }

    const [type, setType] = useState('nouvel')

// PASSER LA COMMANDE
    const [commande, setCommande] = useState({
    listes: [],
  });

  const ajouterPanier = (e, _id) => {
    let pos = commande["listes"].findIndex(
      (pr) => pr.nom_prod === listProd[_id].nom_prod
    );
    if (pos === -1) {
      setCommande({
        ...commande,
        listes: [
          ...commande.listes,
          { ...listProd[_id], quantite: listProd[_id].etat_stock },
        ],
      });
    }
  };

  const supprimer = (i) => {
    setCommande({
      ...commande,
      listes: commande.listes.filter((x) => x._id !== i),
    });
  };

  const reduire = (e, ls) => {
    setCommande({
      ...commande,
      listes: commande["listes"].map((uv) => {
          if (uv._id === ls._id) {
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


    return (
        <div className="Bc">
            <Container maxWidth="lg">
                <AppBar className={classes.appBar} position="static" color="inherit" >
                    <Typography className={classes.heding} variant="h2" align="center"  > Bon de commande JIRAMA</Typography>


                    <Grow in>
                        <Container>
                            <Grid container justify="space-between" alignItems="strect">

                                <Grid item xs={12} sm={7}>
                                    <AppBar className={classes.appBar} position="static" color="inherit" >


                                        <List commande={commande} reduire={reduire} supprimer={supprimer} ajouterPanier={ajouterPanier} listProd={listProd} setListProd={setListProd} adds={adds} />

                                    </AppBar>
                                </Grid>

                                <Grid item xs={12} sm={4} >
                                    <AppBar className={classes.appBar} position="static" color="inherit" style={{ overflow: 'auto' }} >

                                        <AjoutBc adds={adds} add={add} type={type} edit={edit} rem={rem} listProd={listProd} setListProd={setListProd} remise={remise} commande={commande} reduire={reduire} supprimer={supprimer} />

                                    </AppBar>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grow>
                </AppBar>
            </Container>

        </div>
    )
}