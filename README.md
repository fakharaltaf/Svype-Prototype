# Talash - Job Application Prototype

A Tinder-style job swiping application built with Next.js. This is a **prototype version** using mock data for demonstration purposes.

## 🎯 Features

- **Swipe Interface**: Tinder-style job swiping with smooth animations
- **Dashboard**: Track your applications and their status
- **Profile**: View your career goals and interests
- **Bottom Navigation**: Easy navigation between main app sections

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Prototype Notes

This version uses **mock data stored in localStorage** instead of a real backend. This means:

- ✅ No backend setup required
- ✅ No API keys needed
- ✅ Works completely offline
- ✅ Perfect for prototyping and demonstrations
- ⚠️ Data resets when localStorage is cleared
- ⚠️ No real authentication (any credentials work)

## 🎨 Mock Data

The prototype includes:
- **8 sample jobs** with various roles and companies
- **2 pre-applied applications** to demonstrate the dashboard
- **Sample profile** with career goals and interests

All data is defined in `lib/mock-data.ts` and stored in localStorage.

## 🔐 Authentication

For prototype purposes:
- Any email/password combination will log you in
- No signup confirmation required
- All users see the same mock data

## 🗂️ Project Structure

```
app/
├── auth/                 # Login and signup pages
├── protected/            # Main app pages (require "login")
│   ├── swipe/           # Job swiping interface
│   ├── dashboard/       # Applications dashboard
│   ├── profile/         # User profile
│   └── onboarding/      # Simplified onboarding (no AI)
components/
├── bottom-nav.tsx       # Global navigation component
└── ui/                  # shadcn/ui components
lib/
├── mock-data.ts         # All mock data and localStorage logic
└── utils.ts             # Utility functions
```

## 🎭 Key Files

### `lib/mock-data.ts`
Contains all mock data and functions:
- `mockJobs` - Sample job listings
- `mockApplications` - Pre-applied jobs
- `mockProfile` - User profile data
- `getAvailableJobs()` - Get jobs not yet swiped
- `applyToJob(job)` - Apply to a job
- `discardJob(jobId)` - Discard a job
- `getApplications()` - Get all applications
- `getProfile()` - Get user profile

### Storage Keys
Data is stored in localStorage with these keys:
- `talash_jobs` - All available jobs
- `talash_applications` - Jobs you've applied to
- `talash_discarded` - Jobs you've passed on
- `talash_profile` - Your profile information

## 🔄 Converting to Production

To convert this prototype to a production app with a real backend:

1. **Set up Supabase** (or your backend of choice)
2. **Restore authentication**:
   - Update `app/auth/login/page.tsx`
   - Update `app/auth/sign-up/page.tsx`
   - Uncomment auth checks in `middleware.ts`
3. **Replace mock data calls** in:
   - `app/protected/swipe/page.tsx`
   - `app/protected/dashboard/page.tsx`
   - `app/protected/profile/page.tsx`
4. **Add real APIs** for job fetching and applications
5. **Implement real AI chat** in onboarding page

## 🛠️ Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Framer Motion** - Animations
- **localStorage** - Mock data persistence

## 📱 Usage

1. **Login**: Use any credentials (e.g., `test@example.com` / `password`)
2. **Swipe**: Drag cards left to pass, right to apply (or use buttons)
3. **Undo**: After discarding, you have 5 seconds to undo
4. **Dashboard**: View all your applications
5. **Profile**: See your career information

## 🎨 Customization

To modify the mock data, edit `lib/mock-data.ts`:

```typescript
// Add more jobs
export const mockJobs: Job[] = [
  {
    id: '9',
    title: 'Your New Job',
    company: 'Your Company',
    // ... more fields
  },
  // ... existing jobs
]

// Update profile
export const mockProfile: Profile = {
  full_name: 'Your Name',
  email: 'your@email.com',
  // ... more fields
}
```

## 📄 License

This is a prototype project for demonstration purposes.

## 🤝 Support

For questions or issues, please contact the development team.

---

**Note**: This is a prototype version using mock data. No real backend or authentication is implemented.
