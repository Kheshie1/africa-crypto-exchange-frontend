// Simplified API service for demo purposes
export const ApiService = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',

  async checkHealth() {
    try {
      // For demo, just return success
      return { status: 'healthy' };
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  async searchDomains(query) {
    try {
      // Mock API response for demo
      const extensions = ['africa', 'eth', 'crypto', 'defi', 'nft', 'web3'];
      const suggestions = extensions.map(ext => ({
        domain: `${query}.${ext}`,
        available: Math.random() > 0.5, // Random availability for demo
        extension: ext
      }));

      return { suggestions };
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  },

  async checkAvailability(domain) {
    try {
      // Mock availability check
      return {
        domain,
        available: Math.random() > 0.5,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Availability check failed:', error);
      throw error;
    }
  },

  async getDomainInfo(domain) {
    try {
      // Mock domain info
      return {
        name: domain,
        owner: '0x1234567890123456789012345678901234567890',
        expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year from now
        isActive: true
      };
    } catch (error) {
      console.error('Failed to get domain info:', error);
      throw error;
    }
  },

  async registerDomain(domainData) {
    try {
      // Mock registration
      console.log('Registering domain:', domainData);
      return {
        success: true,
        transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
        domain: domainData.name
      };
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }
};
