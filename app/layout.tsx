import "@/app/ui/global.css"
import { inter } from "./ui/fonts"
import { EdgeStoreProvider } from "./lib/edgestore"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  )
}
