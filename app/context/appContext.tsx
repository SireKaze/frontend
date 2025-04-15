"use client"
 
// contexts/AppContext.tsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createContext, useState, ReactNode, useContext } from 'react';
 
// Tentukan tipe untuk nilai yang disediakan oleh konteks
interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
 
// Buat nilai default untuk konteks
const defaultContextValue: AppContextType = {
  theme: 'light',
  toggleTheme: () => {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};
 
// Buat context dengan nilai default yang valid
export const AppContext = createContext<AppContextType>(defaultContextValue);
 
interface AppProviderProps {
  children: ReactNode;
}
 
export function AppProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState<string>('light');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
 
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
 
  const login = () => {
    setIsAuthenticated(true);
  };
 
  const logout = () => {
    setIsAuthenticated(false);
  };
 
  return (
    <AppContext.Provider value={{ theme, toggleTheme, isAuthenticated, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}