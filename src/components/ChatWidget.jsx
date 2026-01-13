import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  MoreVertical,
  Minus,
  Send,
  Download,
  XCircle,
  Maximize2,
  Minimize2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

// View modes for the state machine
const VIEW_MODES = {
  OMNIBAR: 'omnibar',
  WIDE_CANVAS: 'wide-canvas',
  DOCKED_SIDEBAR: 'docked-sidebar'
};

const SPRING_CONFIG = {
  type: 'spring',
  stiffness: 200,
  damping: 25
};

const ChatWidget = () => {
  const [viewMode, setViewMode] = useState(VIEW_MODES.OMNIBAR);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi, I'm Agentforce, your AI assistant! 👋",
      subContent: "I can help you learn about Salesforce products, connect you with our team, or show you a demo."
    },
    {
      id: 2,
      type: 'actions',
      actions: [
        'Connect me with a sales rep',
        'Show me an Agentforce demo',
        'How can Salesforce help my business'
      ]
    },
    {
      id: 3,
      type: 'user',
      content: 'How do companies use Sales Cloud?'
    },
    {
      id: 4,
      type: 'bot',
      content: 'Sales Cloud is Salesforce\'s flagship CRM solution that helps companies:',
      bullets: [
        { bold: 'Track leads and opportunities', text: 'through customizable sales pipelines' },
        { bold: 'Automate workflows', text: 'to reduce manual data entry and focus on selling' },
        { bold: 'Get AI-powered insights', text: 'with Einstein to predict deal outcomes' },
        { bold: 'Collaborate across teams', text: 'with a unified view of every customer' }
      ],
      footer: 'Would you like me to show you a demo or connect you with a sales specialist? 🚀'
    }
  ]);

  const dropdownRef = useRef(null);
  const chatBodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, viewMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current && viewMode !== VIEW_MODES.OMNIBAR) {
        inputRef.current.focus();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [viewMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (viewMode === VIEW_MODES.WIDE_CANVAS) {
          setViewMode(VIEW_MODES.OMNIBAR);
        } else if (viewMode === VIEW_MODES.DOCKED_SIDEBAR) {
          setViewMode(VIEW_MODES.WIDE_CANVAS);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  const handleSend = useCallback(() => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        type: 'user',
        content: inputValue.trim()
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputValue('');

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: 'bot',
            content: "Thanks for your question! I'm processing that now. Is there anything else I can help you with?"
          }
        ]);
      }, 1000);
    }
  }, [inputValue]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOmnibarClick = () => {
    setViewMode(VIEW_MODES.WIDE_CANVAS);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getWrapperClasses = () => {
    const base = 'fixed inset-0 z-50 flex transition-all duration-500 ease-out';
    switch (viewMode) {
      case VIEW_MODES.OMNIBAR:
        return `${base} items-end justify-center pb-10 pointer-events-none`;
      case VIEW_MODES.WIDE_CANVAS:
        return `${base} items-center justify-center bg-black/20 backdrop-blur-sm`;
      case VIEW_MODES.DOCKED_SIDEBAR:
        return `${base} items-end justify-end p-6 pointer-events-none`;
      default:
        return base;
    }
  };

  const getCardDimensions = () => {
    switch (viewMode) {
      case VIEW_MODES.OMNIBAR:
        return { width: 600, height: 'auto' };
      case VIEW_MODES.WIDE_CANVAS:
        return { width: 800, height: 600 };
      case VIEW_MODES.DOCKED_SIDEBAR:
        return { width: 400, height: 600 };
      default:
        return { width: 600, height: 'auto' };
    }
  };

  const BotAvatar = ({ size = 'md' }) => {
    const sizeClasses = {
      sm: 'w-7 h-7',
      md: 'w-9 h-9',
      lg: 'w-11 h-11'
    };
    const iconSizes = {
      sm: 'w-3.5 h-3.5',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };
    return (
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-[#0176D3] to-[#0B5CAB] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20`}>
        <Bot className={`${iconSizes[size]} text-white`} />
      </div>
    );
  };

  const DropdownMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 py-2 z-50 overflow-hidden"
    >
      <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
        <Download className="w-4 h-4 text-gray-400" />
        Download chat transcript
      </button>
      <div className="h-px bg-gray-100 mx-3"></div>
      <button
        onClick={() => {
          setViewMode(VIEW_MODES.OMNIBAR);
          setIsDropdownOpen(false);
        }}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
      >
        <XCircle className="w-4 h-4" />
        End conversation
      </button>
    </motion.div>
  );

  const ChatHeader = ({ isDocked = false }) => (
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100/80 bg-white rounded-t-3xl">
      <div className="flex items-center gap-3">
        <BotAvatar size="md" />
        <div>
          <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">Agentforce</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <p className="text-xs text-emerald-600 font-medium">Online</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <MoreVertical className="w-[18px] h-[18px] text-gray-400" />
          </button>
          <AnimatePresence>
            {isDropdownOpen && <DropdownMenu />}
          </AnimatePresence>
        </div>
        <button
          onClick={() => setViewMode(isDocked ? VIEW_MODES.WIDE_CANVAS : VIEW_MODES.DOCKED_SIDEBAR)}
          className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          {isDocked ? <Maximize2 className="w-[18px] h-[18px] text-gray-400" /> : <Minimize2 className="w-[18px] h-[18px] text-gray-400" />}
        </button>
        <button
          onClick={() => setViewMode(VIEW_MODES.OMNIBAR)}
          className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
        >
          <Minus className="w-[18px] h-[18px] text-gray-400" />
        </button>
      </div>
    </div>
  );

  const ChatMessages = () => (
    <div
      ref={chatBodyRef}
      className="flex-1 overflow-y-auto px-5 py-5 space-y-5 chat-scrollbar bg-gray-50/30"
    >
      {messages.map((message) => {
        if (message.type === 'bot') {
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="flex gap-3"
            >
              <BotAvatar size="sm" />
              <div className="flex-1 max-w-[90%]">
                <div className="bg-white rounded-2xl rounded-tl-lg px-4 py-3.5 border border-gray-100 shadow-sm">
                  <p className="text-[15px] text-gray-800 leading-relaxed">
                    {message.content.includes('Agentforce') ? (
                      <>
                        {message.content.split('Agentforce')[0]}
                        <span className="font-semibold text-[#0176D3]">Agentforce</span>
                        {message.content.split('Agentforce')[1]}
                      </>
                    ) : (
                      message.content
                    )}
                  </p>
                  {message.subContent && (
                    <p className="text-[15px] text-gray-600 leading-relaxed mt-2">
                      {message.subContent}
                    </p>
                  )}
                  {message.bullets && (
                    <ul className="mt-3 space-y-2 text-[14px] text-gray-700">
                      {message.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#0176D3] mt-0.5">•</span>
                          <span>
                            <strong className="text-gray-800">{bullet.bold}</strong>{' '}
                            <span className="text-gray-600">{bullet.text}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {message.footer && (
                    <p className="text-[15px] text-gray-700 leading-relaxed mt-3">
                      {message.footer}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        }

        if (message.type === 'actions') {
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30, delay: 0.1 }}
              className="flex gap-3"
            >
              <div className="w-7 flex-shrink-0"></div>
              <div className="flex flex-col gap-2 w-full max-w-[85%]">
                {message.actions.map((action, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.005, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      setMessages((prev) => [
                        ...prev,
                        { id: Date.now(), type: 'user', content: action }
                      ]);
                    }}
                    /* 
                       UPDATED DESIGN: 
                       - text-[15px] to match chat body
                       - font-semibold for boldness
                       - text-[#0176D3] (Salesforce Blue)
                       - Clean white background
                    */
                    className="group flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 text-[#0176D3] rounded-xl hover:bg-blue-50/50 hover:border-[#0176D3]/30 transition-all duration-200 text-[15px] font-semibold shadow-sm hover:shadow-md hover:shadow-blue-500/5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#0176D3] flex-shrink-0" />
                      <span>{action}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#0176D3] transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          );
        }

        if (message.type === 'user') {
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="flex justify-end"
            >
              <div className="bg-gradient-to-br from-[#0176D3] to-[#0B5CAB] rounded-2xl rounded-tr-lg px-4 py-3 max-w-[85%] shadow-lg shadow-blue-500/10">
                <p className="text-[15px] text-white font-medium">{message.content}</p>
              </div>
            </motion.div>
          );
        }

        return null;
      })}
    </div>
  );

  const ChatInputField = () => (
    <div className="px-4 py-4 border-t border-gray-100/80 bg-white rounded-b-3xl">
      <div className="relative flex items-center gap-3 bg-gray-50 rounded-2xl border border-gray-200/80 p-1.5">
        <div className="pl-2 flex-shrink-0">
          <BotAvatar size="sm" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 bg-transparent py-3 pr-2 text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none min-w-0"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className={`flex-shrink-0 mr-1 p-2.5 rounded-xl transition-all duration-200 ${
            inputValue.trim()
              ? 'bg-gradient-to-br from-[#0176D3] to-[#0B5CAB] text-white shadow-lg shadow-blue-500/25'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );

  const dimensions = getCardDimensions();

  return (
    <div
      className={getWrapperClasses()}
      onClick={(e) => {
        if (viewMode === VIEW_MODES.WIDE_CANVAS && e.target === e.currentTarget) {
          setViewMode(VIEW_MODES.OMNIBAR);
        }
      }}
    >
      <motion.div
        layout
        transition={SPRING_CONFIG}
        className="pointer-events-auto bg-white rounded-3xl shadow-2xl shadow-gray-400/30 border border-gray-100 overflow-hidden flex flex-col"
        style={{
          width: dimensions.width,
          height: dimensions.height === 'auto' ? 'auto' : dimensions.height,
        }}
      >
        {viewMode === VIEW_MODES.OMNIBAR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="cursor-pointer"
            onClick={handleOmnibarClick}
          >
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0176D3] to-[#0B5CAB] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-gray-400 text-[15px]">Ask Agentforce...</span>
              </div>
              <div className="p-2.5 bg-gray-100 rounded-xl">
                <Send className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </motion.div>
        )}

        {(viewMode === VIEW_MODES.WIDE_CANVAS || viewMode === VIEW_MODES.DOCKED_SIDEBAR) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col h-full"
          >
            <ChatHeader isDocked={viewMode === VIEW_MODES.DOCKED_SIDEBAR} />
            <ChatMessages />
            <ChatInputField />
          </motion.div>
        )}
      </motion.div>

      {viewMode === VIEW_MODES.OMNIBAR && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-400 pointer-events-none"
        >
          Click to start chatting
        </motion.p>
      )}
    </div>
  );
};

export default ChatWidget;