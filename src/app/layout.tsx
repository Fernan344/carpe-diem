import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Carpe Diem",
  description: "Inspírate y actúa: Carpe Diem, Just Do It",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
