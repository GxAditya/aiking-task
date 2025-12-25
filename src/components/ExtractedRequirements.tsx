'use client';

import { JobRequirements } from '@/types';

interface ExtractedRequirementsProps {
  requirements: JobRequirements | null;
}

export default function ExtractedRequirements({ requirements }: ExtractedRequirementsProps) {
  if (!requirements) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-medium text-gray-900">Extracted Requirements</h2>

      {/* Required Skills */}
      <div>
        <h3 className="text-sm text-gray-600 mb-2">Required Skills</h3>
        <div className="flex flex-wrap gap-1.5">
          {requirements.requiredSkills.length > 0 ? (
            requirements.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 text-sm border border-red-200"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">None detected</span>
          )}
        </div>
      </div>

      {/* Preferred Skills */}
      <div>
        <h3 className="text-sm text-gray-600 mb-2">Preferred Skills</h3>
        <div className="flex flex-wrap gap-1.5">
          {requirements.preferredSkills.length > 0 ? (
            requirements.preferredSkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-sm border border-amber-200"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">None detected</span>
          )}
        </div>
      </div>

      {/* Other Info */}
      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
        <div>
          <h3 className="text-xs text-gray-500 uppercase mb-1">Min Experience</h3>
          <p className="text-gray-900 font-medium">
            {requirements.minExperience > 0 ? `${requirements.minExperience} years` : 'Any'}
          </p>
        </div>
        <div>
          <h3 className="text-xs text-gray-500 uppercase mb-1">Location</h3>
          <p className="text-gray-900 font-medium">{requirements.location || 'Any'}</p>
        </div>
        <div className="col-span-2">
          <h3 className="text-xs text-gray-500 uppercase mb-1">Salary Range</h3>
          <p className="text-gray-900 font-medium">
            {requirements.salaryRange
              ? `$${requirements.salaryRange.min.toLocaleString()} - $${requirements.salaryRange.max.toLocaleString()}`
              : 'Not specified'}
          </p>
        </div>
      </div>
    </div>
  );
}
