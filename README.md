# SocioSphere AI — Smart Society Management System

SocioSphere AI is a premium, state-of-the-art society management web application built on the MERN stack (MongoDB, Express, React, Node.js). It streamlines communication, tracking, visitor control, payments, and complaint management for modern residential societies.

## 🔗 Live Links

*   **Live Demo (Frontend):** [https://sociosphere-ai.vercel.app/](https://sociosphere-ai.vercel.app/)
*   **API Service (Backend):** [https://sociosphere-ai.onrender.com/](https://sociosphere-ai.onrender.com/)

---

## 🔑 Default Credentials (for testing)

### **Admin Portal**
Access the fully-featured management dashboard:
*   **Email:** `admin@sociosphere.ai`
*   **Password:** `admin123`

### **Resident Portal**
Sign up as a new resident or register an account. Newly signed up residents land automatically inside their dedicated portal showing flat billing and announcement cards.

---

## 🚀 Key Features

### 👤 Role-Based Portals & Authentication
*   **Secure Authentication:** Powered by JSON Web Tokens (JWT) stored securely and authenticated via server-side middleware.
*   **Admin Dashboard:** Dedicated workspace to oversee society operations, metrics, notice boards, events, complaints, and visitor logs.
*   **Resident Portal:** Simple, responsive interface for residents to submit complaints, pay dues, RSVP to events, and view official pinned announcements.

### 📊 Society Management Modules
*   **Analytics Dashboard:** Beautifully styled statistics with responsive grids and dark-mode-aware charts visualizing monthly collection targets and complaint categorizations.
*   **Resident Directory:** Admin panel to view occupancy status, add new residents, assign flats/towers, and edit profiles.
*   **Visitor Management System:** Generate digital gate passes, track real-time visitor check-in/check-out, and log visiting purposes.
*   **Complaint Desk:** Smart ticketing system with High/Medium/Low priority badges and assignment controls for staff members.
*   **Payments Desk:** Automated maintenance billing logs, UPI/Bank Transfer method markings, and status tracking (Paid/Pending/Overdue).
*   **Notice Board:** Pin important announcements to the top of the feed, categorizing notices from General to Emergency alerts.
*   **Events Calendar:** Post local community gatherings with interactive RSVP metrics.

---

## 🛠️ Technology Stack

*   **Frontend:** React (Vite), React Router DOM (v6), Lucide Icons, Vanilla CSS (with responsive custom design tokens).
*   **Backend:** Node.js, Express.js, JSON Web Tokens (JWT) for secure authentication.
*   **Database:** MongoDB Atlas (Cloud) connected via Mongoose.
*   **Hosting:** Vercel (Frontend), Render (Backend).

---

## 📂 Project Structure

```
SocioSphere AI project/
├── frontend/             # React Client code (Vite)
│   ├── src/
│   │   ├── auth/         # AuthContext API handlers
│   │   ├── components/   # UI Layout & Shared Modals
│   │   ├── context/      # Theme management
│   │   ├── pages/        # All module pages
│   │   └── index.css     # Premium Vanilla CSS design system
│   └── package.json
│
└── backend/              # Node.js Express server
    ├── config/           # DB connection setup
    ├── models/           # Mongoose schemas
    ├── controllers/      # Route logic handlers
    ├── routes/           # REST endpoints
    ├── middleware/       # JWT Token guard
    └── server.js         # Entrypoint & DB seeding logic
```

---

## 💻 Local Setup Instructions

### Prerequisites
*   Node.js (v18+)
*   MongoDB Cloud database connection or local MongoDB installation.

### Step 1: Clone the repository
```bash
git clone https://github.com/your-username/SocioSphere-AI.git
cd SocioSphere-AI
```

### Step 2: Configure the Backend
1. Navigate into the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5002
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### Step 3: Configure the Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
