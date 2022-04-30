import React from "react";
export const current = new Date();
export const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
export const Time = `${current.getHours()}:${current.getMinutes()}`

export default function CurrentTime() {
  const current = new Date();
   const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const Time = `${current.getHours()}:${current.getMinutes()}`

  return (
    <div>
      <h1 className="text-blue-800">Current date is : {date} {Time} </h1>
    </div>
  );
}



