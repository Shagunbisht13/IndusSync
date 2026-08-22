# IndusSync - AI-Powered Industrial Parts Data Platform

IndusSync is a modern, responsive web application designed for B2B industrial/manufacturing businesses. It helps organizations clean, enrich, and manage messy parts catalog data using AI—detecting issues (missing manufacturers, dimensions, HSN codes, ambiguous descriptions, duplicates) and automatically fixing them with reviewable AI suggestions.

## 🚀 Features (In Development)

*   **Mock Authentication:** Role-based access (Admin/Editor) simulating real enterprise security.
*   **Interactive Dashboard:** Live KPIs, charts, and global search functionality.
*   **Parts Catalog:** A fully sortable, filterable, and searchable table of industrial parts with "Fix with AI" capabilities.
*   **Bulk Import:** Drag-and-drop CSV/Excel upload simulation.
*   **Inventory & Purchase Orders:** Stock level tracking and automated PO generation.
*   **Supplier Directory:** A complete CRUD interface for managing supplier relationships.
*   **Audit Logging:** A chronological feed tracking all manual and AI-driven data changes.

## 🛠️ Technology Stack

*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS + Vanilla CSS (Custom SaaS Variables)
*   **State Management:** Zustand (with LocalStorage persistence)
*   **Routing:** React Router v6
*   **Charts:** Recharts
*   **Icons:** Lucide React
*   **Notifications:** React Hot Toast

## ⚙️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173/`).

### How to Log In
The application uses a simulated mock-authentication system. To log in:
*   **Email:** Use any valid email address format. (e.g., `admin@indussync.com` to get Admin privileges).
*   **Password:** Use any password that is at least 6 characters long.

## 📂 Project Structure

*   `/src/components`: Reusable UI components (Sidebar, Header, Layout).
*   `/src/pages`: Main application views (Dashboard, Catalog, Login, etc.).
*   `/src/store`: Global Zustand state management (`useAppStore.js`).
*   `/src/data`: Mock data for seeding the initial state.
*   `/public/assets`: Static images and background assets.

## 📝 License
This project was created as part of a hackathon submission.
