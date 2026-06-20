export interface WorkRole {
  id: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  stack: string[]
}

export interface WorkExperience {
  id: string
  company: string
  location: string
  roles: WorkRole[]
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
}

export interface ResumeData {
  name: string
  title: string
  location: string
  openToRelocate: string
  email: string
  phone: string
  website: string
  linkedin: string
  github: string
  summary: string
  skills: string[]
  workExperience: WorkExperience[]
  education: Education[]
}

export const defaultResumeData: ResumeData = {
  name: 'Alexandra Chen',
  title: 'Senior Product Designer',
  location: 'San Francisco, CA',
  openToRelocate: '',
  email: 'alex.chen@email.com',
  phone: '+1 (415) 555-0192',
  website: 'alexchen.design',
  linkedin: 'linkedin.com/in/alexchen',
  github: 'github.com/alexchen',
  summary:
    'Creative and strategic product designer with 6+ years of experience crafting intuitive digital experiences. Passionate about user-centered design and building products that make a real difference.',
  skills: ['Figma', 'User Research', 'Prototyping', 'React', 'Design Systems', 'Accessibility', 'A/B Testing'],
  workExperience: [
    {
      id: '1',
      company: 'Stripe',
      location: 'San Francisco, CA',
      roles: [
        {
          id: '1a',
          role: 'Senior Product Designer',
          startDate: 'Mar 2022',
          endDate: '',
          current: true,
          description:
            'Led redesign of checkout flow, improving conversion by 23%.\nBuilt and maintained company-wide design system used by 40+ engineers.\nMentored 3 junior designers and established design review processes.',
          stack: ['Figma', 'React', 'Design Systems'],
        },
      ],
    },
    {
      id: '2',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      roles: [
        {
          id: '2a',
          role: 'Senior Product Designer',
          startDate: 'Jun 2021',
          endDate: 'Feb 2022',
          current: false,
          description:
            'Owned end-to-end design for host trust & safety features.\nDrove 0-to-1 redesign of the host dashboard, reducing support tickets by 18%.',
          stack: ['Figma', 'User Research'],
        },
        {
          id: '2b',
          role: 'Product Designer',
          startDate: 'Jun 2019',
          endDate: 'May 2021',
          current: false,
          description:
            'Designed host onboarding experience serving 4M+ hosts globally.\nPartnered with engineering and PM to ship 12 major features.\nConducted 50+ user interviews to inform product direction.',
          stack: ['Figma', 'Prototyping'],
        },
      ],
    },
    {
      id: '3',
      company: 'IDEO',
      location: 'Palo Alto, CA',
      roles: [
        {
          id: '3a',
          role: 'UX Designer',
          startDate: 'Aug 2017',
          endDate: 'May 2019',
          current: false,
          description:
            'Delivered human-centered design solutions for Fortune 500 clients.\nFacilitated design sprints and workshop sessions.',
          stack: ['Figma', 'Accessibility'],
        },
      ],
    },
  ],
  education: [
    {
      id: '1',
      school: 'Carnegie Mellon University',
      degree: 'Master of Design',
      field: 'Interaction Design',
      startDate: '2015',
      endDate: '2017',
    },
    {
      id: '2',
      school: 'UC Berkeley',
      degree: 'Bachelor of Arts',
      field: 'Cognitive Science',
      startDate: '2011',
      endDate: '2015',
    },
  ],
}
