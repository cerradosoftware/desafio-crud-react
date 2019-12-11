import { createContext, useContext } from "react";

export const ClienteContext = createContext();

export function useCliente() {
  return useContext(ClienteContext);
}
