import React, { useState } from 'react';

// Este es el Form con inputs dinamicos que armamos en el README.md de la teoria.

function DinamicInputs() {  
  const modeloFamiliar = { nombre: '' };

  const [familiar, setFamiliar] = useState([ //3 -> se modifica el estado, entonces provoca que se re-renderice el componente!!
    { ...modeloFamiliar },
  ]);

  const [persona, setPersona] = useState({
    nombre: '',
  });

  const agregaFamiliar = () => {  //2 --> se ejecuta esta fn!
      setFamiliar([...familiar, { ...modeloFamiliar }]); //Agrega un nuevo objeto al array del estado "familiar"
  };

  const handlePersonaChange = (e) => setPersona({
    ...persona,
    [e.target.name]: e.target.value,
  });

  const handleFamiliarChange = (e) => {  //7 --> ejecuta la fn!
    const familiares = [...familiar];
    console.log(familiar) //[{nombre: 'Ale'}]
    familiares[e.target.id][e.target.dataset.name] = e.target.value;
    console.log(e.target.dataset)
    setFamiliar(familiares); //8 --> cambia el estado familiar
  };

  const handleSubmit = e => {
    e.preventDefault()
    console.log(familiar)
  }

  return (  //4 -> A partir de acá de vuelve a renderizar  // 9 --> se re-renderiza!
    <form onSubmit={handleSubmit}>            
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        name="nombre"
        value={persona.nombre}
        onChange={handlePersonaChange}
      />  
      <input
        type="button"
        value="Agrega un Familiar"
        onClick={agregaFamiliar} // 1 --> Le dan click a este botón, se dispara la fn agregarFamiliar
      />
      {  //5 --> vuele a mapear el array del estado familiar
      familiar.map((el, i) => ( //[{}, {}, {}]
                                //  0   1   2
        <div key={`persona-${i}`}>
          <label htmlFor={`nombre-${i}`}> {`Familiar #${i + 1}`}</label>
          <input
              type="text"
              name={`nombre-${i}`}
              id={i}
              data-name="nombre"
              value={el.nombre}
              onChange={handleFamiliarChange}  //6 --> Si escribo algo en el input se dispara la fn handleFamiliarChange
          />
        </div>
      ))
      }
      <input type="submit" value="Submit" />        
    </form>   
  );
};

export default DinamicInputs;