import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import DomainSearch from './components/DomainSearch';
import DomainDetails from './components/DomainDetails';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';
import About from './components/About';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import AIAssistant from './components/AIAssistant';
import AIDemo from './components/AIDemo';

// Context
import { WalletProvider } from './contexts/WalletContext';
import { DomainProvider } from './contexts/DomainContext';

// Services
import { ApiService } from './services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize app
    const initApp = async () => {
      try {
        // Check if API is available
        await ApiService.checkHealth();
        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setError('Failed to connect to services. Please try again later.');
        setLoading(false);
      }
    };

    initApp();
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <LoadingSpinner />
        <p>Loading Africa Blockchain Domains...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h1>Connection Error</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <WalletProvider>
        <DomainProvider>
          <Router>
            <div className="App">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<DomainSearch />} />
                  <Route path="/domain/:domainName" element={<DomainDetails />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/ai-demo" element={<AIDemo />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
              <AIAssistant />
            </div>
          </Router>
        </DomainProvider>
      </WalletProvider>
    </ErrorBoundary>
  );
}

// Home component with hero section and search
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await ApiService.searchDomains(query);
      setSuggestions(response.suggestions);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch(query);
    }, 300);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Own Your Digital Identity
            <span className="gradient-text"> on the Blockchain</span>
          </h1>
          <p className="hero-subtitle">
            Register decentralized domains for Africa and beyond. 
            Build your Web3 presence with blockchain-powered domains.
          </p>

          {/* Search Box */}
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search for your perfect domain..."
                value={searchQuery}
                onChange={handleInputChange}
                className="search-input"
              />
              <button 
                className="search-button"
                disabled={isSearching}
              >
                {isSearching ? '🔍' : '🚀'}
              </button>
            </div>

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="suggestion-item">
                    <div className="suggestion-domain">
                      {suggestion.domain}
                    </div>
                    <div className={`suggestion-status ${suggestion.available ? 'available' : 'taken'}`}>
                      {suggestion.available ? '✅ Available' : '❌ Taken'}
                    </div>
                    {suggestion.available && (
                      <button className="register-btn">
                        Register
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Popular Extensions */}
          <div className="popular-extensions">
            <span>Popular extensions:</span>
            {['.africa', '.eth', '.crypto', '.defi', '.nft', '.web3'].map(ext => (
              <span 
                key={ext} 
                className="extension-tag"
                onClick={() => setSearchQuery(searchQuery + ext)}
              >
                {ext}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Blockchain Domains?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🌍</div>
              <h3>Truly Decentralized</h3>
              <p>No central authority. Your domain, your rules. Built on blockchain technology.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔐</div>
              <h3>Censorship Resistant</h3>
              <p>Your domain can't be seized or censored. True digital ownership.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💰</div>
              <h3>Crypto Payments</h3>
              <p>Pay with Bitcoin, Ethereum, and other cryptocurrencies.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🚀</div>
              <h3>IPFS Integration</h3>
              <p>Host your website on IPFS for true decentralized hosting.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>ENS Compatible</h3>
              <p>Works with Ethereum Name Service and Web3 applications.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Fast Resolution</h3>
              <p>Optimized DNS resolution with global caching network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Domains Registered</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Countries Served</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat">
              <div className="stat-number">6</div>
              <div className="stat-label">Blockchain Networks</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users who have already claimed their blockchain domains.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Browse Domains</button>
            <button className="btn btn-secondary">View Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
