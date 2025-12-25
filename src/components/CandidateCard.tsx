'use client';

import { ScoredCandidate } from '@/types';

interface CandidateCardProps {
  candidate: ScoredCandidate;
  rank: number;
}

export default function CandidateCard({ candidate, rank }: CandidateCardProps) {
  const scorePercent = Math.round(candidate.score * 100);

  // Simple color based on score
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-100 text-green-700';
    if (score >= 40) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getExpLabel = (fit: string) => {
    switch (fit) {
      case 'exceeds': return { text: 'Exceeds', color: 'text-green-600' };
      case 'meets': return { text: 'Meets', color: 'text-blue-600' };
      default: return { text: 'Under', color: 'text-gray-500' };
    }
  };

  const exp = getExpLabel(candidate.experienceFit);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
            {rank}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
            <p className="text-sm text-gray-500">{candidate.email}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(scorePercent)}`}>
          {scorePercent}%
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-y border-gray-100">
        <div>
          <p className="text-xs text-gray-500">Experience</p>
          <p className="text-sm font-medium text-gray-900">{candidate.yearsOfExperience} years</p>
          <p className={`text-xs ${exp.color}`}>{exp.text}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Location</p>
          <p className="text-sm font-medium text-gray-900">{candidate.location}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Salary</p>
          <p className="text-sm font-medium text-gray-900">
            {candidate.salaryExpectation ? `$${(candidate.salaryExpectation / 1000).toFixed(0)}k` : 'N/A'}
          </p>
        </div>
      </div>

      {/* Matched Skills */}
      {candidate.matchedSkills.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1.5">Matched Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {candidate.matchedSkills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded bg-green-50 text-green-700 text-xs border border-green-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {candidate.missingSkills.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1.5">Missing Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {candidate.missingSkills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded bg-red-50 text-red-700 text-xs border border-red-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* All Skills */}
      <div>
        <p className="text-xs text-gray-500 mb-1.5">All Skills</p>
        <div className="flex flex-wrap gap-1.5">
          {candidate.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
