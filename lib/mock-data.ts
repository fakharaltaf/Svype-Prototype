// Mock data for prototype - no backend required

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary_min: number;
  salary_max: number;
  description: string;
  requirements: string[];
  posted_at: string;
}

export interface Application {
  id: string;
  job: Job;
  status: 'active' | 'closed';
  applied_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  career_goals: string;
  interests: string[];
  life_goals: string;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp Inc.',
    location: 'London, UK',
    type: 'Full-time',
    salary_min: 70000,
    salary_max: 90000,
    description: 'Join our team to build amazing web applications using React and Next.js. We\'re looking for someone passionate about user experience and modern web technologies.',
    requirements: ['React', 'TypeScript', 'Next.js', '5+ years experience'],
    posted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Design Studio',
    location: 'Remote',
    type: 'Full-time',
    salary_min: 55000,
    salary_max: 75000,
    description: 'Create beautiful and intuitive user interfaces for web and mobile applications. Work closely with developers to bring designs to life.',
    requirements: ['Figma', 'UI/UX Design', 'Prototyping', '3+ years experience'],
    posted_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'DataSystems Ltd',
    location: 'Manchester, UK',
    type: 'Full-time',
    salary_min: 60000,
    salary_max: 80000,
    description: 'Build scalable APIs and microservices. Work with PostgreSQL, Node.js, and cloud infrastructure.',
    requirements: ['Node.js', 'PostgreSQL', 'REST APIs', 'Docker', '4+ years experience'],
    posted_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'Marketing Lead',
    company: 'Growth Agency',
    location: 'Birmingham, UK',
    type: 'Full-time',
    salary_min: 50000,
    salary_max: 70000,
    description: 'Lead marketing campaigns and grow our client base. Experience with digital marketing and content strategy required.',
    requirements: ['Digital Marketing', 'Content Strategy', 'Analytics', '5+ years experience'],
    posted_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'Full Stack Developer',
    company: 'Startup Co',
    location: 'London, UK',
    type: 'Full-time',
    salary_min: 65000,
    salary_max: 85000,
    description: 'Join an exciting startup building the next generation of SaaS products. Work across the entire stack.',
    requirements: ['React', 'Node.js', 'MongoDB', 'AWS', '3+ years experience'],
    posted_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Remote',
    type: 'Contract',
    salary_min: 75000,
    salary_max: 95000,
    description: 'Manage cloud infrastructure and CI/CD pipelines. Experience with AWS and Kubernetes required.',
    requirements: ['AWS', 'Kubernetes', 'Docker', 'CI/CD', '5+ years experience'],
    posted_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    title: 'Mobile Developer',
    company: 'AppFactory',
    location: 'Edinburgh, UK',
    type: 'Full-time',
    salary_min: 60000,
    salary_max: 80000,
    description: 'Build native mobile applications for iOS and Android. React Native experience preferred.',
    requirements: ['React Native', 'iOS', 'Android', '4+ years experience'],
    posted_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '8',
    title: 'Data Scientist',
    company: 'AI Innovations',
    location: 'Cambridge, UK',
    type: 'Full-time',
    salary_min: 70000,
    salary_max: 95000,
    description: 'Apply machine learning to solve complex business problems. Python and TensorFlow experience required.',
    requirements: ['Python', 'Machine Learning', 'TensorFlow', 'Statistics', '5+ years experience'],
    posted_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    job: mockJobs[0],
    status: 'active',
    applied_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'app-2',
    job: mockJobs[4],
    status: 'active',
    applied_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockProfile: Profile = {
  id: 'user-1',
  email: 'demo@example.com',
  full_name: 'Alex Johnson',
  avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  career_goals: 'To become a lead developer at a tech company and mentor junior developers while working on cutting-edge projects.',
  interests: ['Web Development', 'UI/UX Design', 'Cloud Computing', 'AI/ML', 'Open Source'],
  life_goals: 'Achieve work-life balance, travel the world, and contribute to meaningful projects that make a positive impact.',
};

// Local storage keys
const STORAGE_KEYS = {
  JOBS: 'talash_jobs',
  APPLICATIONS: 'talash_applications',
  DISCARDED: 'talash_discarded',
  PROFILE: 'talash_profile',
};

// Initialize local storage with mock data if empty
export function initializeMockData() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(mockJobs));
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(mockApplications));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DISCARDED)) {
    localStorage.setItem(STORAGE_KEYS.DISCARDED, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(mockProfile));
  }
}

// Reset all data to initial state
export function resetMockData() {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(mockJobs));
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(mockApplications));
  localStorage.setItem(STORAGE_KEYS.DISCARDED, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(mockProfile));
}

// Get available jobs (excluding applied and discarded)
export function getAvailableJobs(): Job[] {
  if (typeof window === 'undefined') return mockJobs;

  const applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]') as Application[];
  const discarded = JSON.parse(localStorage.getItem(STORAGE_KEYS.DISCARDED) || '[]') as string[];
  const appliedJobIds = applications.map(app => app.job.id);
  const excludedIds = [...appliedJobIds, ...discarded];

  const allJobs = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS) || JSON.stringify(mockJobs)) as Job[];
  return allJobs.filter(job => !excludedIds.includes(job.id));
}

// Apply to a job
export function applyToJob(job: Job): void {
  if (typeof window === 'undefined') return;

  const applications = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]') as Application[];
  const newApplication: Application = {
    id: `app-${Date.now()}`,
    job,
    status: 'active',
    applied_at: new Date().toISOString(),
  };
  applications.push(newApplication);
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
}

// Discard a job
export function discardJob(jobId: string): void {
  if (typeof window === 'undefined') return;

  const discarded = JSON.parse(localStorage.getItem(STORAGE_KEYS.DISCARDED) || '[]') as string[];
  if (!discarded.includes(jobId)) {
    discarded.push(jobId);
    localStorage.setItem(STORAGE_KEYS.DISCARDED, JSON.stringify(discarded));
  }
}

// Undo discard
export function undoDiscard(jobId: string): void {
  if (typeof window === 'undefined') return;

  const discarded = JSON.parse(localStorage.getItem(STORAGE_KEYS.DISCARDED) || '[]') as string[];
  const filtered = discarded.filter(id => id !== jobId);
  localStorage.setItem(STORAGE_KEYS.DISCARDED, JSON.stringify(filtered));
}

// Get all applications
export function getApplications(): Application[] {
  if (typeof window === 'undefined') return mockApplications;

  return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || JSON.stringify(mockApplications)) as Application[];
}

// Get profile
export function getProfile(): Profile {
  if (typeof window === 'undefined') return mockProfile;

  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE) || JSON.stringify(mockProfile)) as Profile;
}

// Update profile
export function updateProfile(profile: Partial<Profile>): void {
  if (typeof window === 'undefined') return;

  const currentProfile = getProfile();
  const updatedProfile = { ...currentProfile, ...profile };
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updatedProfile));
}
