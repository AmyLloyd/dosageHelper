import React from 'react';
import '../App.css';
import { Button } from './Buttons';
import '../styles/herosection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <img src="/assets/images/dark_bg2"/>
      <h1>DOSAGE HELPER</h1>
      <p>Pet Dosage Reminder</p>
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
          REGISTER <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;