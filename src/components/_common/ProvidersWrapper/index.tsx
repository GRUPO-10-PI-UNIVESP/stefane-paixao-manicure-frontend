"use client";

import ToastNotificationProvider from "@/core/contexts/ToastNotification.provider";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function ProvidersWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });
  return (
    <ToastNotificationProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ToastNotificationProvider>
  );
}

export default ProvidersWrapper;
