import React from "react";
export const current = new Date();
export const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
export const Time = `${current.getHours()}:${current.getMinutes()}`

export default function CurrentTime() {

  return (
    <div>
      <h1 className="text-blue-800"> {date} </h1>
    </div>
  );
}



