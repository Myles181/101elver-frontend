const API_BASE = 'https://one01elver.onrender.com/api';

/**
 * Track visitor information
 * Sends visitor data including device info, referrer, and timestamp to backend
 * Backend will capture IP address server-side
 */
export const trackVisitor = async () => {
  try {
    // Check if visitor has been tracked in this session
    const sessionTracked = sessionStorage.getItem('visitor_tracked');
    if (sessionTracked) {
      return; // Already tracked this session
    }

    // Gather visitor information
    const visitorData = {
      // Device & Browser Info
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      languages: navigator.languages,
      
      // Screen Info
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      colorDepth: window.screen.colorDepth,
      pixelDepth: window.screen.pixelDepth,
      
      // Window Info
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      
      // Referrer & Location
      referrer: document.referrer || 'direct',
      currentUrl: window.location.href,
      pathname: window.location.pathname,
      
      // Timezone
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
      
      // Timestamp
      timestamp: new Date().toISOString(),
      
      // Device Type Detection
      deviceType: getDeviceType(),
      
      // Browser Detection
      browser: getBrowserInfo(),
      
      // Touch Support
      touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      
      // Connection Info (if available)
      connection: getConnectionInfo(),
    };

    // Send to backend
    const response = await fetch(`${API_BASE}/visitors/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorData)
    });

    if (response.ok) {
      // Mark as tracked in this session
      sessionStorage.setItem('visitor_tracked', 'true');
      console.log('Visitor tracked successfully');
    }

  } catch (error) {
    console.error('Failed to track visitor:', error);
    // Fail silently - don't disrupt user experience
  }
};

/**
 * Detect device type based on screen size and user agent
 */
const getDeviceType = () => {
  const ua = navigator.userAgent;
  const width = window.innerWidth;
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  
  if (width < 768) {
    return 'mobile';
  }
  
  if (width >= 768 && width < 1024) {
    return 'tablet';
  }
  
  return 'desktop';
};

/**
 * Get browser information
 */
const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';

  // Detect browser
  if (ua.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    browserVersion = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('SamsungBrowser') > -1) {
    browserName = 'Samsung Browser';
    browserVersion = ua.match(/SamsungBrowser\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
    browserName = 'Opera';
    browserVersion = ua.match(/(?:Opera|OPR)\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Trident') > -1) {
    browserName = 'Internet Explorer';
    browserVersion = ua.match(/rv:(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Edge') > -1) {
    browserName = 'Edge (Legacy)';
    browserVersion = ua.match(/Edge\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Edg') > -1) {
    browserName = 'Edge (Chromium)';
    browserVersion = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
    browserVersion = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Safari') > -1) {
    browserName = 'Safari';
    browserVersion = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'Unknown';
  }

  return {
    name: browserName,
    version: browserVersion,
    fullString: ua
  };
};

/**
 * Get connection information (if available)
 */
const getConnectionInfo = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (!connection) {
    return null;
  }

  return {
    effectiveType: connection.effectiveType, // '4g', '3g', '2g', 'slow-2g'
    downlink: connection.downlink, // Download speed in Mbps
    rtt: connection.rtt, // Round-trip time in ms
    saveData: connection.saveData // Data saver mode
  };
};

/**
 * Track page view
 * Call this on route changes
 */
export const trackPageView = async (pagePath) => {
  try {
    const pageData = {
      path: pagePath || window.location.pathname,
      url: window.location.href,
      title: document.title,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    };

    await fetch(`${API_BASE}/visitors/pageview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageData)
    });

  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

/**
 * Track custom event
 * Use for tracking specific user actions
 */
export const trackEvent = async (eventName, eventData = {}) => {
  try {
    const event = {
      name: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      pathname: window.location.pathname
    };

    await fetch(`${API_BASE}/visitors/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    });

  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

/**
 * Get unique visitor ID from localStorage
 * Creates one if it doesn't exist
 */
export const getVisitorId = () => {
  let visitorId = localStorage.getItem('visitor_id');
  
  if (!visitorId) {
    visitorId = generateUUID();
    localStorage.setItem('visitor_id', visitorId);
  }
  
  return visitorId;
};

/**
 * Generate UUID v4
 */
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Initialize visitor tracking
 * Call this once when app loads
 */
export const initVisitorTracking = () => {
  // Track initial visit
  trackVisitor();
  
  // Track initial page view
  trackPageView();
  
  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      trackEvent('page_visible');
    } else {
      trackEvent('page_hidden');
    }
  });
  
  // Track before unload (user leaving)
  window.addEventListener('beforeunload', () => {
    trackEvent('page_exit', {
      timeOnPage: performance.now()
    });
  });
};

export default {
  trackVisitor,
  trackPageView,
  trackEvent,
  getVisitorId,
  initVisitorTracking
};