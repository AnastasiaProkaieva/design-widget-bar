import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatWidget from './components/ChatWidget'; // Ensure this path is correct

// Import CSS as a string for Shadow DOM injection (Vite specific)
//import cssContent from './index.css?inline';
import cssContent from './widget-styles.css?inline'; 

class ShadowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.shadowRef = React.createRef();
    this.shadowRoot = null;
    this.mountPoint = null;
  }

  componentDidMount() {
    // 1. Create shadow root
    this.shadowRoot = this.shadowRef.current.attachShadow({ mode: 'open' });
    
    // 2. Inject styles into shadow DOM
    const styleElement = document.createElement('style');
    styleElement.textContent = cssContent;
    this.shadowRoot.appendChild(styleElement);
    
    // 3. Create mount point for React
    this.mountPoint = document.createElement('div');
    this.mountPoint.id = 'widget-root';
    
    // --- CRITICAL STABILITY FIXES ---
    // Force font-size to 16px. 
    // This ensures 1rem = 16px regardless of the host page settings.
    this.mountPoint.style.fontSize = '16px'; 
    this.mountPoint.style.width = '100%';
    this.mountPoint.style.height = '100%';
    // --------------------------------
    
    this.shadowRoot.appendChild(this.mountPoint);
    
    // 4. Mount React component
    this.innerRoot = createRoot(this.mountPoint);
    this.innerRoot.render(<ChatWidget />);
  }

  componentWillUnmount() {
    if (this.innerRoot) {
      this.innerRoot.unmount();
    }
  }

  render() {
    return (
      <div 
        ref={this.shadowRef} 
        style={{ 
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none', // Allow clicks to pass through to website
          zIndex: 2147483647     // Max safe z-index
        }}
      />
    );
  }
}

// Global initialization function
window.AgentforceWidget = {
  mount: (config = {}) => {
    const elementId = 'agentforce-widget-container';
    let container = document.getElementById(elementId);
    
    if (!container) {
      container = document.createElement('div');
      container.id = elementId;
      document.body.appendChild(container);
    }

    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <ShadowContainer {...config} />
      </React.StrictMode>
    );

    return {
      unmount: () => {
        root.unmount();
        container.remove();
      }
    };
  }
};

// Auto-init if the script is loaded directly
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
     window.AgentforceWidget.mount();
  });
}