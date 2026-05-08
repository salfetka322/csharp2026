export const initializeGoogleSignIn = (callback) => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
      callback: callback,
    });
    return true;
  }
  return false;
};

export const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.accounts) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Sign-In script'));
    document.head.appendChild(script);
  });
};

export const triggerGoogleSignIn = () => {
  if (window.google && window.google.accounts) {
    window.google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
      scope: 'email profile',
      callback: (response) => {

        if (response.access_token) {
          fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          })
            .then(res => res.json())
            .then(() => {
              window.google.accounts.id.prompt();
            });
        }
      },
    }).requestAccessToken();
  }
};


export const renderGoogleButton = (elementId) => {
  if (window.google && window.google.accounts) {
    window.google.accounts.id.renderButton(
      document.getElementById(elementId),
      {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: 'signin_with',
        locale: 'uk',
      }
    );
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // One Tap prompt was not displayed or skipped
      }
    });
  }
};

