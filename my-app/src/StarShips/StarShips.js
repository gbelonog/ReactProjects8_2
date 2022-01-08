import React, {useEffect, useState} from 'react';

export function StarShips(){
  const [status, setStatus] = useState('initial');
  const [error, setError] = useState(null);
  
  const [listOfPlanets, setListOfPlanets] = useState([]);
  const [page, setPage] = useState('"https://swapi.dev/api/planets/?page=1"');
  const [next, setNext] = useState('"https://swapi.dev/api/planets/?page=1"');
  const [previous, setPrevious] = useState('"https://swapi.dev/api/planets/?page=1"');

  useEffect(() => {
    let mountState = {
      isMount: true,
    };
  
    fetch(page.replace(/"/g,''))
      .then((res) => {
        console.log('---> Planets: res', res);
        return res.json();
      })
      .then((data) => {
        if (mountState.isMount) {
          console.log('---> Planets: data', data);
          setError(null); 
          setStatus('success');

          setListOfPlanets(JSON.stringify(data.results).split('},'));
          setNext(JSON.stringify(data.next));
          setPrevious(JSON.stringify(data.previous));   
       }
      })      
      .catch((error) => {
        if (mountState.isMount) {
          console.log('---> Planets: error', error);
          setError(error.message);
          setStatus('error');
        }
      })
    return () => {
      mountState.isMount = false;
    }
            

    },[page]);
    
    return (
      <div className="StarShips">
        {status === 'loading' || status === 'initial' ? (
          <div>Loading...</div>
        ) : (
          <div>
            {error === null ? ( <>  
              {(previous !== 'null') && (<button onClick={() => setPage(previous)}>previous1</button>)}
              {(previous !== 'null') && (<button onClick={() => setPage(previous)}>{(previous.replace(/"/g,'')).slice(previous.indexOf('='))}</button>)}
              
              <button>{(page.replace(/"/g,'')).slice(page.indexOf('='))}</button>

              {(next !== 'null') &&<button onClick={() => setPage(next)}>{(next.replace(/"/g,'')).slice(next.indexOf('='))}</button>}
              {(next !== 'null') &&<button onClick={() => setPage(next)}>next1</button>}
                          
              <div>
                
            
                <p></p>
                {listOfPlanets.map(e => {
                  return <div><hr></hr>{e.split(',').map(el => {return <li>{el}</li>})}</div>
                })}
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



