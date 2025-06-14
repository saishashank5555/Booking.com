<!-- @format -->

# 🌟 Hotel & Travel Booking Platform — Team Guide

Welcome to our modern hotel and travel booking platform! This project is built with React, Vite, Firebase Authentication, and Tailwind CSS. It’s designed for both travelers and hotel partners, offering dedicated dashboards, seamless navigation, and a beautiful, responsive UI.

---

## 🛠️ Tech Stack (Technologies used in Project)

- **React** — Frontend UI library for building interactive user interfaces.
- **Vite** — Fast development server and build tool for modern web projects
- **Firebase Authentication** — Secure user authentication (Google & Email/Password)
- **Tailwind CSS** — Utility-first CSS framework for rapid, responsive design
- **JavaScript (ES6+)** — Main programming language
- **Node.js & npm** — Dependency management and local development

---

## 🚀 Why This Project Stands Out

- **Modern, mobile-friendly UI** with Tailwind CSS
- **Separate dashboards** and navigation for users and hotel partners
- **Secure Google & Email/Password authentication** via Firebase
- **Persistent login state** (auto-login after refresh)
- **Modular, extendable React component structure**
- **Placeholder pages** for all major navigation items (easy to expand)
- **Blazing-fast development** with Vite

---

## 🗂️ Project Structure

- `src/components/layout/` — Navbars, Footer, and layout components
- `src/components/home/` — Home page sections (Hero, Featured, Categories, Destinations)
- `src/components/dashboard/` — User and Partner dashboards
- `src/components/auth/` — Authentication modals and forms
- `src/components/ui/` — Reusable UI elements (Button, Card, Input, Modal)
- `src/lib/` — Firebase config, Auth context, and utilities
- `src/pages/` — Placeholder and future route pages

---

## 🛠️ Getting Started — Step-by-Step

1. **Clone the repository from GitHub**
   ```powershell
   git clone <your-github-repo-link>
   cd "Resto - hotel_and_travel_booking_platform"
   ```
2. **Install all npm dependencies**
   ```powershell
   npm install
   ```
3. **Configure Firebase**
   - Copy your Firebase config into `src/lib/firebaseConfig.js`.
   - Enable Google and/or Email/Password authentication in the Firebase Console.
4. **Run the app locally**
   ```powershell
   npm run dev
   ```
5. **Login as a user or partner**
   - Use the Sign In/Sign Up/Partner Login buttons in the navbar.
   - After login, you’ll see a dedicated dashboard and navigation for your user type.

---

## 🧑‍💻 Customization & Development

- **Add new pages:**  Create files in `src/pages/` and update routes in `src/App.jsx`.
- **Modify navbars:**  Edit `src/components/layout/UserNavbar.jsx` and `PartnerNavbar.jsx`.
- **Extend authentication logic:**  Update `src/lib/AuthContext.jsx` as needed.
- **Add/Update UI components:**  Use the modular structure in `src/components/` for easy extension.

---

## 📦 Recommended Modules (Optional, for Advanced Features)

If you plan to add features like state management, API calls, or advanced UI, consider installing:

- `@reduxjs/toolkit` and `react-redux` (for state management)
- `axios` (for API requests)
- `react-query` (for data fetching/caching)
- `react-icons` (for icons)

Install with:
```powershell
npm install @reduxjs/toolkit react-redux axios react-query react-icons
```

---

## 🏁 Next Steps for the Team

- Review the codebase and structure above.
- Assign tasks for new features, UI tweaks, or bug fixes.
- Use the modular structure to add or update components/pages.
- Keep this README updated with any new setup or module requirements.

---

## License

MIT. Feel free to use and modify for your own projects.
