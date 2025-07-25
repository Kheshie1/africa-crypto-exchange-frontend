import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <p>&copy; 2024 Africa Blockchain Domains. Powered by blockchain technology.</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
          <a href="/docs" style={{ color: 'white', textDecoration: 'none' }}>Documentation</a>
          <a href="/support" style={{ color: 'white', textDecoration: 'none' }}>Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
