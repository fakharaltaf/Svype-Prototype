# SVYPE - AI-Powered Job Matching Platform

> A modern job application platform combining Tinder-style swiping with AI-powered matching, career coaching, and intelligent application management.

## ✨ Key Features

### 🎯 For Job Seekers
- **AI Job Matching** - Swipe through personalized job recommendations
- **CV Generation** - AI-powered CV creation with 4 professional templates
- **Cover Letter Writer** - Generate tailored cover letters with tone options
- **Pre-Screening Quizzes** - Complete assessments with instant feedback
- **AI Onboarding** - Conversational chat to understand your career goals
- **Smart Dashboard** - Track applications and interview progress
- **Tutorial System** - Interactive guidance for first-time users
- **Dark Mode** - Comfortable viewing in any lighting

### 💼 For Employers
- **Smart Job Posting** - Create listings with pre-screening options
- **Quiz Builder** - Custom assessment creation tool
- **AI Shortlisting** - View candidates ranked by match score (up to 94%)
- **Interview Analysis** - AI-powered behavioral and authenticity scoring
- **Candidate Management** - Bulk actions and status tracking
- **Company Profiles** - 3-step onboarding wizard

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Package Manager** | npm |
| **Icons** | Lucide React |
| **Animations** | tw-animate-css |

## 📁 Project Structure

```
svype-job-app/
├── app/                    # Next.js 15 App Router
│   ├── auth/              # Login, signup pages
│   ├── protected/         # Job seeker pages (dashboard, swipe, profile, etc.)
│   ├── company/           # Employer pages (dashboard, post-job, AI features)
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── tutorial-overlay.tsx
│   ├── empty-state.tsx
│   └── loading-skeletons.tsx
├── lib/                   # Utilities and mock data
│   ├── supabase/         # Supabase configuration
│   ├── utils.ts
│   └── mock-data.ts
├── database/              # SQL schemas and seeds
├── docs/                  # Documentation
│   ├── PHASE_2_COMPLETE.md
│   ├── PHASE_3A_COMPLETE.md
│   └── PROJECT_STRUCTURE.md
└── public/                # Static assets

```

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for detailed documentation.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd svype-job-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run database migrations**
   ```bash
   # Run in order
   psql -f database/001_initial_schema.sql
   psql -f database/002_seed_jobs.sql
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open the app**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage Guide

### Job Seeker Flow
1. **Sign Up** → Create account
2. **Onboarding** → Chat with AI to set preferences
3. **Swipe** → Browse jobs (swipe right to apply, left to pass)
4. **Dashboard** → Track your applications
5. **Profile** → Generate CV/Cover Letter

### Employer Flow
1. **Company Onboarding** → Set up profile
2. **Post Job** → Create listing with pre-screening quiz
3. **Add Quiz** → Build custom questions
4. **AI Shortlist** → Review ranked candidates
5. **Interview Results** → Analyze candidate assessments

## 🎨 Development

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

### Mock Data

Currently using mock data in `lib/mock-data.ts` for:
- Sample job listings (8 jobs)
- User profiles and applications
- Company information
- Quiz questions

## 🎯 Key Features Breakdown

### Phase 2 (Completed)
✅ CV Generation with 4 templates  
✅ Cover Letter Generator  
✅ Pre-Screening Quiz system  
✅ Company Onboarding wizard  
✅ Enhanced Job Posting  
✅ Quiz Question Builder  
✅ AI Candidate Shortlisting  
✅ Interview Results Analysis  
✅ Tutorial Overlays  
✅ Empty States  
✅ Loading Skeletons  

### Phase 3A (Completed)
✅ Navigation integration  
✅ Tutorial overlays on key pages  
✅ Empty states across all pages  
✅ Loading skeletons  
✅ Quick action links  

## 📚 Documentation

- [Phase 2 Complete](docs/PHASE_2_COMPLETE.md) - All Phase 2 features documentation
- [Phase 3A Complete](docs/PHASE_3A_COMPLETE.md) - Integration and polish documentation
- [Project Structure](docs/PROJECT_STRUCTURE.md) - Detailed folder organization

## 🔮 Roadmap

### Phase 3B - Backend Integration
- [ ] Real AI API integration (OpenAI/Anthropic)
- [ ] Supabase data persistence
- [ ] Email notifications
- [ ] Real-time updates

### Phase 3C - Advanced Features
- [ ] Video interview recording
- [ ] Real-time chat system
- [ ] Advanced analytics dashboard
- [ ] Job recommendation algorithm

### Phase 3D - Mobile & Polish
- [ ] Touch gesture improvements
- [ ] PWA setup
- [ ] Offline support
- [ ] Performance optimization

## 🤝 Contributing

This is a university final year project. Contributions, issues, and feature requests are welcome!

## 📄 License

This project is for educational purposes as part of a university final year project.

## 👥 Author

Created as part of a Final Year Project at University.

## 🙏 Acknowledgments

- shadcn/ui for beautiful UI components
- Lucide for icons
- Next.js team for the framework
- Supabase for backend infrastructure

---

**Note**: This is currently a prototype using mock data. Backend integration is planned for future phases.
