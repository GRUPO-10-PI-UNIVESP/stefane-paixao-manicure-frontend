"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function ProvidersWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ProvidersWrapper;
