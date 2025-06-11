<!-- @format -->

# Hotel and Travel Booking Platform
This is a project built with [Chef](https://chef.convex.dev) using [Convex](https://convex.dev) as its backend.

A modern hotel and travel booking platform built with React, Vite, and Firebase Authentication (Google/Email login). This project is designed for both travelers and hotel partners, providing dedicated dashboards and navigation for each user type.

## Features

- Beautiful, responsive UI with Tailwind CSS
- Separate dashboards and navigation for users and partners
- Google and Email/Password authentication via Firebase
- Persistent login state (users stay logged in after refresh)
- Modular component structure for easy extension
- Placeholder pages for all major navigation items (easy to develop further)

## Project Structure

- `src/components/layout/` — Navbars, Footer, and layout components
- `src/components/home/` — Home page sections (Hero, Featured, Categories, Destinations)
- `src/components/dashboard/` — User and Partner dashboards
- `src/components/auth/` — Authentication modals and forms
- `src/lib/` — Firebase config, Auth context, and utilities
- `src/pages/` — Placeholder and future route pages

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure Firebase:**
   - Copy your Firebase config into `src/lib/firebaseConfig.js`.
   - Enable Google and/or Email/Password authentication in the Firebase Console.
3. **Run the app:**
   ```sh
   npm run dev
   ```
4. **Login as a user or partner:**
   - Use the Sign In/Sign Up/Partner Login buttons in the navbar.
   - After login, you will see a dedicated dashboard and navigation for your user type.

## Customization & Development

- Add new pages by creating files in `src/pages/` and updating routes in `src/App.jsx`.
- Modify navbars for users/partners in `src/components/layout/UserNavbar.jsx` and `PartnerNavbar.jsx`.
- Extend authentication logic in `src/lib/AuthContext.jsx` as needed.

## License

MIT. Feel free to use and modify for your own projects.
