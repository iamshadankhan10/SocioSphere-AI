import React from 'react';

/**
 * Premium Loading Spinner Component
 * 
 * Props:
 *   fullPage    - boolean (if true, overlays the entire screen with glassmorphism backdrop)
 *   size        - number (width/height of spinner in pixels, default 40)
 *   message     - string (optional status message to show underneath spinner)
 */
export default function LoadingSpinner({ fullPage = false, size = 40, message = 'Loading...' }) {
  const spinnerElement = (
    <div className="spinner-container">
      <div 
        className="premium-spinner" 
        style={{ width: size, height: size }}
      />
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="spinner-overlay">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
}
