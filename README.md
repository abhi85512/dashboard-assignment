# Personalized Content Dashboard

A dynamic, user-centric content dashboard built for the SDE Intern - Frontend Development Assignment. 

## Features

- **Personalized Content Feed**: View a unified feed of news, social posts, and recommendations.
- **User Preferences**: Select favorite categories from the sidebar. Settings are persisted via Redux Persist (Local Storage).
- **Infinite Scrolling**: Scroll down to automatically load more content using Intersection Observer.
- **Drag-and-Drop Organization**: Reorder items in your feed via Framer Motion's `Reorder` component.
- **Debounced Search**: Type in the top search bar to search across content smoothly.
- **Dark Mode**: Fully implemented Tailwind dark mode that can be toggled in the header.
- **Animations**: Smooth transitions, loading spinners, and hover effects.

## Technologies Used

- **React / Next.js (App Router)**
- **TypeScript**
- **Redux Toolkit & Redux Persist** (State Management)
- **Tailwind CSS** (Styling & Dark Mode)
- **Framer Motion** (Animations & Drag-and-Drop)
- **Lucide React** (Icons)

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

*Note: In a full production scenario, you would run the following for the complete test suite. The structure is prepared for Cypress (E2E) and Jest (Unit).*

```bash
# E2E Tests (Cypress)
npm run cypress:open

# Unit Tests (Jest)
npm run test
```

## Structure

- `/src/components` - Reusable UI components (Sidebar, Header, ContentCard, Feed, etc.)
- `/src/store` - Redux Toolkit configuration and slices
- `/src/services` - Mock API service for fetching simulated data
- `/src/app` - Next.js App Router pages and layouts

## Bonus Features (Included)

- **Responsive Design**: Flawlessly adapts to mobile screens (Sidebar collapses on small screens).
- **Mock Service Architecture**: Pre-configured mock API service for easy extension to real endpoints.
