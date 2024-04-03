import React from 'react';
import { Button } from './../Button';
import './styles.css';
import { Link } from 'react-router-dom';

function LandingComp() {
  return (
    <div className='hero-container'>
      <h1>DOSAGE HELPER</h1>
      <h3>Helping owners care for their animals</h3>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
           <Link to={`/login`}>
           LOG IN
           </Link>
         
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
           <Link to={`/signup`}>
          SIGN UP
          </Link>
          
        </Button>
      </div>
    </div>
  );
}

export default LandingComp;