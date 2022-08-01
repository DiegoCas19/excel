import React from 'react'


export const Data2 = ({excelData}) => {
    return ((((excelData.filter(valor=>valor.Equipo==="River")).map((data) => data.nombre))

    .reduce((acc, persona) => {
        acc[persona.nombre] = ++acc[persona.nombre] || 0;
        return acc;
      }, {}))

      .filter((persona) => {
        return persona[persona.nombre];
      }))


  
    
    .map((valor)=>
        <tr >
        
        <th>{valor.Nombre}</th>
        <th>{valor.Edad}</th>
        <th>{valor.Equipo}</th>
        <th>{valor.Estado}</th> 
        
       
    
        </tr>        
    )
}