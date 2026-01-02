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

export type ProductionCompany = {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export type ProductionCountry = {
  iso_3166_1: string
  name: string
}

export type SpokenLanguage = {
  iso_639_1: string
  name: string
}

export type MovieDetails = {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  genres: Genre[]
  runtime: number | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  budget: number
  revenue: number
  status: string
  tagline: string | null
  homepage: string | null
  imdb_id: string | null
  original_title: string
  original_language: string
  adult: boolean
  video: boolean
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string | null
    backdrop_path: string | null
  } | null
}

export type MoviesResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type CastMember = {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
  cast_id: number
  credit_id: string
}

export type CrewMember = {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
  credit_id: string
}

export type CreditsResponse = {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}
