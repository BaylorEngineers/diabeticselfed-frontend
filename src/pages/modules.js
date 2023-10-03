import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";


export default function Home(props) {
    return (
        <>
            <Sidebar />
            <div>
                this is where the modules would go.
            </div>
        </>
       
    );
}
