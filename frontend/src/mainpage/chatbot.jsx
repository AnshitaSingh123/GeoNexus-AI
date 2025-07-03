import React, { useState, useEffect, useRef } from 'react';

// ICONS - Using inline SVGs for better performance and customization
// We need these icons for the chat interface.

// AI Assistant Icon (re-used from your portal.jsx)
const AIAssistantIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-10 w-10"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c5.515 0 10-4.486 10-10S17.515 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
        <path d="M12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" />
        <path d="M12 9c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" />
    </svg>
);

// A generic User Icon for the user's avatar
const UserIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-10 w-10"} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
);


// Page Wrapper Component (copied from your portal.jsx for consistency)
// This ensures the chatbot page has the same layout as your other pages.
const PageWrapper = ({ children, setPage }) => (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="container mx-auto px-6 h-[calc(100vh-68px)] flex flex-col"> {/* Full height minus header */}
            <button onClick={() => setPage('home')} className="flex-shrink-0 flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold my-6 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to Home</span>
            </button>
            <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex-grow flex flex-col animate-fade-in">
                {children}
            </main>
        </div>
    </div>
);


// The main Chatbot Page Component
export default function ChatbotPage({ setPage }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Hello! I'm your MOSDAC AI assistant. I can help you find satellite data, explore missions, and navigate our knowledge base. What would you like to know?",
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (text) => {
        const content = text.trim();
        if (!content) return;

        const newMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: content,
        };
        setMessages(prev => [...prev, newMessage]);
        setInputValue(''); // Clear input if it was used
        
        // --- Simulate Bot Response ---
        setIsTyping(true);
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                sender: 'bot',
                text: `Thank you for your question about "${content}". Let me analyze this and provide you with insights based on the available data.`,
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 2000); // Simulate a 2-second delay
    };

    const quickSuggestions = [
        'Show me recent satellite missions',
        'Find data for Mumbai, India',
        'Browse documentation for Cartosat-3',
    ];

    return (
        <PageWrapper setPage={setPage}>
            {/* Chat Header */}
            <div className="flex-shrink-0 flex items-center space-x-4 p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="p-1 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                    <AIAssistantIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">MOSDAC AI Assistant</h2>
                    <div className="flex items-center space-x-2 text-green-500">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">Online</span>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'bot' && (
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                    <AIAssistantIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                                </div>
                            )}
                            <div className={`max-w-lg rounded-2xl px-4 py-3 shadow ${
                                msg.sender === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-none' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                            }`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            {msg.sender === 'user' && (
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                    <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                                </div>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                         <div className="flex items-end gap-3 justify-start">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                <AIAssistantIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                            </div>
                            <div className="max-w-lg rounded-2xl px-4 py-3 shadow bg-gray-100 dark:bg-gray-700 rounded-bl-none">
                                <div className="flex items-center justify-center space-x-1">
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
                {/* Quick Suggestions */}
                {messages.length <= 1 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {quickSuggestions.map(q => (
                            <button 
                                key={q} 
                                onClick={() => handleSendMessage(q)}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-full text-xs hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                {q}
                            </button>
                        ))}
                    </div>
                )}
                
                {/* Text Input Form */}
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="relative">
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask your question..." 
                        className="w-full bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg py-3 pl-4 pr-14 text-gray-800 dark:text-gray-200 transition-colors" 
                    />
                    <button 
                        type="submit" 
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 transition-colors"
                        disabled={!inputValue.trim() || isTyping}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
            </div>
        </PageWrapper>
    );
}
