const SESSION_KEY = 'session';

export const storage = {
  setSession: (session: string) => {
    localStorage.setItem(SESSION_KEY, session);
  },

  getSession: () => {
    return localStorage.getItem(SESSION_KEY);
  },

  clear: () => {
    localStorage.removeItem(SESSION_KEY);
  },
};
