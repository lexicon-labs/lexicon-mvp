import "./globals.css";
import { WalletContextProvider } from "./components/WalletProvider/WalletContextProvider";

export const metadata = {
  title: "Lexicon - AI assistant for Solana",
  description: "An intelligent AI assistant for the Solana blockchain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-b from-black to-gray-900 overflow-x-hidden">
        {/* Background pattern */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-transparent to-transparent opacity-50" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-10" />
        </div>

        {/* Gradient orbs - adjusted colors for dark theme */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-40 left-20 w-80 h-80 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <WalletContextProvider>
          <div className="relative min-h-screen flex flex-col">
            {children}
          </div>
        </WalletContextProvider>
      </body>
    </html>
  );
}
