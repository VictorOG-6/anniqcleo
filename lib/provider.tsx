import React from "react";
import ReactQueryProviders from "./react-query/react-query-provider";
import SearchValueProvider from "@/contexts/search-value-context";
import { CartProvider } from "@/contexts/cart/cart-context";
import UserProvider from "@/contexts/user/user-context";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProviders>
      <UserProvider>
        <SearchValueProvider>
          <CartProvider>{children}</CartProvider>
        </SearchValueProvider>
      </UserProvider>
    </ReactQueryProviders>
  );
};

export default Providers;
