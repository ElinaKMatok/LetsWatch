export type Movie = {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
}

export type Genre = {
  id: number
  name: string
}

export type GenresResponse = {
  genres: Genre[]
}

export type MoviesResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
