"use client";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>{children}</Provider>
    </ApolloProvider>
  );
}
