import React, { useState } from "react";
import H1 from "../components/H1";
import Menu from "../components/Menu";
import Todos from "../components/Todos";

export default function TodosPage() {
  const [persons, setPersons] = useState([{ name: "Yahia" }, { name: "Said" }]);
  return (
    <div>
   

      {persons.map((person, index) => (
        <div className="">
          <H1>{person.name}</H1>
          <Todos maxElement={5} person={person} />
        </div>
      ))}
    </div>
  );
}
