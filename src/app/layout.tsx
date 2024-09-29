import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";
import { Fredoka, BioRhyme, Allura, Roboto } from "next/font/google";
import { lightTheme } from "@/theme/light";
import { UserProvider } from "@/context/user/UserProvider";
import { CSSProperties } from "react";
import { main_body, main_container, main_content } from "@/contant";
import { verifySession } from "@/server-utils/DAL/session";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "foody.",
  description: "Your food journal.",
};

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});
const bio_rhyme = BioRhyme({
  subsets: ["latin"],
  variable: "--font-bio-rhyme",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "400",
});

const allura = Allura({
  subsets: ["latin"],
  variable: "--font-allura",
  weight: "400",
});

const fontClassName = `${fredoka.variable} ${allura.variable} ${bio_rhyme.variable} ${roboto.variable}`;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  return (
    <html lang="en">
      <body className={fontClassName} style={main_body as CSSProperties}>
        <AppRouterCacheProvider>
          <StoreProvider>
            <UserProvider user={session}>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Box sx={main_container}>
                  <Navigation />
                  <Box role="main" sx={main_content}>
                    {children}
                  </Box>
                  <Footer />
                </Box>
              </ThemeProvider>
            </UserProvider>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
