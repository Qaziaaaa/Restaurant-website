/**
 * Production Analytics Utility
 * Used for tracking user behavior and conversion funnels.
 * In production, this would integrate with Google Analytics 4 (GA4) or Mixpanel.
 */

type EventName = 
  | 'login' 
  | 'signup' 
  | 'add_to_cart' 
  | 'checkout_started' 
  | 'order_completed' 
  | 'page_view';

interface AnalyticsPayload {
  [key: string]: any;
}

export const trackEvent = (name: EventName, payload?: AnalyticsPayload) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Event: ${name}`, payload);
    return;
  }

  // Example integration with window.gtag (GA4)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, payload);
  }
};

export const trackPageView = (path: string) => {
  trackEvent('page_view', { page_path: path });
};
