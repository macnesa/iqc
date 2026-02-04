"use client";
import { useEffect } from "react"; 
import useLenis from "../hooks/useLenis"; 
import { initAnalytics } from "../lib/analytics";

export default function Providers({ children }) {
  useLenis(); 
  useEffect(() => {
    try {
      initAnalytics();
    } catch (_) {}
  }, []);
  
  return children;
}



