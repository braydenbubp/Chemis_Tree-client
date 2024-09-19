import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        backgroundImage: 'url("https://cdn.vectorstock.com/i/1000v/17/62/chemistry-vector-1031762.avif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '2rem',
          borderRadius: '10px',
        }}
      >
        <h1>Welcome To Chemis-Tree</h1>
        <p>Click the button below to login!</p>
        <Button type="button" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
