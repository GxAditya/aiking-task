'use client';

import { ScoredCandidate } from '@/types';
import CandidateCard from './CandidateCard';

interface CandidateResultsProps {
  candidates: ScoredCandidate[];
  totalCandidates: number;
  filteredOut: number;
  isLoading: boolean;
}

export default function CandidateResults({
  candidates,
  totalCandidates,
  filteredOut,
  isLoading,
}: CandidateResultsProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-3 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Searching candidates...</p>
      </div>
    );
  }

  // Empty state
  if (candidates.length === 0 && totalCandidates === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No results yet</h3>
        <p className="text-gray-500 text-sm">
          Paste a job description and extract requirements to find matching candidates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Results</h2>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-600">
              <span className="font-medium text-gray-900">{candidates.length}</span> candidates found
            </span>
            {filteredOut > 0 && (
              <span className="text-red-600">
                {filteredOut} filtered out
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Cards */}
      {candidates.length > 0 ? (
        <div className="space-y-4">
          {candidates.map((candidate, index) => (
            <CandidateCard key={candidate.id} candidate={candidate} rank={index + 1} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No candidates match your filters. Try adjusting your criteria.</p>
        </div>
      )}
    </div>
  );
}
