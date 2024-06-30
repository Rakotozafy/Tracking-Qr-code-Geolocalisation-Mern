/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


import Listmagasinier from 'components/magasinier/listMagasinier.js';
import Ajoutmagasinier from 'components/magasinier/ajoutMagasinier.js';

import axios from 'axios';
import { useHistory, useParams } from 'react-router'
import useStyles from 'styles.js';

export default function Magasinier() {
  const { id } = useParams()
  const classes = useStyles();
  const history = useHistory()
  const [listMag, setListMag] = useState([])
  //liste 
  useEffect(() => {
    axios.get('http://localhost:5000/magasinier').then((allMagasinier) => {
      setListMag(allMagasinier.data);
    })
  }, []);
  //Suprimer
  const deleteMagasinier = async (id) => {
    let question = confirm("Vpfjdkslnl ")
    question ?
      await axios.delete(`http://localhost:5000/magasinier/${id}`).then(() => {
        setListMag(listMag.filter(item => item._id !== id))
      }) :
      alert("tsy mety fafana")
  }
  //Modifier
  const [magasinier, setMagasinier] = useState(
    {
      matricule: '',
      nom_magasinier: '',
      prenom_magasinier: '',
      mail_magasinier: '',
      adresse_magasinier: '',
      magasin: '',
      mdp_magasinier: ''
    }
  )

  const editer = (da) => (e) => {
    e.preventDefault()
    history.push(`/admin/Magasinier/${da._id}`)
    setMagasinier(da)
    setType('edition')
  }

  const remise = () => {
    setMagasinier(
      {
        matricule: '',
        nom_magasinier: '',
        prenom_magasinier: '',
        mail_magasinier: '',
        adresse_magasinier: '',
        magasin: '',
        mdp_magasinier: ''
      }
    )
    history.push('/admin/Magasinier/')
    document.getElementById('matricule').focus()
    setType('nouvel')
  }

  const [type, setType] = useState('nouvel')

  return (
    <div className="Magasinier">
      <Container maxWidth='xl'>
        <AppBar className={classes.appBar} position="static" color="inherit" >
          <Typography className={classes.heding} variant="h2" align="center"  >
            Magasinier JIRAMA

          </Typography>

          <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="strect">

                {/* <Grid item xs={12} sm={6}>
                  <AppBar className={classes.appBar} position="static" color="inherit" >

                    <Ajoutmagasinier type={type} setMagasinier={setMagasinier} magasinier={magasinier} setListMag={setListMag} remise={remise} listMag={listMag} />

                  </AppBar>
                </Grid> */}

                <Grid item xs={12} sm={12} >
                  <AppBar className={classes.appBar} position="static" color="inherit" >
                    <Listmagasinier deleteMagasinier={deleteMagasinier} setListMag={setListMag} listMag={listMag} editer={editer} del />
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