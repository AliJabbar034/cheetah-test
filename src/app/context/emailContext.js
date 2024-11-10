"use client";

import { createContext, useContext, useState } from "react";

const EmailContext = createContext();

export const UseEmailContext = () => useContext(EmailContext);

export function EmailProvider({ children }) {
  const [email, setEmail] = useState();

  const emailHandler = (email) => {
    setEmail(email);
  };
  return (
    <EmailContext.Provider value={{ email, emailHandler }}>
      {children}
    </EmailContext.Provider>
  );
}
