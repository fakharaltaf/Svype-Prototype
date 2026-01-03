# SVYPE Project Structure

## Root Directory
```
svype-job-app/
├── app/                    # Next.js 15 App Router pages
├── components/             # Reusable React components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and data
├── public/                 # Static assets (images, icons)
├── database/               # Database schemas and seed data
├── docs/                   # Project documentation
└── [config files]          # Next.js, TypeScript, Tailwind configs
```

---

## App Directory Structure

### Job Seeker Pages (`/app/protected/`)
```
protected/
├── dashboard/              # Applications overview
├── swipe/                  # Job swipe interface (main feature)
├── profile/                # User profile and settings
├── saved/                  # Saved/bookmarked jobs
├── generate-cv/            # AI CV generation
├── generate-cover-letter/  # AI cover letter generation
├── pre-screening-quiz/     # Pre-screening assessments
└── onboarding/             # User onboarding flow
```

### Employer Pages (`/app/company/`)
```
company/
├── dashboard/              # Company overview
├── onboarding/             # Company profile setup
├── post-job/               # Job posting form
├── add-quiz-questions/     # Quiz builder for pre-screening
├── ai-shortlist/           # AI-powered candidate ranking
└── interview-results/[id]/ # AI interview analysis results
```

### Auth Pages (`/app/auth/`)
```
auth/
├── login/                  # Login page
├── sign-up/                # Registration page
└── sign-up-success/        # Post-registration confirmation
```

### API Routes (`/app/api/`)
```
api/
└── onboarding/
    └── chat/               # AI chat endpoint for onboarding
```

---

## Components Directory

### UI Components (`/components/ui/`)
shadcn/ui components - buttons, cards, dialogs, etc.

### Custom Components (`/components/`)
```
components/
├── bottom-nav.tsx          # Mobile bottom navigation
├── theme-provider.tsx      # Dark/light mode provider
├── tutorial-overlay.tsx    # First-time user tutorials
├── empty-state.tsx         # Empty state illustrations
└── loading-skeletons.tsx   # Loading skeleton screens
```

---

## Library Directory (`/lib/`)
```
lib/
├── utils.ts                # General utility functions
├── mock-data.ts            # Mock data for development
└── supabase/
    ├── client.ts           # Supabase client-side config
    ├── server.ts           # Supabase server-side config
    └── proxy.ts            # Supabase proxy configuration
```

---

## Database Directory (`/database/`)
```
database/
├── 001_initial_schema.sql  # Initial database schema
└── 002_seed_jobs.sql       # Sample job data for testing
```

---

## Public Assets (`/public/`)
```
public/
├── apple-icon.png          # iOS app icon
├── icon.svg                # App icon (SVG)
├── icon-dark-32x32.png     # Dark mode favicon
├── icon-light-32x32.png    # Light mode favicon
└── diverse-person-portrait.png  # Default user avatar
```

---

## Documentation (`/docs/`)
```
docs/
├── PHASE_2_COMPLETE.md     # Phase 2 features documentation
├── PHASE_3A_COMPLETE.md    # Phase 3A integration documentation
└── PROJECT_STRUCTURE.md    # This file
```

---

## Configuration Files

### Next.js & TypeScript
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript compiler options
- `next-env.d.ts` - Next.js TypeScript declarations

### Styling
- `postcss.config.mjs` - PostCSS configuration
- `components.json` - shadcn/ui component config
- `app/globals.css` - Global styles and Tailwind

### Package Management
- `package.json` - Dependencies and scripts
- `pnpm-lock.yaml` - Package lockfile

### Environment
- `.env.local` - Local environment variables
- `.env.local.example` - Example environment template
- `.gitignore` - Git ignore rules

### Middleware
- `middleware.ts` - Next.js middleware for auth/routing

---

## Key Features by Directory

### Job Seeker Flow
1. **Auth** → Sign up/Login
2. **Onboarding** → AI chat to gather preferences
3. **Swipe** → Browse and apply to jobs (Tinder-style)
4. **Dashboard** → Track applications
5. **Profile** → Manage settings and goals
6. **Generate CV/Cover Letter** → AI-powered document generation
7. **Pre-screening Quiz** → Complete employer assessments

### Employer Flow
1. **Company Onboarding** → Set up company profile
2. **Post Job** → Create job listings with pre-screening
3. **Add Quiz Questions** → Build custom assessments
4. **AI Shortlist** → View AI-ranked candidates
5. **Interview Results** → Analyze AI interview assessments

---

## Development Workflow

### Running the App
```bash
npm dev          # Start development server
npm build        # Production build
npm start        # Start production server
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: npm
- **Icons**: Lucide React
- **Animations**: tw-animate-css

---

## Best Practices

### File Naming
- Pages: `page.tsx`
- Components: `kebab-case.tsx`
- Utilities: `camelCase.ts`

### Component Structure
- Use `"use client"` for client components
- Server components by default
- Co-locate related components

### State Management
- React hooks for local state
- Server components for data fetching
- Mock data in `lib/mock-data.ts`

### Styling
- Tailwind utility classes
- shadcn/ui for complex components
- CSS variables for theming
