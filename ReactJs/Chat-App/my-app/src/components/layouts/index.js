import React from 'react'
import Header from '../header'

export default function Layout(props) {
    return (
        <div className = "layout">
            <Header />
            {props.children}
        </div>
    )
}
