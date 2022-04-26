import axios from "axios";
import React, { useEffect, useState } from "react";
import CurrentTime from "../components/CurrentTime";

export default function Home() {
  const [user, setuser] = useState();

  

  return (
    <div className="container">
        <CurrentTime></CurrentTime>
</div>
  );
}
