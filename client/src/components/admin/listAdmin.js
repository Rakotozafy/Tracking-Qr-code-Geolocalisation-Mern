/*eslint-disable*/
import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
//Tableau
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper';


import UpdateIcons from '@material-ui/icons/Update'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { withStyles, makeStyles } from '@material-ui/core/styles';

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
const useStyles = makeStyles(styles);


export default function ListAdmin({ ListAdmin, editer, deleteAdmin, tableHeaderColor }) {
  const classes = useStyles();
  const masks = ['nom_utilisateur', 'prenom_utilisateur', 'mail_utilisateur', 'mdp_utilisateur']
  const titre = ['Nom', 'Prenom', 'Mail', 'Mot de passe', 'Edition']
  return (

    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {titre !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {titre.map((mask, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {mask}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {ListAdmin.map((list, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {masks.map((mask, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {list[mask]}
                    </TableCell>

                  );
                })}
                <TableCell>
                  <IconButton aria-label="Suprimer" className={classes.margin} onClick={() => deleteAdmin(list._id)} >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="Edit" className={classes.margin} onClick={editer(list)} >
                    <UpdateIcons fontSize="small" />
                  </IconButton>


                </TableCell>
              </TableRow>
            );
          })}

        </TableBody>
      </Table>
    </div>

  )
}