import React from 'react';
// import '../App.css';
import { Button } from './Button';
import './Landing.css';

function Landing() {
  return (
    <div className='hero-container'>
      <img src="/client/public/images/dark_bg2.png" alt="" />
      <h1>DOSAGE HELPER</h1>
      <p>Pet Medication Tracker</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          LOGIN
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          REGISTER
        </Button>
      </div>
    </div>
  );
}

export default Landing;