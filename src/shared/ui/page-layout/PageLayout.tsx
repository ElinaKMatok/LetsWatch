import type { ReactNode } from 'react'

type PageLayoutProps = {
  title: string
  children: ReactNode
}

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 flex items-center justify-center gap-2 py-6">
        {title}
      </h2>
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  )
}
