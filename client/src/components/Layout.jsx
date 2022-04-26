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

        <footer className='mt-[20%]'>
            copyright {new Date().getFullYear()}
        </footer>
    </div>
  );
}
