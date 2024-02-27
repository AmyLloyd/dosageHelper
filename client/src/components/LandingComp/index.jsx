import React from 'react';
// import '../App.css';
import { Button } from './../Button';
import './Landing.css';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className='hero-container'>
      <img src="/client/public/images/dark_bg2.png" alt="" />
      <h1>DOSAGE HELPER</h1>
      <p>Helping owners care for their animals</p>
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
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
           <Link to={`/signup`}>
          SIGN UP
          </Link>
          
        </Button>
      </div>
    </div>
  );
}

export default Landing;