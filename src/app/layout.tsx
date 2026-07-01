import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import CloudBot from "@/components/CloudBot";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CloudEng PH — Learn Cloud Engineering in Simple English",
  description:
    "Learn Cloud Engineering! Free interactive lessons, quizzes, and hands-on labs for AWS, Azure, and GCP. For Filipino aspiring cloud engineers.",
  keywords: [
    "cloud engineering",
    "AWS",
    "Azure",
    "GCP",
    "Simple English",
    "cloud computing",
    "learn cloud",
    "free course",
  ],
  authors: [{ name: "CloudEng PH" }],
  openGraph: {
    title: "CloudEng PH — Learn Cloud Engineering in Simple English",
    description:
      "Learn Cloud Engineering! Free lessons, quizzes, and hands-on labs.",
    type: "website",
    locale: "en_PH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          {children}
          <CloudBot />
        </AuthProvider>
      </body>
    </html>
  );
}
