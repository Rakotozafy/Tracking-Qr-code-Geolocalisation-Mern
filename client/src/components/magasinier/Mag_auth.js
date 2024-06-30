/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Select, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Icon from './icon';
import { signin, signup } from '../../redux/actions/magasinierActions';
import { AUTH_MAGASINIER } from '../../redux/constants/magasinierConstants';
import useStyles from './styles';
import Input from './Input';
import axios from 'axios';

import logo from "assets/img/jirama.png";

const initialState = { nom: '', prenom: '', adresse_magasinier: '', magasin: '', mail_magasinier: '', mdp_magasinier: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH_MAGASINIER, data: { result, token } });

      history.push('/commande');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  //Magasin

  const [magasinNom, setMagasinNom] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/magasin').then((allMagasin) => {
      setMagasinNom(allMagasin.data);
    })
  }, []);
  //fin
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
           <img className={classes.media} src={logo}  height='50px' />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Creer un compte' : 'Magasinier'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="matricule" label="Numero matricule" autoFocus handleChange={handleChange} />

                <Input name="nom" label="Nom" handleChange={handleChange} half />
                <Input name="prenom" label="Prenom" handleChange={handleChange} half />
                <Input name="adresse_magasinier" label="Addresse" handleChange={handleChange} />

                <Select
                  className={classes.text}
                  fullWidth
                  name="magasin"
                  label='magasin' value={form.magasin} onChange={(event) => {
                    setForm({ ...form, magasin: event.target.value })
                  }}
                >
                  {magasinNom.map((magasin, key) => (
                    <MenuItem key={key} value={magasin._id} >{magasin.nom_magasin} {magasin.adresse_magasin} </MenuItem>
                  ))}
                </Select>
              </>
            )}
            <Input name="mail_magasinier" label="Email " handleChange={handleChange} type="email" />
            <Input name="mdp_magasinier" label="Mot de passe" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeter votre mot de passe" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Creer un compte' : 'Connexion'}
          </Button>
          {/* <GoogleLogin
            clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          /> */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Vous avez un compte? Se connecté' : "Voulez  vous creer un compte? S'inscrire"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
