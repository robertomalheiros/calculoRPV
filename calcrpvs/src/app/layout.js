import './globals.css'
import { Inter } from 'next/font/google'
import Footer from "./components/Footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CalcRPVs',
  description: 'Calcular RPVs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      
      <body className={inter.className}>
        <header><br></br>
        <br></br>
        <br></br>
        </header>
        {children}
      <footer>
      <Footer/>
      </footer>
      </body>
    </html>
  )
}
