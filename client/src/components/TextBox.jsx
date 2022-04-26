import React from 'react'

export default function TextBox(name, onChange) {
  return (
    <input type={"text"} name={name} onChange={(e)=>onChange(e)}></input>
  )
}
