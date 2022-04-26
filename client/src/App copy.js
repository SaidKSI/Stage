import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [salam, setSalam] = useState("");
  const [nameError, setNameError] = useState(false);
 
   
  const url = "http://localhost:8000/salam";

  function onNameChange(event) {
    setName(event.target.value);
  }

  async function btnClick(event) {
    try {
      let salamResponse = await axios.post(url + "?name=" + name, { age: 12 });
      setNameError(false);

      let data = salamResponse.data;

      setSalam(data.message);
    } catch (err) {
      setNameError(true);
    }
  }

  return (
    <div>
      <p>Name</p>
      <input type="text" onChange={(e) => onNameChange(e)} />

      <button onClick={(e) => btnClick(e)}>Bonjour {name}</button>

      <div>
        {nameError ? "Erreur name must have more than 2 letters" : salam}
      </div>

      <div></div>
    </div>
  );
}

export default App;

const secret = " jrsdhmghdfmgfuhdmgdgr";

function jwt() {
  "fdsfdsgdsghdbsgosdhgodghdgsddddddddg";
}
