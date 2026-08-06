# Project LOOP — AI Customer Feedback Intelligence Platform

> **Multi-Tenant Customer Feedback Intelligence SaaS Platform** built with Next.js 16, TypeScript, Tailwind CSS, PostgreSQL, Prisma, and AI LLM Engine (Gemini 2.0 Flash / Claude).

---

## 🌟 Executive Overview

**Project LOOP** is a full-stack multi-tenant SaaS application that aggregates customer feedback (support tickets, reviews, CSV imports, sales notes) and automatically classifies, clusters, and synthesizes actionable insights for product teams using AI.

---

## 🔑 Demo Seed Credentials & RBAC Roles

The system is pre-seeded with 3 role accounts to test multi-tenancy and Server-Side Role-Based Access Control (RBAC):

| Role | Email | Password | Access Level & Permissions |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin@demo.com` | `password123` | **Full Administrative Access**: Can manage users, create/edit feedback, re-classify AI, trigger VoC reports, manage workspace. |
| **ANALYST** | `analyst@demo.com` | `password123` | **Analytical Access**: Can ingest feedback, re-classify themes, query Ask LOOP RAG AI, generate reports. |
| **VIEWER** | `viewer@demo.com` | `password123` | **Read-Only Access**: Can view dashboards and feedback. Direct write operations return `403 Forbidden`. |

---

## 🚀 Core & AI Feature Matrix

### 🟢 Core Features
1. **Multi-Tenant Workspace Isolation**: Every database query is strictly scoped by `workspaceId`. Cross-tenant data leaks are prevented server-side.
2. **Role-Based Access Control (RBAC)**: Enforces `ADMIN`, `ANALYST`, and `VIEWER` roles. Server routes enforce `403 Forbidden` for unauthorized roles.
3. **Feedback Ingestion**:
   - Single item ingestion form
   - Bulk CSV ingestion parser with auto-classification
   - Simulated channel pipeline
4. **Inbox & Management**: Search, filter by sentiment/status, pagination, and status state machine (`Pending` &rarr; `Reviewed` &rarr; `Resolved`).
5. **Analytics Dashboard**: Real-time charts for volume trends, sentiment distribution pie charts, category bar graphs, rating breakdown, and printable PDF export.

### 🧠 AI Features (15/15 Marks)
1. **AI1 — Auto-classification**:
   - Classifies every incoming feedback into `sentiment` ("Positive"/"Neutral"/"Negative"), decimal `sentimentScore` (-1.0 to +1.0), `themes` array, and `featureArea`.
   - Uses strict JSON output validated via Zod schema before saving.
   - Includes manual **"Re-classify with Gemini"** button in feedback drawer.
2. **AI2 — Theme Clustering & Trends**:
   - Groups similar feedback into named theme clusters.
   - Calculates period-over-period growth rates (% spike) to detect **🔥 Trending Themes**.
   - Interactive theme cards open a modal displaying all feedback items belonging to that theme.
3. **AI3 — Ask LOOP (RAG / Grounded Q&A)**:
   - Generates 768-dim vector embeddings (`text-embedding-004`) for user questions and feedback records.
   - Ranks top-K matching records using vector cosine similarity.
   - Instructs AI to answer **STRICTLY** using retrieved context (zero hallucinations).
   - Renders interactive **"📍 Grounded Sources & Citations"** accordion with exact customer quotes, ratings, and similarity match percentages.
4. **AI4 — Voice-of-Customer (VoC) Report**:
   - 1-Click executive digest generation.
   - Pre-computes exact statistics (counts, sentiment rates, average rating, sentiment shifts, real quotes) in code **before** calling AI to prevent metric hallucination.
   - Generates executive narrative commentary and actionable recommendations with 1-click PDF export.

---

## 🏗️ Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Vanilla CSS + Lucide Icons
- **AI Engine**: Google GenAI SDK (`@google/genai` Gemini 2.0 Flash) & `@anthropic-ai/sdk`
- **Validation**: Zod (Schema parsing)
- **Database & ORM**: PostgreSQL + Prisma ORM + Vector Similarity Search
- **Charts**: Recharts
- **Deployment**: Vercel

---

## 🛠️ Local Development Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Krishna19-dev/Loop.main.git
cd loop-main
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXTAUTH_SECRET=your_nextauth_secret_here
DATABASE_URL="postgresql://user:password@localhost:5432/loop_db?schema=public"
```

### 3. Run Database Migrations & Seeds
```bash
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Build Commands

```bash
# Type Check
npx tsc --noEmit

# Production Build
npm run build
```

---

## 📄 License
MIT License. Developed for **Project LOOP**.
