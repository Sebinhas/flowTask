import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ProjectProvider } from "./context/ProjectContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FlowTask",
  description: "FlowTask es una herramienta de gestión de proyectos y tareas que te permite organizar tus ideas y proyectos de manera eficiente.",
  generator: 'FlowTask'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ProjectProvider>
            {children}
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'