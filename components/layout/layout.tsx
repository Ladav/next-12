export type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <div className="max-w-6xl mx-auto p-4 !pb-10">{children}</div>
}
