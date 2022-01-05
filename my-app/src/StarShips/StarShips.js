import React, {useEffect, useState} from 'react';

export function StarShips(){
  const [status, setStatus] = useState('initial');
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    let mountState = {
      isMount: true,
    };

    fetch(`https://swapi.dev/api/starships/`)
      .then((res) => {
        console.log('---> StarShips: res', res);
        return res.json()
      })
      .then((data) => {
        console.log('data in fetch', data);
        if (mountState.isMount) {
          setError(null);
          setStatus('success');
          setData(data.results);
        }
      })
      .catch((error) => {
        if (mountState.isMount) {
          console.log('---> StarShips: error', error);
          setError(error.message);
          setStatus('error');
          setData(null);
        }
      })
    
    return () => {
      mountState.isMount = false;
    }
    },[]);
    console.log('data', data);
    return (
      <div className="StarShips">
        {status === 'loading' || status === 'initial' ? (
          <div>Loading...</div>
        ) : (
          <div>
            {error === null ? (
              <div>test
                {data.map(e=>{
                  return <div key={e.name}>
                  <div>Name: {e.name}</div>
                  <div>Model: {e.model}</div>
                  <div>MGLT: {e.MGLT}</div>
                  <div>Cargo capacity: {e.cargo_capacity}</div>
                  <div>Consumables: {e.consumables}</div>
                  <div>Cost in credits: {e.cost_in_credits}</div>
                  <div>Сreated: {e.сreated}</div>
                  <div>Сrew: {e.crew}</div>
                  <div>Edited: {e.edited}</div>
                  <div>Hyperdrive rating: {e.hyperdrive_rating}</div>
                  <div>Length: {e.length}</div>
                  <div>Manufacturer: {e.manufacturer}</div>
                  <div>Max atmosphering speed: {e.max_atmosphering_speed}</div>
                  <div>Passengers: {e.passengers}</div>
                  <div>Starship class: {e.starship_class}</div>
                  <div>url: {e.url}</div>
                  <div>Films: {e.films.map((e,i) => {return <li key={i}>{e}</li>})}</div>
                  <div>Pilots: {e.pilots.map((e,i) => {return <li key={i}>{e}</li>})}</div>
                  <hr/>
                  </div>
                  })}
              </div>
              
            ) : (
              <span style={{ color: 'red' }}>{error}</span>
            )}
          </div>
        )}
      </div>
    );
  }



