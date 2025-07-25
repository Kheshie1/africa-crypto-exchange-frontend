import React from 'react';

const Header = () => {
  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'white'
        }}>
          🌍 Africa Blockchain Domains
        </div>
        <nav style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/search" style={{ color: 'white', textDecoration: 'none' }}>Search</a>
          <a href="/pricing" style={{ color: 'white', textDecoration: 'none' }}>Pricing</a>
          <button style={{
            background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '25px',
            cursor: 'pointer'
          }}>
            Connect Wallet
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
