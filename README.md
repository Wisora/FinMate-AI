# FinMate AI

FinMate AI is a modern SaaS finance assistant designed to help users track budgets, manage goals, and connect payments seamlessly.  
It integrates with Supabase for backend services, Vercel for deployment, and PayFast for verified payment processing.

## 🚀 Features

- Budget tracking with weekly reports
- Goal management and progress visualization
- Supabase backend (auth, storage, Postgres)
- Vercel CI/CD pipeline for automatic deploys
- PayFast integration for secure payments
- Accessibility and multilingual support

## 🛠️ Tech Stack

- **Frontend**: React + Vercel
- **Backend**: Supabase (Postgres, Auth, Storage)
- **CI/CD**: GitHub Actions + Vercel
- **Payments**: PayFast

## 📦 Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/wisora/fin-mate-ai.git
   cd fin-mate-ai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add environment variables in `.env.local`:

   ```bash
   VERCEL_TOKEN=your-vercel-token
   VERCEL_ORG_ID=your-vercel-org-id
   VERCEL_PROJECT_ID=your-vercel-project-id
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run locally:

   ```bash
   npm run dev
   ```

## ✅ Deployment

- Push to `main` → GitHub Actions runs tests + deploys to Vercel.
- Live app URL: `https://fin-mate-ai.vercel.app`

## 🤝 Contributing

Contributions are welcome!

- Fork the repo
- Create a feature branch
- Submit a pull request with clear commit messages

## 📜 License

This project is licensed under the MIT License.  
You are free to use, modify, and distribute with proper attribution.

## 📌 Notes

- Supabase free tier pauses after 7 days idle — unpause manually until upgrade.
- PayFast requires verified callback URL → use your Vercel live domain.

## 🔄 Test Deploy Trigger

This line is added to confirm CI/CD pipeline runs correctly.
