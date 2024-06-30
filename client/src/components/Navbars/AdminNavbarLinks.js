/*eslint-disable*/
import React, { useState, useEffect } from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Cart from "@material-ui/icons/ShoppingCart"

// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

//import nom

import { AppBar, Typography, Toolbar, Avatar, Input } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'
//logout
import * as actionType from '../../constants/actionTypes';

//Count action
import { useSelector } from "react-redux";
//produit liste
import { getProduits as listProduits } from 'redux/actions/produitActions';
import axios from "axios";

const useStyles = makeStyles(styles);



export default function AdminNavbarLinks() {
  //count
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const count = () => {
    return Number(cartItems.length)
  }

  //Nom admin
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  // const classes = useStyles();

  const logout = () => {
    localStorage.clear();
    window.location.reload(false);
    setUser(null);
  };

  const roles = user.result.role

  //nostification
  const { commandes, isLoading } = useSelector((state) => state.commandes);
  const [status0] = "En cours "
  const [filtre, setFiltre] = useState(false)
  const [filtrer, setFiltrer] = useState(false)

  //liste 
  useEffect(() => {
    const results = commandes.flat().filter(item => {
      const etat = item.status.toLowerCase()
      const term = status0.toLowerCase()
      return etat.indexOf(term) > -1
    })
    setFiltre(status0.length > 0)
    setFiltrer(results)
  }, [commandes, setFiltrer]);


  const notifications = (e) => {
    return Number((filtre ? filtrer : commandes).length)
  }

  const openCommande = (e) => {
    history.push('commande')
    setOpenNotification(null);
  }
  // useEffect(() => {
  //   const token = user?.token;

  //   if (token) {
  //     const decodedToken = decode(token);

  //     if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  //   }

  //   setUser(JSON.parse(localStorage.getItem('profile')));
  // }, [location]);

  //farany nom



  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const dash = (e) => {
    history.push('/')
  }
  const carts = (e) => {
    history.push("/client/cartScreen")
  }

  return (
    <div>

      <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        onClick={dash}
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>
      {/* Cart */}
      {roles === 'magasinier' ?

        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
          onClick={carts}
        >
          <Cart className={classes.icons} />
          <span className={classes.notifications}> {count()} </span>

          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Panier

            </p>
          </Hidden>
        </Button> : <Hidden mdUp implementation="css">

        </Hidden>

      }
      {/* farany cart  */}

      <div className={classes.manager}>
        {roles === 'admin' ?
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openNotification ? "notification-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickNotification}
            className={classes.buttonLink}
          >
            <Notifications className={classes.icons} />
            {notifications() === 0 ?
              ''
              :
              <span className={classes.notifications}  > {notifications()} </span>
            }


            <Hidden mdUp implementation="css">
              <p onClick={handleCloseNotification} className={classes.linkText}>
                Notification
              </p>
            </Hidden>
          </Button> : <Hidden mdUp implementation="css">          </Hidden>
        }

        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={openCommande}
                      className={classes.dropdownItem}
                    >

                      {notifications() === 0 ?
                        'Aucun nouveau commande'
                        :
                        <span   > Vous avez {notifications()} nouveaux commandes </span>
                      }
                    </MenuItem>

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >


          <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>


        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >


                      <Typography className={classes.userName} variant="h5">{user?.result.name}</Typography>

                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Settings
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={logout}
                      className={classes.dropdownItem}
                    >
                      Deconnexion

                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
