import { PageLayout } from './shared/ui/page-layout'
import { MovieList } from './features/movies'

function App() {
  return (
    <PageLayout title="Let's Watch something good 🍿">
      <MovieList />
    </PageLayout>
  )
}

export default App
