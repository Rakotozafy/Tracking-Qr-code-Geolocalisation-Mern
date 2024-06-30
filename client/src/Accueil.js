/*eslint-disable*/
import React from 'react'
import { Link } from 'react-router-dom'

import Auth from 'components/Auth/Auth';
import Mag from 'components/magasinier/Mag_auth'

import CustomTabs from "components/CustomTabs/CustomTabs.js";
import BugReport from "@material-ui/icons/Lock";
import Code from "@material-ui/icons/Code";
// core components

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import { Container, AppBar, Typography, Grow, Grid, Modal, Button, Box } from '@material-ui/core';

// Image

import Image from 'assets/img/sidebar-2.jpg';

import useStyles from './styles';
import { Alert, AlertTitle } from '@material-ui/lab';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Accueil() {
 const user = JSON.parse(localStorage.getItem('profile'));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="Accueil">
      <Container maxWidth="xl">
        <Typography className={classes.heding} variant="h3" align="center"  > Tracking code</Typography>
        <AppBar className={classes.appBar} position="static" color="inherit" >
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>


              <AppBar className={classes.appBar} position="static" color="inherit" >
        
                <img src={Image} height="590px" width="600px"/>

              </AppBar>

            </GridItem>
            <Grow in>

              <GridItem xs={12} sm={12} md={6} >
                <CustomTabs
                  title="Authentification:"
                  headerColor="warning"
                  tabs={[
                    {
                      tabName: "Administrateur",
                      tabIcon: BugReport,
                      tabContent: (
                        <Auth />
                      ),
                    },
                    {
                      tabName: "Magasinier",
                      tabIcon: Code,
                      tabContent: (
                        <Mag />
                      ),
                    },

                  ]}
                />
              </GridItem>
            </Grow>

          </GridContainer>
        </AppBar>
      </Container>
    </div>
  )
}
