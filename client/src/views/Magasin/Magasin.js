/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import AjoutMagasin from 'components/magasin/ajoutMagasin'
import ListMagasin from 'components/magasin/listMagasin'
import Maps from 'components/magasin/Maps';
import { useHistory } from 'react-router'

import axios from 'axios';
import useStyles from 'styles.js';


export default function Magasin() {
  const classes = useStyles(); const history = useHistory()
  const [lists, setLists] = useState([])

  //liste 
  useEffect(() => {
    axios.get('http://localhost:5000/magasin').then((allMagasin) => {
      setLists(allMagasin.data);
    })
  }, []);
  //suprr
  const deleteMagasin = async (id) => {
    let question = confirm("Voulez vous supprimer  ?")
    question ?
      await axios.delete(`http://localhost:5000/magasin/${id}`).then(() => {
        setLists(lists.filter(item => item._id !== id))
      }) :
      alert("Operation annuler")
  }

  const [edit, setEdit] = useState(
    { nom_magasin: '', adresse_magasin: '', province: '', lng: '', lat: '' }
  )

  const editer = (da) => (e) => {
    e.preventDefault()
    history.push(`/admin/Magasin/${da._id}`)
    setEdit(da)
    setType('edition')
  }

  const remise = () => {
    setEdit(
      { nom_magasin: '', adresse_magasin: '', province: '', lng: '', lat: '' }

    )

    history.push('/admin/Magasin/')
    document.getElementById('nom_magasin').focus()
    setType('nouvel')
  }

  const [type, setType] = useState('nouvel')

  //Map


  const [mapme, setMapme] = useState(
    { nom_magasin: '', adresse_magasin: '', province: '', lng: '', lat: '' }
  )

  const [coord, setCoord] = useState({
    lat: '',
    lng: ''
  })
  const afficher = (data) => (e) => {
    e.preventDefault()
    history.push(`/admin/Magasin/${data._id}`)
    setMapme(data)
  }
  return (
    <>
      <div className="Magasin">
        <Container maxWidth="xl">
          <AppBar className={classes.appBar} position="static" color="inherit" >
            <Typography className={classes.heding} variant="h2" align="center"  > Magasin JIRAMA</Typography>


            <Grow in>
              <Container>
                <Grid container justify="space-between" alignItems="strect">

                  <Grid item xs={12} sm={7}>
                    <AppBar className={classes.appBar} position="static" color="inherit" >


                      <ListMagasin lists={lists} setLists={setLists} editer={editer} deleteMagasin={deleteMagasin} afficher={afficher} />

                    </AppBar>
                  </Grid>

                  <Grid item xs={12} sm={4} >
                    <AppBar className={classes.appBar} position="static" color="inherit" >

                      <AjoutMagasin coord={coord} type={type} edit={edit} setLists={setLists} lists={lists} remise={remise} />
                    </AppBar>
                  </Grid>


                </Grid>
              </Container>
            </Grow>
          </AppBar>
        </Container>
      </div>


      <div className="Map">

        <Maps mapme={mapme} coord={coord} setCoord={setCoord} />
      </div>
    </>
  )
}


