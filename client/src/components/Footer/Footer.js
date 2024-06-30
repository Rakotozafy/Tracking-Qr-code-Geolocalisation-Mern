/*eslint-disable*/
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";
// loggout
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionTypes';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  //logout
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    window.location.reload(false);
    setUser(null);
  };

  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>

        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="https://www.jirama.mg"
              target="_blank"
              className={classes.a}
            >
              Jirama
            </a>
            , Tous droits réservés.

            <Link
              onClick={logout}
              className={classes.dropdownItem}
            >
              Deconnexion
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
}
