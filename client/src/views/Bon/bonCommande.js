/*eslint-disable*/
import React from 'react';
import useStyles from 'styles.js';
import BCommande from 'components/BCommande/BCommande';

export default function bonCommande() {
const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    return (
        <div>
            <BCommande />
{/* {JSON.stringify(user.result.role)} */}
        </div>
    )
}