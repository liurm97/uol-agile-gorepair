import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {}
      <head />
      <body>
        <ChakraProvider>
          <Navbar></Navbar>

          {children}
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
