/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import AjoutProduit from 'components/produit/ajoutProduit'
import ListProduit from 'components/produit/listProduit'
import { useHistory } from 'react-router'

import axios from 'axios';
import useStyles from 'styles.js';


export default function Produit() {
  const classes = useStyles();
  const history = useHistory()
  const [ListProduits, setListProduits] = useState([])

  //liste 
  useEffect(() => {
    axios.get('http://localhost:5000/produit').then((allProduit) => {
      setListProduits(allProduit.data);
    })
  }, []);
  //suprr
  const deleteProduit = async (id) => {
    let question = confirm("Vpfjdkslnl ")
    question ?
      await axios.delete(`http://localhost:5000/produit/${id}`).then(() => {
        setListProduits(ListProduits.filter(item => item._id !== id))
      }) :
      alert("tsy mety fafana")
  }

  const [edit, setEdit] = useState(
    {
      ref_prod: '',
      nom_prod: '',
      type_prod: '',
      unite_prod: '',
      etat_stock: '',
    }
  )

  const editer = (da) => (e) => {
    e.preventDefault()
    history.push(`/admin/Produit/${da._id}`)
    setEdit(da)
    setType('edition')
  }

  const remise = () => {
    setEdit(
      {
        ref_prod: '',
        nom_prod: '',
        type_prod: '',
        unite_prod: '',
        etat_stock: '',
      }
    )

    history.push('/admin/Produit/')
    document.getElementById('ref_prod').focus()
    setType('nouvel')
  }

  const [type, setType] = useState('nouvel')
  return (
    <div className="Produit">
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit" >
          <Typography className={classes.heding} variant="h2" align="center"  > Produit JIRAMA</Typography>


          <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="strect">

                <Grid item xs={12} sm={7}>
                  <AppBar className={classes.appBar} position="static" color="inherit" >


                    <ListProduit ListProduits={ListProduits} setListProduits={setListProduits} editer={editer} deleteProduit={deleteProduit} />

                  </AppBar>
                </Grid>

                <Grid item xs={12} sm={4} >
                  <AppBar className={classes.appBar} position="static" color="inherit" style={{ overflow: 'auto' }} >

                    <AjoutProduit type={type} edit={edit} setListProduits={setListProduits} ListProduits={ListProduits} remise={remise} />
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
