import React, { useContext } from 'react';
import { PubledContext, PubledContextType } from '../../context/PubledContext';

const Home = () => {
    return (
        <div className="landingpage">
            <div className="hero-section">
                <div className="hero-image"></div>
                <div className="bg">
                    <div className="rect1"></div>
                    <div className="rect"></div>
                </div>
                <text className="bg text">
                    <text className="text heading">
                        <text className="bring">Bringing Science from Web 0 to Web 3</text>
                        <text className="dec">Decentralizing Scientific Publishing</text>
                    </text>
                    <text className="bg subheading">
                        <div className="rectangle"></div>
                        <text className="textsubheading">
                            Take control of your scientific contributions! Unlock the potential of your research with
                            our decentralized, transparent, and collaborative platform
                        </text>
                    </text>
                </text>
            </div>
        </div>
    );
};

export default Home;
