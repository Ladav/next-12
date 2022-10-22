export type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <div className="w-full h-full max-w-6xl px-4 py-8 mx-auto">{children}</div>
}
