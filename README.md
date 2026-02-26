<div align="center">

# 🎬 Video Stream — Video Streaming Platform

A modern, responsive video streaming platform built with **React 19**, **TypeScript**, and the **YouTube Data API v3**.  
Browse, search, and curate your personal watchlist — all wrapped in a sleek, themeable UI.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5-5A0EF8?logo=daisyui&logoColor=white)](https://daisyui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Architecture](#-architecture)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

**Video Stream** is a single-page application that leverages the YouTube Data API to deliver a Netflix-inspired browsing experience. Users can discover content through real-time search and filtering, view detailed video pages with embedded players, and maintain a personal watchlist — all behind a lightweight client-side authentication system.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Video Catalog** | Browse up to 50 videos fetched live from the YouTube API |
| **Real-Time Search** | Debounced search (600 ms) with instant results |
| **Advanced Filtering** | Filter by format (Films, Series, Documentaries) and genre (Action, Comedy, Drama, Sci-Fi, Horror, Documentary) |
| **Video Player** | Embedded YouTube player with autoplay on the detail page |
| **Personal Watchlist** | Add/remove videos from your saved list (persisted in `localStorage`) |
| **Authentication** | Client-side register & login with form validation |
| **Protected Routes** | Watchlist page is accessible only to authenticated users |
| **Dark / Light Theme** | Toggle between **Light** and **Synthwave** (dark) themes via DaisyUI |
| **Responsive Design** | Fully responsive grid layout — mobile, tablet, and desktop |
| **Lazy Loading** | Route-level code splitting with `React.lazy` and `Suspense` |
| **SweetAlert Notifications** | User-friendly alerts for watchlist actions and auth warnings |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 7](https://vite.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI 5](https://daisyui.com/) |
| **Routing** | [React Router 7](https://reactrouter.com/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Notifications** | [SweetAlert](https://sweetalert.js.org/) |
| **Linting** | [ESLint 9](https://eslint.org/) + TypeScript ESLint |
| **API** | [YouTube Data API v3](https://developers.google.com/youtube/v3) |

---

## 📁 Project Structure

```
src/
├── main.tsx                  # Application entry point
├── App.tsx                   # Root component — routing & layout
├── App.css                   # Global styles & DaisyUI theme config
├── index.css                 # Base CSS imports
│
├── components/
│   ├── Header.tsx            # Navigation bar with auth-aware menu
│   ├── ProtectedRoute.tsx    # Route guard — redirects unauthenticated users
│   └── VideoCard.tsx         # Reusable video thumbnail card
│
├── hooks/
│   ├── useAuth.ts            # Authentication hook (login, logout, state)
│   └── useLocalStorage.ts    # Generic localStorage hook with type safety
│
├── model/
│   ├── User.model.ts         # User interface definition
│   └── Video.model.ts        # Video interface definition
│
├── pages/
│   ├── Home.tsx              # Main catalog — search, filter & browse
│   ├── Login.tsx             # Login & registration form
│   ├── VideoDetails.tsx      # Video player & metadata detail page
│   └── Watchlist.tsx         # User's saved videos (protected)
│
├── services/
│   └── videoService.ts       # YouTube API integration layer
│
└── assets/                   # Static assets (images, icons, etc.)
```

---

## 🚀 Getting Started

### Prerequisites!

- **Node.js** ≥ 18
- **npm** ≥ 9 (or **yarn** / **pnpm**)
- A **YouTube Data API v3** key — [Get one here](https://console.cloud.google.com/apis/credentials)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/Plateforme-de-Streaming-Video-avec-React.js.git
cd Plateforme-de-Streaming-Video-avec-React.js

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file at the project root:

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
```

> **Note:** The `VITE_` prefix is required for Vite to expose the variable to client-side code.

### Running the App

```bash
# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (default Vite port).

---

## 💡 Usage

1. **Browse** — The home page loads trending movie trailers by default.
2. **Search** — Type in the search bar; results update automatically after a 600 ms debounce.
3. **Filter** — Use the dropdowns to narrow by format (Films, Series, Documentaries) or genre.
4. **Watch** — Click any video card to open the detail page with an embedded YouTube player.
5. **Register / Login** — Create an account or sign in from the login page.
6. **Watchlist** — On a video detail page, click *"Ajouter à ma liste"* to save it. Access your list from the navbar.
7. **Theme Toggle** — Use the toggle switch in the header to switch between light and dark themes.

---

## 📸 Screenshots

<!-- Add your screenshots here -->

| Home Page | Video Details | Watchlist |
|---|---|---|
| ![Home](screenshots/home.png) | ![Details](screenshots/details.png) | ![Watchlist](screenshots/watchlist.png) |

> Replace the placeholder paths above with actual screenshots of your application.

---

## 🏗 Architecture

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Browser    │────▶│  React Router    │────▶│     Pages        │
│  (Client)    │     │  (Lazy Loading)  │     │  Home / Login /  │
└──────────────┘     └──────────────────┘     │  Details / List  │
                                               └────────┬─────────┘
                                                        │
                              ┌──────────────────────────┼──────────────────────┐
                              │                          │                      │
                    ┌─────────▼──────────┐   ┌───────────▼─────────┐  ┌─────────▼─────────┐
                    │   Components       │   │      Hooks          │  │    Services       │
                    │  Header / Card /   │   │  useAuth /          │  │  videoService     │
                    │  ProtectedRoute    │   │  useLocalStorage    │  │  (YouTube API)    │
                    └────────────────────┘   └─────────────────────┘  └─────────┬─────────┘
                                                        │                       │
                                              ┌─────────▼─────────┐   ┌────────▼──────────┐
                                              │   localStorage    │   │  YouTube Data     │
                                              │   (Auth + Data)   │   │  API v3           │
                                              └───────────────────┘   └───────────────────┘
```

**Key patterns used:**
- **Lazy Loading** — Route-level code splitting via `React.lazy()` + `Suspense`
- **Custom Hooks** — Encapsulated auth logic and localStorage persistence
- **Service Layer** — API calls abstracted into `videoService.ts`
- **Protected Routes** — `ProtectedRoute` HOC redirects unauthenticated users to `/login`
- **TypeScript Models** — Strongly typed `User` and `Video` interfaces

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Type-check with TypeScript and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Commit** your changes: `git commit -m "feat: add my feature"`
4. **Push** to the branch: `git push origin feature/my-feature`
5. **Open** a Pull Request

Please make sure your code passes linting (`npm run lint`) before submitting.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ using React, TypeScript & Vite**

</div>
