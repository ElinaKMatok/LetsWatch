import type { ReactNode } from 'react'

type PageLayoutProps = {
  title: string
  children: ReactNode
}

export const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {title}
          </h2>
        </div>
      </header>
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  )
}
