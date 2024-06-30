/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
//Tableau
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Ic
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import UpdateIcons from '@material-ui/icons/Update';


import { Link } from 'react-router-dom';

import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#060f94' ,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Magasin({magasinList, editerMagasin,deleteMagasin}) {
  const classes = useStyles();
 
  
  // const editerMagasin=(tepr)=>(e)=>{
  //   alert('test')
  //   // history.push(`/admin/Magasin/${data._id}`)
  // }

//Modifier
  const modifierMagasin = (id) => {
    axios.put(`http://localhost:5000/magasin/${id}`).then(() => {
      // window.location.reload(false);
    })
  }


  // useEffect(() => {
  //   axios.get('http://localhost:5000/magasin').then((allMagasin) => {
  //     setMagasinList(allMagasin.data);
  //   })
  // }, []);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nom Magasin</StyledTableCell>
            <StyledTableCell align="right">Adresse magasin</StyledTableCell>
            <StyledTableCell align="right">Province</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {magasinList.map((magasin, key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">{magasin.nom_magasin}</StyledTableCell>
              <StyledTableCell align="right">{magasin.adresse_magasin}</StyledTableCell>
              <StyledTableCell align="right">{magasin.province}</StyledTableCell>
              <StyledTableCell align="right">
                <button onClick={editerMagasin(magasin)}>test</button>
                <IconButton aria-label="delete" className={classes.margin} onClick={() => deleteMagasin(magasin._id)} >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                {/* <IconButton aria-label="delete" className={classes.margin} onClick={() => editerMagasin(magasin)} >
                  <UpdateIcons fontSize="small" />
                </IconButton> */}
                   {/* <Link to={`/admin/Magasin/${magasin._id}`} class="btn btn-success">Edit</Link>&nbsp; */}
                   
               
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}
