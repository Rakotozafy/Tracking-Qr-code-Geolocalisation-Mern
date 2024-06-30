/*eslint-disable*/
import React, { useEffect, useState } from 'react';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import List from "@material-ui/icons/List";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import LocalShipping from "@material-ui/icons/LocalShipping"


import ShoppingCart from "@material-ui/icons/ShoppingCart"
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
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

import { bugs, website, server } from "variables/general.js";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from 'axios';
import Info from 'components/Typography/Info';
import { useHistory } from 'react-router-dom';
import Maps from 'components/Dashboard/maps'


const useStyles = makeStyles(styles);

export default function Dashboard() {
    const classes = useStyles();
    const history = useHistory

    const [lists, setListMagasin] = useState([])
    const [magasinier, setMag] = useState([])
    const [liv, setLiv] = useState({})
    const [commande, setCommande] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/magasin').then((allMagasin) => {
            setListMagasin(allMagasin.data);
        })
        axios.get('http://localhost:5000/magasinier').then((res) => {
            setMag(res.data)
        })
        axios.get('http://localhost:5000/livraisons').then((res) => {
            let x = res.data
            let y = x.data
            setLiv(y)
        })
        axios.get('http://localhost:5000/commandes').then((res) => {
            let x = res.data
            let y = x.data
            setCommande(y)
        })

    }, []);

    const isa = (e) => {
        return Number(lists.length)
    }
    const nbMag = (e) => {
        return Number(magasinier.length)
    }
    const nbLiv = (e) => {
        return Number(liv.length)
    }
    const nbCom = (e) => {
        return Number(commande.length)
    }
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="warning" stats icon  >
                            <CardIcon color="warning">
                                <Store />
                            </CardIcon>
                            <p className={classes.cardCategory}>Nombre Magasin</p>
                            <h2 className={classes.cardTitle}>
                                <big>{isa()}</big>
                            </h2>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Info>
                                    <List />
                                </Info>
                                <a href='magasin' >
                                    Voir list
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <ShoppingCart />
                            </CardIcon>
                            <p className={classes.cardCategory}>Nombre commande</p>
                            <h2 className={classes.cardTitle}>{nbCom()}</h2>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Info>
                                    <List />
                                </Info>
                                <a href='commande' >
                                    Voir list
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="danger" stats icon>
                            <CardIcon color="danger">
                                <LocalShipping />
                            </CardIcon>
                            <p className={classes.cardCategory}>Nombre livraison</p>
                            <h2 className={classes.cardTitle}>{nbLiv()}</h2>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Info>
                                    <List />
                                </Info>
                                <a href='livraison' >
                                    Voir list
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <Accessibility />
                            </CardIcon>
                            <p className={classes.cardCategory}>Total Magasinier</p>
                            <h2 className={classes.cardTitle}>{nbMag()}</h2>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Info>
                                    <List />
                                </Info>
                                <a href='magasinier' >
                                    Voir list
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>

            <div className='map'>

                <Maps />
            </div>

        </div>
        
    )
}
