import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";
import { useRef } from "react";

import { useAuthValue } from "../context/AuthContext";

import styles from './Navbar.module.css';
import {SiPhotobucket} from 'react-icons/si';
import {HiHome} from 'react-icons/hi';
import {HiInformationCircle} from 'react-icons/hi';
import {FiLogIn} from 'react-icons/fi';
import {MdOutlineEditNote} from 'react-icons/md';
import {RiDashboardFill} from 'react-icons/ri';
import {MdDashboardCustomize} from 'react-icons/md';
import {FiLogOut} from 'react-icons/fi';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const {user} = useAuthValue();
  const {logout} = useAuthentication();

  const menuRef = useRef();
  const showMenu = () => {
    menuRef.current.classList.toggle(styles.responsive_menu);

  }

  return (
    
    <nav className={styles.navbar}>

      <NavLink to='/' className={styles.brand}>
        <div><SiPhotobucket />Picked Today </div>
      </NavLink>

      <button className={styles.btn_menu} onClick={showMenu}>
        <FaBars />
      </button>

      <ul className={styles.links_list} ref={menuRef}>
        <button className={styles.close_btn} onClick={showMenu}>
          <FaTimes />
        </button>

        <NavLink to='/' className={({isActive}) => (isActive ? styles.active : '')}>
          <li className="link">
            <div><HiHome/>Home</div>
          </li>
        </NavLink>
        {!user && (
          <>
            <NavLink to='/login' className={({isActive}) => (isActive ? styles.active : '')}>
              <li className="link">
                <div><FiLogIn/>Entrar</div>
              </li>
            </NavLink>
            <NavLink to='/register' className={({isActive}) => (isActive ? styles.active : '')}>
              <li className="link">
                <div><MdOutlineEditNote/>Cadastrar</div>
              </li>
            </NavLink>
          </>
        )}
        {user && (
                 <>
                 <NavLink to='/posts/create' className={({isActive}) => (isActive ? styles.active : '')}>
                 <li className="link">
                   <div><MdDashboardCustomize/>Novo pick</div>
                 </li>
               </NavLink>
               <NavLink to='/dashboard' className={({isActive}) => (isActive ? styles.active : '')}>
                 <li className="link">
                   <div><RiDashboardFill/>Dashboard</div>
                 </li>
               </NavLink>
             </>
        )}
        <NavLink to='/about' className={({isActive}) => (isActive ? styles.active : '')}>
          <li>
            <div className="link"><HiInformationCircle />Sobre</div>
          </li>
        </NavLink>
        {user && (
          <li>
            <button className={styles.logout_btn} onClick={logout}><FiLogOut />Sair</button>
          </li>
        )}
      </ul>
    </nav>
  )
};

export default Navbar;
