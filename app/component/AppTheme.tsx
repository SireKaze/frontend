"use client";
import { ReactNode, useContext } from "react";
import { AppContext } from "../component/appContext";
import clsx from "clsx";
import Button from "./ButtonProps";
import { signOut, useSession } from "next-auth/react";
import { Session } from 'next-auth';
 
interface ThemeProps {
  title: string;
  children: ReactNode;
}
 
const AppTheme: React.FC<ThemeProps> = ({ title, children }) => {
  const appContext = useContext(AppContext);
  const { theme } = appContext;
  const { data: Session, status } = useSession();
  return (
    <>
      <header
        className={clsx(
          ` w-full  h-[5%] flex font-semibold items-center px-5`,
          {
            "bg-gray-200 text-black": theme === "light",
            "bg-gray-800 text-white ": theme === "dark",
          }
        )}
      >
        {title}
        {status === "authenticated" &&
        <Button onClick={() => {
          signOut();
        
        }} colorSchema="blue" title="Logout"/>
        }
      </header>
      <div
        className={clsx(` h-full w-full`, {
          "bg-gray-200 text-black": theme === "light",
          "bg-gray-800 text-white ": theme === "dark",
        })}
      >
        {children}
      </div>
    </>
  );
};
 
export default AppTheme;