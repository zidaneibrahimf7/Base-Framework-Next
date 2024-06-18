import "./globals.css";
// import { Gabarito } from "next/font/google";
import { Gabarito as FontSans } from "next/font/google";
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/context/theme-provider";

// const gabarito = Gabarito({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={gabarito.className}>{children}</body> */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}