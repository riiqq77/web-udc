import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  isDark: localStorage.getItem('udc-theme') === 'dark',
  toggleTheme: () => set((state) => {
    const newDark = !state.isDark;
    localStorage.setItem('udc-theme', newDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDark);
    return { isDark: newDark };
  }),
  initTheme: () => set((state) => {
    document.documentElement.classList.toggle('dark', state.isDark);
    return state;
  }),
}));

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('udc-token'),
  isAuthenticated: !!localStorage.getItem('udc-token'),
  login: (user, token) => {
    localStorage.setItem('udc-token', token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('udc-token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export const useSidebarStore = create((set) => ({
  isOpen: true,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));
