'use client';

import { useState, useMemo } from 'react';
import { Candidate, JobRequirements, RecruiterFilters, ScoredCandidate } from '@/types';
import { parseJobDescription } from '@/utils/parseJobDescription';
import JobDescriptionInput from '@/components/JobDescriptionInput';
import ExtractedRequirements from '@/components/ExtractedRequirements';
import RecruiterFiltersPanel from '@/components/RecruiterFilters';
import CandidateResults from '@/components/CandidateResults';
import candidatesData from '@/data/candidates.json';

export default function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [parsedRequirements, setParsedRequirements] = useState<JobRequirements | null>(null);
  const [recruiterFilters, setRecruiterFilters] = useState<RecruiterFilters>({
    selectedSkills: [],
    minExperience: 0,
    selectedLocations: [],
    maxSalary: undefined,
  });
  const [rankedCandidates, setRankedCandidates] = useState<ScoredCandidate[]>([]);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [filteredOut, setFilteredOut] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const availableSkills = useMemo(() => {
    const allSkills = (candidatesData as Candidate[]).flatMap((c) => c.skills);
    return [...new Set(allSkills)].sort();
  }, []);

  const availableLocations = useMemo(() => {
    const allLocations = (candidatesData as Candidate[]).map((c) => c.location);
    return [...new Set(allLocations)].sort();
  }, []);

  const handleParseJobDescription = () => {
    const requirements = parseJobDescription(jobDescription);
    setParsedRequirements(requirements);
  };

  const handleFilterCandidates = async () => {
    if (!parsedRequirements) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/filter-candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          jobRequirements: parsedRequirements,
          recruiterFilters,
          candidates: candidatesData,
        }),
      });

      if (!response.ok) throw new Error('Failed to filter candidates');

      const data = await response.json();
      setRankedCandidates(data.rankedCandidates);
      setTotalCandidates(data.totalCandidates);
      setFilteredOut(data.filteredOut);
    } catch (error) {
      console.error('Error filtering candidates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Candidate Filter</h1>
              <p className="text-sm text-gray-500">Find the best candidates for your role</p>
            </div>
            <div className="text-sm text-gray-600">
              {(candidatesData as Candidate[]).length} candidates in database
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
                onParse={handleParseJobDescription}
              />
            </div>

            {parsedRequirements && (
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <ExtractedRequirements requirements={parsedRequirements} />
              </div>
            )}

            {parsedRequirements && (
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <RecruiterFiltersPanel
                  filters={recruiterFilters}
                  onChange={setRecruiterFilters}
                  availableSkills={availableSkills}
                  availableLocations={availableLocations}
                />
              </div>
            )}

            {parsedRequirements && (
              <button
                onClick={handleFilterCandidates}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Searching...' : 'Find Candidates'}
              </button>
            )}
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-8">
            <CandidateResults
              candidates={rankedCandidates}
              totalCandidates={totalCandidates}
              filteredOut={filteredOut}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
