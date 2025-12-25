import { Candidate, JobRequirements, RecruiterFilters, ScoredCandidate } from '@/types';

export function filterCandidates(
  candidates: Candidate[],
  filters: RecruiterFilters
): Candidate[] {
  return candidates.filter((candidate) => {
    if (candidate.yearsOfExperience < filters.minExperience) {
      return false;
    }

    if (filters.selectedLocations.length > 0) {
      const candidateLocation = candidate.location.toLowerCase();
      const matchesLocation = filters.selectedLocations.some(
        (loc) => loc.toLowerCase() === candidateLocation || candidateLocation === 'remote'
      );
      if (!matchesLocation) {
        return false;
      }
    }

    if (filters.maxSalary && candidate.salaryExpectation) {
      if (candidate.salaryExpectation > filters.maxSalary) {
        return false;
      }
    }

    return true;
  });
}

export function scoreCandidate(
  candidate: Candidate,
  jobReq: JobRequirements,
  recruiterFilters: RecruiterFilters
): ScoredCandidate {
  let score = 0;
  const candidateSkillsLower = candidate.skills.map((s) => s.toLowerCase());

  const matchedRequired = jobReq.requiredSkills.filter((skill) =>
    candidateSkillsLower.includes(skill.toLowerCase())
  );
  const requiredSkillScore =
    jobReq.requiredSkills.length > 0
      ? (matchedRequired.length / jobReq.requiredSkills.length) * 0.5
      : 0;

  const matchedPreferred = jobReq.preferredSkills.filter((skill) =>
    candidateSkillsLower.includes(skill.toLowerCase())
  );
  const preferredSkillScore =
    jobReq.preferredSkills.length > 0
      ? (matchedPreferred.length / jobReq.preferredSkills.length) * 0.25
      : 0;

  let experienceScore = 0;
  let experienceFit: 'under' | 'meets' | 'exceeds' = 'under';

  if (candidate.yearsOfExperience >= jobReq.minExperience) {
    experienceFit = candidate.yearsOfExperience > jobReq.minExperience + 2 ? 'exceeds' : 'meets';
    experienceScore = Math.min(
      0.25,
      0.25 * (1 + (candidate.yearsOfExperience - jobReq.minExperience) * 0.02)
    );
  } else {
    experienceFit = 'under';
    experienceScore = 0.25 * (candidate.yearsOfExperience / jobReq.minExperience);
  }

  score = requiredSkillScore + preferredSkillScore + experienceScore;

  const allMatchedSkills = [...new Set([...matchedRequired, ...matchedPreferred])];

  const missingSkills = jobReq.requiredSkills.filter(
    (skill) => !candidateSkillsLower.includes(skill.toLowerCase())
  );

  return {
    ...candidate,
    score: Math.min(1, Math.max(0, score)),
    matchedSkills: allMatchedSkills,
    missingSkills,
    experienceFit,
  };
}

export function filterAndRankCandidates(
  candidates: Candidate[],
  jobReq: JobRequirements,
  filters: RecruiterFilters
): { rankedCandidates: ScoredCandidate[]; filteredOut: number } {
  const filteredCandidates = filterCandidates(candidates, filters);
  const filteredOut = candidates.length - filteredCandidates.length;

  const scoredCandidates = filteredCandidates.map((candidate) =>
    scoreCandidate(candidate, jobReq, filters)
  );

  const rankedCandidates = scoredCandidates.sort((a, b) => b.score - a.score);

  return { rankedCandidates, filteredOut };
}
