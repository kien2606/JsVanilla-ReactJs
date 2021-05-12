import React from 'react'
import './SidebarOption.css';
function SidebarOption({Icon , title , number,selected}) {
    return (
        <div className = {`sidebaroptions ${ selected ? 'sidebaroptions__active' : ''}`}>
            <Icon />
            <h3 className = 'sidebaroptions__title'>{title}</h3>
            <p className = 'sidebaroptions__number' >{number}</p>
        </div>
    )
}

export default SidebarOption
