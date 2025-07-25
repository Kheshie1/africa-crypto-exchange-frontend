// AI Service for intelligent domain assistance
class AIService {
  constructor() {
    this.baseURL = process.env.REACT_APP_AI_API_URL || 'http://localhost:8000/api';
    this.knowledgeBase = this.initializeKnowledgeBase();
  }

  initializeKnowledgeBase() {
    return {
      domainExtensions: {
        '.africa': {
          price: 20,
          description: 'Perfect for African businesses and organizations',
          features: ['Geographic relevance', 'Cultural identity', 'Local SEO benefits'],
          useCases: ['African businesses', 'Tourism', 'Cultural projects', 'Regional services']
        },
        '.eth': {
          price: 5,
          description: 'Ethereum-based decentralized domains',
          features: ['ENS compatible', 'DeFi integration', 'Low cost'],
          useCases: ['DeFi projects', 'Crypto wallets', 'dApps', 'Ethereum ecosystem']
        },
        '.crypto': {
          price: 40,
          description: 'Premium blockchain domain for crypto projects',
          features: ['High visibility', 'Industry recognition', 'Brand authority'],
          useCases: ['Crypto exchanges', 'Blockchain startups', 'NFT projects', 'Web3 companies']
        },
        '.defi': {
          price: 40,
          description: 'Decentralized Finance focused domains',
          features: ['DeFi branding', 'Industry specific', 'Technical credibility'],
          useCases: ['DeFi protocols', 'Yield farming', 'DEX platforms', 'Lending platforms']
        },
        '.nft': {
          price: 40,
          description: 'Non-Fungible Token marketplace domains',
          features: ['NFT ecosystem', 'Digital art focus', 'Collector appeal'],
          useCases: ['NFT marketplaces', 'Digital artists', 'Collectibles', 'Gaming assets']
        },
        '.web3': {
          price: 40,
          description: 'Next-generation internet domains',
          features: ['Future-focused', 'Decentralized web', 'Innovation signal'],
          useCases: ['Web3 startups', 'dApps', 'Metaverse projects', 'Blockchain infrastructure']
        }
      },
      
      commonQuestions: {
        'what is blockchain domain': `Blockchain domains are decentralized domain names stored on blockchain networks instead of traditional DNS servers. They offer:

• **True Ownership**: You own the domain as an NFT
• **Censorship Resistance**: No central authority can take it down
• **Crypto Integration**: Use your domain as a wallet address
• **IPFS Hosting**: Decentralized website hosting
• **Global Access**: Works worldwide without restrictions`,

        'how to register domain': `Registering a blockchain domain is simple:

1. **Search** for your desired domain name
2. **Connect** your Web3 wallet (MetaMask recommended)
3. **Select** registration period (1-10 years)
4. **Review** pricing and features
5. **Pay** with cryptocurrency or card
6. **Confirm** blockchain transaction
7. **Manage** your domain in the dashboard

The process typically takes 2-5 minutes!`,

        'domain pricing': `Our pricing varies by extension and features:

**Popular Extensions:**
• .africa - $20/year (Regional focus)
• .eth - $5/year (Most affordable)
• .crypto - $40/year (Premium branding)
• .defi - $40/year (DeFi focused)
• .nft - $40/year (NFT ecosystem)
• .web3 - $40/year (Future-focused)

**Included Features:**
• IPFS hosting
• ENS compatibility
• DNS management
• 24/7 support
• Mobile app access`,

        'why choose blockchain': `Blockchain domains offer unique advantages:

🌍 **Decentralization**: No single point of failure
🔐 **True Ownership**: Domain is yours forever
💰 **Crypto Payments**: Accept payments directly
🚀 **IPFS Integration**: Censorship-resistant hosting
📱 **Mobile Ready**: Works on all devices
⚡ **Fast Resolution**: Global CDN network
🛡️ **Security**: Blockchain-level protection`
      },

      domainSuggestions: {
        business: ['biz', 'corp', 'company', 'enterprise', 'ventures', 'solutions'],
        tech: ['tech', 'dev', 'code', 'digital', 'cyber', 'innovation', 'labs'],
        africa: ['africa', 'afro', 'ubuntu', 'sahara', 'nile', 'kilimanjaro', 'baobab'],
        crypto: ['crypto', 'defi', 'web3', 'blockchain', 'dao', 'token', 'coin'],
        creative: ['art', 'design', 'studio', 'creative', 'media', 'vision', 'inspire']
      }
    };
  }

  // Main AI response generator
  async generateResponse(userMessage, context = {}) {
    try {
      const intent = this.analyzeIntent(userMessage);
      
      switch (intent.type) {
        case 'domain_search':
          return await this.handleDomainSearch(userMessage, intent);
        case 'pricing_inquiry':
          return this.handlePricingInquiry(intent);
        case 'education':
          return this.handleEducation(intent);
        case 'registration_help':
          return this.handleRegistrationHelp(intent);
        case 'domain_suggestion':
          return this.handleDomainSuggestion(userMessage, intent);
        case 'comparison':
          return this.handleComparison(intent);
        default:
          return this.handleGeneral(userMessage, context);
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getFallbackResponse();
    }
  }

  // Analyze user intent from message
  analyzeIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // Domain search patterns
    if (this.matchesPattern(lowerMessage, ['search', 'find', 'looking for', 'want']) && 
        this.matchesPattern(lowerMessage, ['domain', 'name', 'website'])) {
      return { type: 'domain_search', confidence: 0.9, query: this.extractDomainQuery(message) };
    }

    // Pricing patterns
    if (this.matchesPattern(lowerMessage, ['price', 'cost', 'fee', 'pricing', 'expensive', 'cheap'])) {
      return { type: 'pricing_inquiry', confidence: 0.8, extension: this.extractExtension(message) };
    }

    // Educational patterns
    if (this.matchesPattern(lowerMessage, ['what is', 'explain', 'how does', 'why', 'difference'])) {
      return { type: 'education', confidence: 0.7, topic: this.extractTopic(message) };
    }

    // Registration help
    if (this.matchesPattern(lowerMessage, ['register', 'buy', 'purchase', 'get', 'acquire'])) {
      return { type: 'registration_help', confidence: 0.8 };
    }

    // Domain suggestions
    if (this.matchesPattern(lowerMessage, ['suggest', 'recommend', 'ideas', 'alternatives'])) {
      return { type: 'domain_suggestion', confidence: 0.7, category: this.extractCategory(message) };
    }

    // Comparison requests
    if (this.matchesPattern(lowerMessage, ['compare', 'vs', 'versus', 'difference between'])) {
      return { type: 'comparison', confidence: 0.8, items: this.extractComparisonItems(message) };
    }

    return { type: 'general', confidence: 0.5 };
  }

  // Helper method to match patterns
  matchesPattern(text, patterns) {
    return patterns.some(pattern => text.includes(pattern));
  }

  // Handle domain search requests
  async handleDomainSearch(message, intent) {
    const query = intent.query || this.extractDomainQuery(message);
    
    if (!query) {
      return `I'd love to help you search for domains! Could you tell me what domain name or keywords you're interested in? For example:
      
• "Search for mycompany"
• "Find africatech domains"
• "Looking for NFT marketplace names"`;
    }

    try {
      // Try to get real search results
      const searchResults = await this.searchDomains(query);
      return this.formatSearchResults(searchResults, query);
    } catch (error) {
      // Fallback to intelligent suggestions
      return this.generateDomainSuggestions(query);
    }
  }

  // Handle pricing inquiries
  handlePricingInquiry(intent) {
    const extension = intent.extension;
    
    if (extension && this.knowledgeBase.domainExtensions[extension]) {
      const ext = this.knowledgeBase.domainExtensions[extension];
      return `**${extension}** domains are $${ext.price}/year

${ext.description}

**Key Features:**
${ext.features.map(f => `• ${f}`).join('\n')}

**Perfect For:**
${ext.useCases.map(u => `• ${u}`).join('\n')}

Would you like to search for available ${extension} domains?`;
    }

    return this.knowledgeBase.commonQuestions['domain pricing'];
  }

  // Handle educational requests
  handleEducation(intent) {
    const topic = intent.topic;
    
    if (topic === 'blockchain domain' || topic === 'blockchain domains') {
      return this.knowledgeBase.commonQuestions['what is blockchain domain'];
    }
    
    if (topic === 'registration' || topic === 'register') {
      return this.knowledgeBase.commonQuestions['how to register domain'];
    }

    return this.knowledgeBase.commonQuestions['why choose blockchain'];
  }

  // Handle registration help
  handleRegistrationHelp(intent) {
    return `**Ready to register your domain?** Here's how:

🔍 **Step 1: Search**
Use our search above or tell me what domain you want

🔗 **Step 2: Connect Wallet**
We support MetaMask, WalletConnect, and more

⏰ **Step 3: Choose Duration**
Select 1-10 years (longer = better value)

💳 **Step 4: Payment**
Pay with crypto or credit card

✅ **Step 5: Confirmation**
Wait for blockchain confirmation (2-5 minutes)

🎉 **Done!**
Manage your domain in the dashboard

**Need help with any step?** Just ask!`;
  }

  // Handle domain suggestions
  handleDomainSuggestion(message, intent) {
    const category = intent.category || this.detectCategory(message);
    const suggestions = this.knowledgeBase.domainSuggestions[category] || 
                      this.knowledgeBase.domainSuggestions.business;

    return `Here are some ${category} domain suggestions:

**Popular Combinations:**
${suggestions.slice(0, 4).map(s => `• yourname${s}.africa`).join('\n')}

**With Different Extensions:**
${this.getTopExtensions().map(ext => `• yourname${ext}`).join('\n')}

**Creative Ideas:**
• africatech.crypto
• mynft.nft  
• defiproject.defi
• web3startup.web3

Tell me more about your project and I can give personalized suggestions!`;
  }

  // Handle comparison requests
  handleComparison(intent) {
    const items = intent.items;
    
    if (items && items.length >= 2) {
      return this.compareExtensions(items);
    }

    return `I can help you compare different domain extensions! Here are the most popular:

**Budget-Friendly:** .eth ($5/year)
• Lowest cost
• ENS compatible
• Perfect for DeFi

**Regional Focus:** .africa ($20/year)
• Geographic relevance
• Cultural identity
• Local SEO benefits

**Premium Branding:** .crypto ($40/year)
• Industry recognition
• High visibility
• Brand authority

Which extensions would you like me to compare in detail?`;
  }

  // Generate domain suggestions based on query
  generateDomainSuggestions(query) {
    const suggestions = [];
    const extensions = Object.keys(this.knowledgeBase.domainExtensions);
    
    // Basic suggestions
    extensions.forEach(ext => {
      suggestions.push(`${query}${ext}`);
    });

    // Add variations
    const variations = ['hub', 'zone', 'space', 'pro', 'lab'];
    variations.forEach(variation => {
      suggestions.push(`${query}${variation}.africa`);
    });

    return `Here are some suggestions for "${query}":

**Available Extensions:**
${suggestions.slice(0, 6).map(s => `• ${s} - Check availability`).join('\n')}

**Creative Alternatives:**
• ${query}hub.africa
• my${query}.crypto
• ${query}zone.web3
• ${query}pro.eth

Would you like me to check availability for any of these?`;
  }

  // Helper methods
  extractDomainQuery(message) {
    // Extract potential domain name from message
    const words = message.toLowerCase().replace(/[^\w\s]/g, '').split(' ');
    const stopWords = ['search', 'find', 'looking', 'domain', 'for', 'want', 'need'];
    return words.find(word => word.length > 2 && !stopWords.includes(word));
  }

  extractExtension(message) {
    const extensions = Object.keys(this.knowledgeBase.domainExtensions);
    return extensions.find(ext => message.toLowerCase().includes(ext));
  }

  extractTopic(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('blockchain') || lowerMessage.includes('decentralized')) {
      return 'blockchain domain';
    }
    if (lowerMessage.includes('register') || lowerMessage.includes('registration')) {
      return 'registration';
    }
    return 'general';
  }

  extractCategory(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('business') || lowerMessage.includes('company')) return 'business';
    if (lowerMessage.includes('tech') || lowerMessage.includes('technology')) return 'tech';
    if (lowerMessage.includes('africa') || lowerMessage.includes('african')) return 'africa';
    if (lowerMessage.includes('crypto') || lowerMessage.includes('defi')) return 'crypto';
    if (lowerMessage.includes('art') || lowerMessage.includes('creative')) return 'creative';
    return 'business';
  }

  detectCategory(message) {
    return this.extractCategory(message);
  }

  getTopExtensions() {
    return ['.africa', '.eth', '.crypto', '.web3'];
  }

  compareExtensions(extensions) {
    const comparison = extensions.map(ext => {
      const info = this.knowledgeBase.domainExtensions[ext];
      return info ? `**${ext}** - $${info.price}/year\n${info.description}` : `${ext} - Not available`;
    });

    return `**Extension Comparison:**

${comparison.join('\n\n')}

Which extension fits your needs best?`;
  }

  // API integration methods
  async searchDomains(query) {
    try {
      const response = await fetch(`${this.baseURL}/domains/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });
      
      if (!response.ok) throw new Error('Search failed');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Use backend AI chat API
  async generateResponseFromAPI(message, context) {
    try {
      const response = await fetch(`${this.baseURL}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, context })
      });
      
      if (!response.ok) throw new Error('AI API request failed');
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('AI API Error:', error);
      // Fallback to local processing
      return this.generateLocalResponse(message, context);
    }
  }

  // Rename old method for fallback
  async generateLocalResponse(userMessage, context = {}) {
    try {
      const intent = this.analyzeIntent(userMessage);
      
      switch (intent.type) {
        case 'domain_search':
          return await this.handleDomainSearch(userMessage, intent);
        case 'pricing_inquiry':
          return this.handlePricingInquiry(intent);
        case 'education':
          return this.handleEducation(intent);
        case 'registration_help':
          return this.handleRegistrationHelp(intent);
        case 'domain_suggestion':
          return this.handleDomainSuggestion(userMessage, intent);
        case 'comparison':
          return this.handleComparison(intent);
        default:
          return this.handleGeneral(userMessage, context);
      }
    } catch (error) {
      console.error('AI Service Error:', error);
      return this.getFallbackResponse();
    }
  }

  formatSearchResults(results, query) {
    if (!results || !results.suggestions) {
      return this.generateDomainSuggestions(query);
    }

    const available = results.suggestions.filter(s => s.available);
    const taken = results.suggestions.filter(s => !s.available);

    let response = `**Search Results for "${query}":**\n\n`;

    if (available.length > 0) {
      response += `✅ **Available Domains:**\n`;
      available.slice(0, 5).forEach(domain => {
        response += `• ${domain.domain} - Ready to register!\n`;
      });
    }

    if (taken.length > 0) {
      response += `\n❌ **Already Taken:**\n`;
      taken.slice(0, 3).forEach(domain => {
        response += `• ${domain.domain}\n`;
      });
    }

    response += `\nWould you like me to suggest alternatives or help you register one of the available domains?`;
    
    return response;
  }

  getFallbackResponse() {
    const responses = [
      "I'm here to help with blockchain domains! Ask me about pricing, registration, or domain suggestions.",
      "I can assist with domain searches, explain Web3 concepts, or guide you through registration. What interests you?",
      "Let me help you find the perfect blockchain domain! What kind of project are you working on?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  handleGeneral(message, context) {
    // Enhanced general conversation handling
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm your AI assistant for Africa Blockchain Domains. I can help you find domains, understand Web3 technology, or guide you through registration. What can I do for you today?";
    }
    
    if (lowerMessage.includes('help')) {
      return `I'm here to help! I can assist with:

🔍 **Domain Search** - Find available domains
💰 **Pricing Info** - Compare extension costs  
📚 **Web3 Education** - Learn about blockchain domains
🔧 **Registration** - Step-by-step guidance
💡 **Suggestions** - Creative domain ideas
🌍 **Africa Focus** - Regional domain expertise

What would you like to explore?`;
    }

    return this.getFallbackResponse();
  }
}

// Export singleton instance
export const aiService = new AIService();
export default aiService;
