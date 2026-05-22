<div align="center">

# 🤖 AI SaaS Platform

### Full-Stack AI Application with Subscription Billing

*Built with the PERN Stack — PostgreSQL · Express · React · Node.js*

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)](https://clerk.dev)
[![Stripe](https://img.shields.io/badge/Billing-Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

<br/>

> A production-ready AI SaaS application with subscription-based access to premium AI features — article generation, image tools, resume analysis, and more.

</div>

---

## 📌 Overview

This project is a **fully functional AI SaaS Application** built on the **PERN stack** (PostgreSQL, Express, React, Node.js). It covers everything from authentication and billing to multiple AI-powered tools — making it an ideal blueprint for building modern SaaS products.

---

## ✨ Features

### 🔐 User Authentication — Clerk
- Secure **Sign Up / Sign In** with email & social OAuth
- **Profile management** — avatar, name, email
- Session handling & JWT-based route protection

### 💳 Subscription Billing — Stripe
- **Free tier** with limited access
- **Premium tier** unlocking all AI features
- Billing portal for plan management
- Webhook handling for real-time subscription events

### 🗄️ Database — Neon PostgreSQL
- Serverless, auto-scaling PostgreSQL
- Tables for users, subscriptions & usage logs
- Connection pooling for production performance

---

## 🤖 AI-Powered Tools

| Tool | Description | Tier |
|------|-------------|------|
| 📝 **Article Generator** | Enter a title & length to generate full AI-written articles | Premium |
| 💡 **Blog Title Generator** | Enter a keyword & category to get AI-curated blog title ideas | Premium |
| 🖼️ **Image Generator** | Describe a scene or concept to generate unique AI images | Premium |
| ✂️ **Background Remover** | Upload any image and get a clean transparent background instantly | Premium |
| 🧹 **Object Remover** | Upload an image, name an object — AI removes it seamlessly | Premium |
| 📄 **Resume Analyzer** | Upload your resume for a complete AI-powered analysis & feedback | Premium |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router v6
- Clerk React SDK
- Axios

**Backend**
- Node.js + Express.js
- Clerk Express SDK (auth middleware)
- Stripe SDK (subscriptions & payments)
- Multer (file uploads)

**Database**
- PostgreSQL via [Neon](https://neon.tech) (serverless)
- `pg` — Node.js PostgreSQL client

**AI & External APIs**
- OpenAI API — article, blog titles, image generation
- Clipdrop / Remove.bg — background removal
- IOPaint / Inpaint API — object removal

---

## 🗂️ Project Structure

```
ai-saas-platform/
├── client/                          # React frontend
│   └── src/
│       ├── components/              # Navbar, Sidebar, PricingCard ...
│       ├── pages/                   # Home, Dashboard, each AI tool page
│       ├── context/                 # Global state
│       ├── hooks/                   # Custom React hooks
│       └── utils/                   # Helper functions
│
└── server/                          # Express backend
    ├── config/
    │   └── db.js                    # Neon PostgreSQL connection
    ├── controllers/                 # Auth, AI, Billing, Upload
    ├── middleware/                  # Clerk auth, subscription check, upload
    ├── routes/                      # AI, billing, user routes
    ├── services/                    # OpenAI, image, Stripe services
    ├── webhooks/
    │   └── stripeWebhook.js
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** or **yarn**
- Accounts on: [Clerk](https://clerk.dev) · [Neon](https://neon.tech) · [Stripe](https://stripe.com) · [OpenAI](https://platform.openai.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ai-saas-platform.git
cd ai-saas-platform

# 2. Install server dependencies
cd server && npm install

# 3. Install client dependencies
cd ../client && npm install
```

### Environment Variables

**`server/.env`**
```env
PORT=5000
NODE_ENV=development

# Neon PostgreSQL
DATABASE_URL=your_neon_postgres_connection_string

# Clerk
CLERK_SECRET_KEY=your_clerk_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PREMIUM_PRICE_ID=your_stripe_price_id

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Image APIs
CLIPDROP_API_KEY=your_clipdrop_api_key
REMOVE_BG_API_KEY=your_removebg_api_key
```

**`client/.env`**
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://localhost:5000/api
```

### Database Setup

Run the following SQL in your Neon dashboard:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  clerk_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  subscription_status VARCHAR(50) DEFAULT 'free',
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  stripe_subscription_id VARCHAR(255) UNIQUE,
  plan VARCHAR(50) DEFAULT 'free',
  status VARCHAR(50),
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE usage_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  feature VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Run the App

```bash
# Start the backend (from /server)
npm run dev

# Start the frontend in a new terminal (from /client)
npm run dev
```

App runs at **http://localhost:5173**

---

## 📸 Screenshots

| Landing Page | Dashboard | AI Tools |
|:---:|:---:|:---:|
| ![Landing](./screenshots/landing.png) | ![Dashboard](./screenshots/dashboard.png) | ![Tools](./screenshots/tools.png) |

---

## 💡 How to Use

**Free Tier** — Access the dashboard and preview AI tools with limited usage.

**Premium Tier**
1. Go to the **Pricing** page
2. Click **Upgrade to Premium**
3. Complete checkout via Stripe
4. All AI tools unlock immediately

**Using the AI Tools**
- **Article Generator** → Enter title + word count → Generate
- **Blog Title Generator** → Enter keyword + category → Get 10 AI titles
- **Image Generator** → Write a detailed prompt → Generate image
- **Background Remover** → Upload image → Download with transparent background
- **Object Remover** → Upload image + describe object → Download clean image
- **Resume Analyzer** → Upload PDF resume → Get detailed AI feedback

---

## 🔒 Security

- All API routes protected with **Clerk JWT middleware**
- Premium routes verify **subscription status** before processing
- **Stripe Webhooks** use signature verification
- Environment variables never exposed to the client
- File uploads validated for type and size

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a **Pull Request**

---

## 📄 License

Licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

- [Clerk](https://clerk.dev) — Authentication made simple
- [Neon](https://neon.tech) — Serverless PostgreSQL
- [Stripe](https://stripe.com) — Payment infrastructure
- [OpenAI](https://openai.com) — AI APIs
- [Clipdrop](https://clipdrop.co/apis) — Image processing APIs

---

<div align="center">
<br/>
<strong>⭐ Star this repo if you found it helpful!</strong>
<br/><br/>

Made with ❤️ using the PERN Stack

</div>
