# Let's Watch 🎬

A modern movie discovery application built with React, TypeScript, and Vite. Browse, search, and filter movies from The Movie Database (TMDb) API.

🌐 **Live Demo**: [https://elinakmatok.github.io/LetsWatch/](https://elinakmatok.github.io/LetsWatch/)

## Features

- 🎥 **Movie Discovery**: Browse popular movies with pagination
- 🔍 **Search**: Search movies by title with debounced input
- 🎛️ **Advanced Filtering**: 
  - Filter by year range (1900 - current year)
  - Filter by rating range (1-10)
  - Filter by multiple genres
- 📱 **Responsive Design**: Beautiful, modern UI built with Tailwind CSS
- 🎨 **Movie Details**: View detailed information in a sliding drawer
- ⭐ **State Management**: Powered by Zustand for efficient state management

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TMDb API key ([Get one here](https://www.themoviedb.org/settings/api))

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd letswatch
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your TMDb API key to the `.env` file:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

## Running the Application Locally

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:5173
```

The application will automatically reload when you make changes to the code.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI interface
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
letswatch/
├── src/
│   ├── assets/          # Static assets (icons, images)
│   ├── features/        # Feature-based modules
│   │   └── movies/      # Movie-related features
│   │       ├── api/     # API calls
│   │       ├── model/   # Types and store (Zustand)
│   │       └── ui/      # UI components
│   └── shared/          # Shared components and utilities
│       └── ui/          # Reusable UI components
├── public/              # Public assets
└── index.html           # Entry HTML file
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Select** - Multi-select dropdown component
- **rc-slider** - Range slider component
- **TMDb API** - Movie data source

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_TMDB_API_KEY` | Your TMDb API key | Yes |

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## Deployment

This application is automatically deployed to GitHub Pages on every push to the `main` branch.

### Manual Deployment

If you need to deploy manually:

1. Build the project:
```bash
npm run build
```

2. The `dist` folder contains the production-ready files that can be deployed to any static hosting service.

### GitHub Pages Setup

The project is configured to deploy automatically via GitHub Actions. To enable GitHub Pages:

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. Make sure your `VITE_TMDB_API_KEY` is set as a repository secret:
   - Go to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `VITE_TMDB_API_KEY`
   - Value: Your TMDb API key

The application will be available at: `https://elinakmatok.github.io/LetsWatch/`

## Testing

The project includes unit tests for components using Vitest and React Testing Library.

Run tests:
```bash
npm run test
```

Run tests with UI:
```bash
npm run test:ui
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
