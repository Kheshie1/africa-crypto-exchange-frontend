import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiMessageSquare, FiZap, FiTrendingUp } from 'react-icons/fi';
import aiService from '../services/aiService';
import './AIDemo.css';

const AIDemo = () => {
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Demo queries to showcase AI capabilities
  const demoQueries = [
    {
      category: "Domain Search",
      icon: <FiZap />,
      queries: [
        "Search for mycompany domains",
        "Find africatech domains",
        "Looking for NFT marketplace names"
      ]
    },
    {
      category: "Pricing Info",
      icon: <FiTrendingUp />,
      queries: [
        "What are the pricing options?",
        "How much does .africa cost?",
        "Compare .eth vs .crypto pricing"
      ]
    },
    {
      category: "Education",
      icon: <FiCpu />,
      queries: [
        "What is a blockchain domain?",
        "How do I register a domain?",
        "Why choose blockchain domains?"
      ]
    },
    {
      category: "Suggestions",
      icon: <FiMessageSquare />,
      queries: [
        "Suggest tech company domains",
        "Creative domain ideas for artists",
        "Business domain recommendations"
      ]
    }
  ];

  const handleDemoQuery = async (query) => {
    setIsLoading(true);
    try {
      const response = await aiService.generateResponse(query);
      setResponses(prev => [...prev, { query, response, timestamp: new Date() }]);
    } catch (error) {
      console.error('Demo query error:', error);
      setResponses(prev => [...prev, { 
        query, 
        response: "I'm sorry, I encountered an error processing that request.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResponses = () => {
    setResponses([]);
  };

  return (
    <div className="ai-demo">
      <div className="ai-demo-header">
        <motion.div 
          className="demo-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FiCpu size={32} />
          <h1>AI Assistant Demo</h1>
          <p>Experience intelligent domain assistance powered by AI</p>
        </motion.div>
      </div>

      <div className="ai-demo-content">
        {/* Demo Categories */}
        <motion.div 
          className="demo-categories"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Try These Examples</h2>
          {demoQueries.map((category, categoryIndex) => (
            <div key={categoryIndex} className="demo-category">
              <div className="category-header">
                {category.icon}
                <h3>{category.category}</h3>
              </div>
              <div className="category-queries">
                {category.queries.map((query, queryIndex) => (
                  <button
                    key={queryIndex}
                    className="demo-query-btn"
                    onClick={() => handleDemoQuery(query)}
                    disabled={isLoading}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {responses.length > 0 && (
            <button className="clear-btn" onClick={clearResponses}>
              Clear Responses
            </button>
          )}
        </motion.div>

        {/* Responses */}
        <motion.div 
          className="demo-responses"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>AI Responses</h2>
          
          {isLoading && (
            <div className="loading-response">
              <div className="loading-spinner"></div>
              <span>AI is thinking...</span>
            </div>
          )}

          {responses.length === 0 && !isLoading && (
            <div className="no-responses">
              <FiMessageSquare size={48} />
              <p>Click on any example query to see the AI in action!</p>
            </div>
          )}

          {responses.map((item, index) => (
            <motion.div
              key={index}
              className="response-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="response-query">
                <strong>Query:</strong> {item.query}
              </div>
              <div className="response-content">
                <strong>AI Response:</strong>
                <div className="response-text">
                  {item.response.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex} dangerouslySetInnerHTML={{ 
                      __html: line
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    }} />
                  ))}
                </div>
              </div>
              <div className="response-time">
                {item.timestamp.toLocaleTimeString()}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* AI Features */}
      <motion.div 
        className="ai-features"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2>AI Assistant Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FiZap className="feature-icon" />
            <h3>Intelligent Search</h3>
            <p>Natural language domain search with smart suggestions and availability checking.</p>
          </div>
          <div className="feature-card">
            <FiTrendingUp className="feature-icon" />
            <h3>Pricing Analysis</h3>
            <p>Instant pricing comparisons across all domain extensions with value recommendations.</p>
          </div>
          <div className="feature-card">
            <FiCpu className="feature-icon" />
            <h3>Web3 Education</h3>
            <p>Learn about blockchain domains, registration processes, and Web3 concepts.</p>
          </div>
          <div className="feature-card">
            <FiMessageSquare className="feature-icon" />
            <h3>Personalized Help</h3>
            <p>Context-aware assistance tailored to your specific needs and project requirements.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIDemo;
