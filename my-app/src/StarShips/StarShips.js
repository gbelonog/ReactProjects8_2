import React, {useEffect, useState} from 'react';

export function StarShips(){
  const [status, setStatus] = useState('initial');
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState('');
  const [rotationPeriod, setRotationPeriod] = useState(''); 
  const [orbitalPeriod, setOrbitalPeriod] = useState(''); 
  const [diameter, setDiameter] = useState('');
  const [climate, setClimate] = useState('');
  const [gravity, setGravity] = useState('');
  const [terrain, setTerrain] = useState('');
  const [surfaceWater, setSurfaceWater] = useState('');
  const [population, setPopulation] = useState(''); 
  const [residents, setResidents] = useState([]);
  const [films, setFilms] = useState([]);
  const [created, setCreated] = useState('');
  const [edited, setEdited] = useState('');
  const [url, setUrl] = useState('');

  const [isHiddenNextButton, setIsHiddenNextButton] = useState(false);
  const [isHiddenPreviousButton, setIsHiddenPreviousButton] = useState(false);

  useEffect(() => {
    let mountState = {
      isMount: true,
    };

    fetch(`https://swapi.dev/api/planets/${pageNumber}`)
      .then((res) => {
        console.log('---> StarShips: res', res);
        return res.json();
      })
      .then((data) => {
        if (mountState.isMount) {
          console.log('---> StarShips: data', data);
          setError(null); 
          setStatus('success');
         
          setData(JSON.stringify(data));
          setName(JSON.stringify(data.name));
          setRotationPeriod(JSON.stringify(data.rotation_period));
          setOrbitalPeriod(JSON.stringify(data.orbital_period));
          setDiameter(JSON.stringify(data.diameter));
          setClimate(JSON.stringify(data.climate));
          setGravity(JSON.stringify(data.gravity));
          setTerrain(JSON.stringify(data.terrain));
          setSurfaceWater(JSON.stringify(data.surfaceWater));
          setPopulation(JSON.stringify(data.population));
          setResidents(JSON.stringify(data.residents));
          setFilms(JSON.stringify(data.films));
          setCreated(JSON.stringify(data.created));
          setEdited(JSON.stringify(data.edited));
          setUrl(JSON.stringify(data.url));
          if(pageNumber === 1) { 
            setIsHiddenNextButton(true)
          }else{
            setIsHiddenNextButton(false)}
          if(pageNumber === 60) { 
            setIsHiddenPreviousButton(true) 
          } else { setIsHiddenPreviousButton(false) }    
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
            

    },[pageNumber]);
    
    return (
      <div className="StarShips">
        {status === 'loading' || status === 'initial' ? (
          <div>Loading...</div>
        ) : (
          <div>
            {error === null ? ( <>
              {!isHiddenNextButton && (<button onClick={() => setPageNumber((pageNumber > 1)? pageNumber - 1 : pageNumber)}>previous</button>)}
              {!isHiddenNextButton && (
                <button onClick={() => setPageNumber((pageNumber > 1)? pageNumber - 1 : pageNumber)}>
                  {(pageNumber > 1)? pageNumber - 1 : pageNumber}
                </button>)}
              <button onClick={() => setPageNumber(pageNumber)}>{pageNumber}</button>
              {!isHiddenPreviousButton && (<button onClick={() => setPageNumber((pageNumber < 60)? pageNumber + 1 : pageNumber)}>{(pageNumber < 60)? pageNumber + 1 : pageNumber}</button>)}
              {!isHiddenPreviousButton && (<button onClick={() => setPageNumber((pageNumber < 60)? pageNumber + 1 : pageNumber)}>next</button>)}
              <div>
                {data}
                <div>name:{name}</div>
                <div>rotation_period: {rotationPeriod}</div>
                <div>orbital_period: {orbitalPeriod}</div>
                <div>diameter: {diameter}</div>
                <div>climate: {climate}</div>
                <div>gravity: {gravity}</div>
                <div>terrain: {terrain}</div>
                <div>surface_water: {surfaceWater}</div>
                <div>population: {population}</div>
                <div>residents: {residents}</div>
                <div>films: {films}</div>
                <div>created: {created}</div>
                <div>edited: {edited}</div>
                <div>url: {url}</div>                
              </div>
                </>
             ) : (
               <span style={{ color: 'red' }}>{error}</span>
             )
          }  
          </div>
        )}
      </div>
    )
    }



