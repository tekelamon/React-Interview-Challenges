/**
 * 1. Style the modal component:
 *      - The ".modal-overlay" div should fill the entire page and overlay all content on the page.
 *      - The ".modal" div should be centered within the .modal-overlay.
 *
 * 2. Using the provided grid html. Layout the grid to be 3 grid-items in a row
 *    with a 24px gap between.
 *
 * 3. Make an HTTP request using PEOPLE_URL and pass that data to the <Grid /> component.
 *    Loop over the provided data and create a grid-item for each item. Display the name for each.
 *
 * 4. Create a search bar to query `PEOPLE_URL?search=[search value]` and re-populate the grid
 *    with those results.
 *    e.g. Search: PEOPLE_URL?search=Luke
 *
 */
import "./index.css";
import { PEOPLE_URL } from "./constants";
import { useState, useEffect } from "react";

export default function App() {
  // hold state for changing data
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");

  // get all people from api endpoint
  useEffect(()=>{
    const getData = async () => {
      try {
        const response = await fetch(PEOPLE_URL);
        const result = await response.json();
        // the only relevant portion of data is stored in 'results'
        setPeople( result.results );
      } catch (err) {
        console.error( err );
      }
    };
    getData();
  },[]);

  // when a new search is made, try to get a new query with the given text
  const trySearch = async ( query ) => {
    try {
      const response = await fetch(`${PEOPLE_URL}?search=${query}`);
      const result = await response.json();
      setPeople( result.results );
    } catch (err) {
      console.error( err );
    }
  };

  return (
    <div className="App">
      Hello There<br/>

      {/*<Modal />*/}

      <div id="searchbar">
        <input type="text"
          id="searchtext"
          placeholder="Search"
          value={ search }
          onChange={ e => setSearch( e.target.value ) }
        />
        
        <input type="submit"
          id="searchbtn"
          value="Go!"
          onClick={ () => trySearch( search ) }
        />
      </div>

      <Grid people={ people } />
    </div>
  );
}

function Modal() {
  return (
    <>
      <div className="modal-overlay" />
      <div className="modal">Modal Div</div>
    </>
  );
}

function Grid({ people }) {
  return (
    <div className="grid">
      {
        people.length !== 0
          && 
        people.map( ( person, i ) => {
          return <div key={i} className="grid-item">{person.name}</div>;
        })
      }
    </div>
  );
}