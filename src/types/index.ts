export interface Candidate {
  id: number;
  name: string;
  email: string;
  skills: string[];
  yearsOfExperience: number;
  location: string;
  salaryExpectation?: number;
  resumeText: string;
}

export interface JobRequirements {
  requiredSkills: string[];
  preferredSkills: string[];
  minExperience: number;
  location: string;
  salaryRange?: {
    min: number;
    max: number;
  };
}

export interface RecruiterFilters {
  selectedSkills: string[];
  minExperience: number;
  selectedLocations: string[];
  maxSalary?: number;
}

export interface ScoredCandidate extends Candidate {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  experienceFit: 'under' | 'meets' | 'exceeds';
}

export interface FilterRequest {
  jobDescription: string;
  jobRequirements: JobRequirements;
  recruiterFilters: RecruiterFilters;
  candidates: Candidate[];
}

export interface FilterResponse {
  rankedCandidates: ScoredCandidate[];
  totalCandidates: number;
  filteredOut: number;
}
