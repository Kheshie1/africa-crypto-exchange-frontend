import React, { createContext, useContext, useState } from 'react';

const DomainContext = createContext();

export const useDomain = () => {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error('useDomain must be used within a DomainProvider');
  }
  return context;
};

export const DomainProvider = ({ children }) => {
  const [domains, setDomains] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchDomains = async (query) => {
    setLoading(true);
    try {
      // Mock search results for now
      const mockResults = [
        { domain: `${query}.africa`, available: true, extension: 'africa' },
        { domain: `${query}.eth`, available: false, extension: 'eth' },
        { domain: `${query}.crypto`, available: true, extension: 'crypto' }
      ];
      setSearchResults(mockResults);
      return mockResults;
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const value = {
    domains,
    setDomains,
    searchResults,
    searchDomains,
    loading
  };

  return (
    <DomainContext.Provider value={value}>
      {children}
    </DomainContext.Provider>
  );
};
