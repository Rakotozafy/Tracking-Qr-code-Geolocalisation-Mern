/*eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
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

import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';

import { Link } from 'react-router-dom';

import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#060f94',
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

export default function ListMagasinier({listMag, editer, deleteMagasinier}) {
  const classes = useStyles();
  const masks = ['matricule', 'name', 'mail_magasinier', 'adresse_magasinier']
 const titre = ['Matricule', 'Nom et prenom', 'Mail', 'Adresse']
 
  return (<>
   <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>

          <StyledTableRow>

            {titre.map((mask, i) => (
              <StyledTableCell key={i}>{mask}</StyledTableCell>
            ))}
            <StyledTableCell>Edition</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {listMag.map((mag, key) => (
            <StyledTableRow key={key}>
              {masks.map((mask, i) => (
                <StyledTableCell component="th" scope="row" key={i}>{mag[mask]}</StyledTableCell>
              ))}

              <StyledTableCell>

                <IconButton aria-label="Suprimer" className={classes.margin} onClick={() => deleteMagasinier(mag._id)} >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                {/* <IconButton aria-label="Edit" className={classes.margin} onClick={editer(mag)} >
                  <UpdateIcons fontSize="small" />
                </IconButton>
           */}
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
  </>
  );
}
