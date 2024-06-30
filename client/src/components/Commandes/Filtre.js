/*eslint-disable*/
import React, { useState, useEffect } from 'react';

export default function (rechercher,setFiltre) {
  
    return (
        <div>

            <select onChange={(e) => {
                setFiltre(e.target.value.length > 0)
                rechercher(e.target.value)
            }}>
                <option>
                    Confirmé
                </option>
                <option>
                    En cours
                </option>
            </select>

        </div>
    )
}
