import React from "react";
import {Link} from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import StepsBlock from "./components/StepsBlock/StepsBlock";
import Footer from "../../components/Footer/Footer";
import './StartPage.css';

const StartPage = () => {
    return (
        <>
        <Header />
        <Hero link="#learnsteps"/>
        <StepsBlock />
        <Footer />
        </>
    );
}

export default StartPage;