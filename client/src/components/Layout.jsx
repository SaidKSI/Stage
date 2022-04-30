import React from "react";
import Menu from "./Menu";
import MenuNavBar from "./MenuNavBar";


export default function Layout({ children }) {
  return (
    

    <div className='container mx-auto'>
        <MenuNavBar/>
        <div className='py-[50px]  '>
        {
            children
        }

        </div>

        <footer className='py-auto'>
            copyright {new Date().getFullYear()}
        </footer>
    </div>
  );
}
