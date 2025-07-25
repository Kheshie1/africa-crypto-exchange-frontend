import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiUser, FiCpu } from 'react-icons/fi';
import { ApiService } from '../services/api';
import aiService from '../services/aiService';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI assistant for Africa Blockchain Domains. I can help you find the perfect domain, explain blockchain concepts, or answer any questions about our services. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateAIResponse = async (userMessage) => {
    try {
      // Use the enhanced AI service for intelligent responses
      return await aiService.generateResponse(userMessage, {
        timestamp: new Date(),
        messageHistory: messages
      });
    } catch (error) {
      console.error('AI Response Error:', error);
      return "I apologize, but I'm having trouble processing your request right now. Please try asking about domain searches, pricing, or registration help!";
    }
  };

  const extractDomainFromMessage = (message) => {
    // Extract domain-like strings from the message
    const domainRegex = /([a-zA-Z0-9-]+\.?[a-zA-Z]{2,})/g;
    const matches = message.match(domainRegex);
    if (matches) {
      return matches[0].replace(/[^\w\s.-]/g, '');
    }
    
    // Extract potential domain names without extensions
    const wordRegex = /\b([a-zA-Z0-9-]+)\b/g;
    const words = message.match(wordRegex);
    if (words && words.length > 0) {
      return words.find(word => word.length > 2 && !['domain', 'search', 'find', 'looking'].includes(word.toLowerCase()));
    }
    
    return null;
  };

  const formatDomainSearchResponse = (searchResults, searchTerm) => {
    if (!searchResults || !searchResults.suggestions) {
      return `I searched for "${searchTerm}" but couldn't find specific results right now. However, I can suggest checking these popular extensions: .africa, .eth, .crypto, .defi, .nft, or .web3. Would you like me to help you explore any of these?`;
    }

    const available = searchResults.suggestions.filter(s => s.available);
    const taken = searchResults.suggestions.filter(s => !s.available);

    let response = `Here's what I found for "${searchTerm}":\n\n`;

    if (available.length > 0) {
      response += `✅ **Available Domains:**\n`;
      available.slice(0, 3).forEach(domain => {
        response += `• ${domain.domain} - Available for registration\n`;
      });
    }

    if (taken.length > 0) {
      response += `\n❌ **Unavailable:**\n`;
      taken.slice(0, 2).forEach(domain => {
        response += `• ${domain.domain} - Already registered\n`;
      });
    }

    response += `\nWould you like me to suggest alternatives or help you register one of the available domains?`;
    
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      setIsThinking(false);
      setIsTyping(true);

      const aiResponse = await generateAIResponse(inputValue);
      
      // Simulate typing effect
      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: aiResponse,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content) => {
    // Simple markdown formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/•/g, '•')
      .split('\n')
      .map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
      ));
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className={`ai-chat-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <FiMessageCircle size={24} />
        <span className="chat-badge">AI</span>
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-container"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Chat Header */}
            <div className="ai-chat-header">
              <div className="ai-avatar">
                <FiCpu size={20} />
              </div>
              <div className="ai-info">
                <h4>AI Assistant</h4>
                <span className="ai-status">Online</span>
              </div>
              <button
                className="chat-close"
                onClick={() => setIsOpen(false)}
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="ai-chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-avatar">
                    {message.type === 'user' ? (
                      <FiUser size={16} />
                    ) : (
                      <FiCpu size={16} />
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-text">
                      {formatMessage(message.content)}
                    </div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Thinking/Typing Indicators */}
              {isThinking && (
                <motion.div
                  className="message ai"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-avatar">
                    <FiCpu size={16} />
                  </div>
                  <div className="message-content">
                    <div className="thinking-indicator">
                      <div className="thinking-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span>Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {isTyping && (
                <motion.div
                  className="message ai"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-avatar">
                    <FiCpu size={16} />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span>Typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="ai-chat-input">
              <div className="input-container">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about blockchain domains..."
                  rows={1}
                  disabled={isThinking || isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isThinking || isTyping}
                  className="send-button"
                >
                  <FiSend size={18} />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <button
                onClick={() => setInputValue('How do I register a domain?')}
                className="quick-action"
              >
                Registration Help
              </button>
              <button
                onClick={() => setInputValue('What are the pricing options?')}
                className="quick-action"
              >
                Pricing Info
              </button>
              <button
                onClick={() => setInputValue('Explain blockchain domains')}
                className="quick-action"
              >
                Learn Web3
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
