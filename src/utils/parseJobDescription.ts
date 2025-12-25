import { JobRequirements } from '@/types';

const COMMON_SKILLS = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'php', 'ruby',
  'react', 'vue', 'angular', 'next.js', 'node.js', 'express', 'django', 'flask', 'spring',
  'laravel', 'rails', 'graphql', 'rest api', 'sql', 'mysql', 'postgresql', 'mongodb',
  'redis', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'git', 'agile',
  'html', 'css', 'tailwind', 'sass', 'webpack', 'redux', 'tensorflow', 'machine learning',
  'figma', 'ui/ux'
];

const REQUIRED_KEYWORDS = ['required', 'must have', 'essential', 'mandatory', 'need'];
const PREFERRED_KEYWORDS = ['preferred', 'nice to have', 'bonus', 'plus', 'good to have'];

function findSkillsInText(text: string): string[] {
  const lowerText = text.toLowerCase();
  const foundSkills: string[] = [];

  COMMON_SKILLS.forEach((skill) => {
    if (lowerText.includes(skill)) {
      foundSkills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
    }
  });

  return foundSkills;
}

function extractExperience(text: string): number {
  const patterns = [
    /(\d+)\+?\s*years?\s*(?:of\s*)?experience/i,
    /experience[:\s]*(\d+)\+?\s*years?/i,
    /minimum\s*(\d+)\s*years?/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  return 0;
}

function extractLocation(text: string): string {
  const commonLocations = [
    'new york', 'san francisco', 'los angeles', 'chicago', 'austin', 'seattle',
    'boston', 'denver', 'miami', 'remote', 'hybrid'
  ];

  const lowerText = text.toLowerCase();
  
  for (const location of commonLocations) {
    if (lowerText.includes(location)) {
      return location.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }

  return '';
}

function extractSalaryRange(text: string): { min: number; max: number } | undefined {
  const patterns = [
    /\$?(\d{2,3}),?(\d{3})?\s*[-–to]+\s*\$?(\d{2,3}),?(\d{3})?/i,
    /(\d{2,3})k\s*[-–to]+\s*(\d{2,3})k/i,
  ];

  const kMatch = text.match(patterns[1]);
  if (kMatch) {
    return {
      min: parseInt(kMatch[1], 10) * 1000,
      max: parseInt(kMatch[2], 10) * 1000,
    };
  }

  const fullMatch = text.match(patterns[0]);
  if (fullMatch) {
    const min = parseInt(fullMatch[1] + (fullMatch[2] || ''), 10);
    const max = parseInt(fullMatch[3] + (fullMatch[4] || ''), 10);
    if (min > 0 && max > 0) {
      return { min, max };
    }
  }

  return undefined;
}

export function parseJobDescription(jobDescription: string): JobRequirements {
  const allSkills = findSkillsInText(jobDescription);
  const requiredSkills: string[] = [];
  const preferredSkills: string[] = [];

  const sentences = jobDescription.split(/[.!?\n]/);

  sentences.forEach((sentence) => {
    const lowerSentence = sentence.toLowerCase();
    const skillsInSentence = findSkillsInText(sentence);

    const isRequired = REQUIRED_KEYWORDS.some((kw) => lowerSentence.includes(kw));
    const isPreferred = PREFERRED_KEYWORDS.some((kw) => lowerSentence.includes(kw));

    skillsInSentence.forEach((skill) => {
      if (isPreferred && !requiredSkills.includes(skill)) {
        if (!preferredSkills.includes(skill)) preferredSkills.push(skill);
      } else if (!requiredSkills.includes(skill)) {
        requiredSkills.push(skill);
      }
    });
  });

  if (requiredSkills.length === 0 && preferredSkills.length === 0) {
    const midpoint = Math.ceil(allSkills.length / 2);
    requiredSkills.push(...allSkills.slice(0, midpoint));
    preferredSkills.push(...allSkills.slice(midpoint));
  }

  return {
    requiredSkills,
    preferredSkills,
    minExperience: extractExperience(jobDescription),
    location: extractLocation(jobDescription),
    salaryRange: extractSalaryRange(jobDescription),
  };
}
