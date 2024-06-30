/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import AjoutAdmin from 'components/admin/ajoutAdmin'
import List from 'components/admin/listAdmin'
import { useHistory } from 'react-router'

import axios from 'axios';
import useStyles from 'styles.js';

//tableau

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


export default function Admin() {
  const classes = useStyles();
  const history = useHistory()
  const [ListAdmin, setListAdmin] = useState([])

  //liste 
  useEffect(() => {
    axios.get('http://localhost:5000/admin').then((allAdmin) => {
      setListAdmin(allAdmin.data);
    })
  }, []);
  //suprr
  const deleteAdmin = async (id) => {
    let question = confirm("Voulez vous supprimer? ")
    question ?
      await axios.delete(`http://localhost:5000/admin/${id}`).then(() => {
        setListAdmin(ListAdmin.filter(item => item._id !== id))
      }) :
      alert("Annulation effectuer")
  }

  const [edit, setEdit] = useState(
    {
      nom_utilisateur: '',
      prenom_utilisateur: '',
      mail_utilisateur: '',
      mdp_utilisateur: '',
    }
  )

  const editer = (da) => (e) => {
    e.preventDefault()
    history.push(`/admin/Admin/${da._id}`)
    setEdit(da)
    setType('edition')
  }

  const remise = () => {
    setEdit(
      {
        nom_utilisateur: '',
        prenom_utilisateur: '',
        mail_utilisateur: '',
        mdp_utilisateur: '',
      }
    )

    history.push('/admin/Admin/')
    document.getElementById('nom_utilisateur').focus()
    setType('nouvel')
  }

  const [type, setType] = useState('nouvel')
  return (
    <div className="Admin">
      <Container maxWidth="xl">
        <AppBar className={classes.appBar} position="static" color="inherit" >
          <Typography className={classes.heding} variant="h2" align="center"  > </Typography>


          <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="strect">

                {/* <Grid item xs={12} sm={7}> */}
                  <GridItem xs={12} sm={8}>


                    <Card>
                      <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Administrateur </h4>
                        <p className={classes.cardCategoryWhite}>
                          Liste des administrateur de cette Application
                        </p>
                      </CardHeader>
                      <CardBody>
                        <List tableHeaderColor="warning" ListAdmin={ListAdmin} setListAdmin={setListAdmin} editer={editer} deleteAdmin={deleteAdmin} />
                      </CardBody>
                    </Card>


                  </GridItem>

                {/* </Grid> */}
             
                  
                <Grid item xs={12} sm={4} >
                  <AppBar className={classes.appBar} position="static" color="inherit" style={{ overflow: 'auto' }} >

                    <AjoutAdmin type={type} edit={edit} setListAdmin={setListAdmin} ListAdmin={ListAdmin} remise={remise} />

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