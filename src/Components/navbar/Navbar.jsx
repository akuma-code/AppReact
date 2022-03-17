import React from 'react'
import cl from './Navbar.module.css'

const Navbar = () => {
    return (
        <div className={ cl.navbar }
        >
            <div className={ cl.navbar__item }>СКЛАД</div>
            <div className={ cl.navbar__item }>Производство</div>
            <div className={ cl.navbar__item }>Админка</div>
            <div className={ cl.navbar__item }>Выйти</div>
        </div>
    )
}

export default Navbar