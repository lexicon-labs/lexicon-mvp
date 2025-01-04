(function() {
  const createWidget = () => {
    // Create container for better positioning and accessibility
    const container = document.createElement('div');
    const iframe = document.createElement('iframe');
    
    // Set container attributes
    const containerStyles = {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      maxWidth: '100vw',
      maxHeight: 'calc(100vh - 32px)',
      zIndex: '999999',
      margin: '0',
      padding: '0',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    };
    
    // Set iframe attributes with improved accessibility
    const iframeStyles = {
      width: '120px', 
      height: '32px',
      border: 'none',
      borderRadius: '8px',
      background: 'transparent',
      overflow: 'hidden',
      transition: 'width 0.3s ease, height 0.3s ease',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    };
    
    Object.assign(container.style, containerStyles);
    Object.assign(iframe.style, iframeStyles);
    
    // Add accessibility attributes
    iframe.setAttribute('title', 'Lexicon AI Chat Widget');
    iframe.setAttribute('aria-label', 'Chat with Lexicon AI Assistant');
    iframe.setAttribute('allowtransparency', 'true');
    
    const script = document.currentScript;
    const configId = script?.getAttribute('data-config-id') || 'default';
    
    iframe.src = `https://lexicon-agent-demo.netlify.app/chat-widget?configId=${configId}`;
    
    // Add container to DOM
    container.appendChild(iframe);
    document.body.appendChild(container);
    
    // Handle iframe load
    iframe.onload = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          const rootStyles = {
            background: 'transparent',
            margin: '0',
            padding: '0'
          };
          
          Object.assign(iframeDoc.documentElement.style, rootStyles);
          Object.assign(iframeDoc.body.style, rootStyles);
        }
      } catch (e) {
        console.warn('Could not access iframe document:', e);
      }
    };
    
    // Improved resize handling with debouncing
    let resizeTimeout;
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://lexicon-landing.pages.dev') return;
      
      if (event.data.type === 'resize') {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          const maxWidth = Math.min(380, window.innerWidth - 32);
          const maxHeight = window.innerHeight - 32;
          
          const width = Math.min(event.data.width, maxWidth);
          const height = Math.min(event.data.height, maxHeight);
          
          iframe.style.width = `${width}px`;
          iframe.style.height = `${height}px`;
        }, 100);
      }
    });

    // Handle window resize
    let windowResizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(windowResizeTimeout);
      windowResizeTimeout = setTimeout(() => {
        const maxWidth = Math.min(380, window.innerWidth - 32);
        const maxHeight = window.innerHeight - 32;
        
        iframe.style.width = Math.min(parseInt(iframe.style.width), maxWidth) + 'px';
        iframe.style.height = Math.min(parseInt(iframe.style.height), maxHeight) + 'px';
      }, 100);
    });
  };

  // Initialize widget
  if (document.readyState === 'complete') {
    createWidget();
  } else {
    window.addEventListener('load', createWidget);
  }
})();