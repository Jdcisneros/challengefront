"use client";
import theme from "@/components/theme";
import "./globals.css";
import { store } from "@/redux/store";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <body>{children}</body>
        </ThemeProvider>
      </Provider>
    </html>
  );
}
