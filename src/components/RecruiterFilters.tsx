'use client';

import { RecruiterFilters } from '@/types';

interface RecruiterFiltersProps {
  filters: RecruiterFilters;
  onChange: (filters: RecruiterFilters) => void;
  availableSkills: string[];
  availableLocations: string[];
}

export default function RecruiterFiltersPanel({
  filters,
  onChange,
  availableSkills,
  availableLocations,
}: RecruiterFiltersProps) {
  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.selectedSkills.includes(skill)
      ? filters.selectedSkills.filter((s) => s !== skill)
      : [...filters.selectedSkills, skill];
    onChange({ ...filters, selectedSkills: newSkills });
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = filters.selectedLocations.includes(location)
      ? filters.selectedLocations.filter((l) => l !== location)
      : [...filters.selectedLocations, location];
    onChange({ ...filters, selectedLocations: newLocations });
  };

  return (
    <div className="space-y-5">
      <h2 className="text-base font-medium text-gray-900">Filters</h2>

      {/* Skills Filter */}
      <div>
        <h3 className="text-sm text-gray-600 mb-2">Skills</h3>
        <div className="max-h-36 overflow-y-auto border border-gray-200 rounded-lg p-2 space-y-1">
          {availableSkills.map((skill) => (
            <label
              key={skill}
              className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.selectedSkills.includes(skill)}
                onChange={() => handleSkillToggle(skill)}
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm text-gray-600">Min Experience</h3>
          <span className="text-sm font-medium text-gray-900">{filters.minExperience} years</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={filters.minExperience}
          onChange={(e) => onChange({ ...filters, minExperience: parseInt(e.target.value, 10) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0</span>
          <span>5</span>
          <span>10+</span>
        </div>
      </div>

      {/* Location Pills */}
      <div>
        <h3 className="text-sm text-gray-600 mb-2">Location</h3>
        <div className="flex flex-wrap gap-2">
          {availableLocations.map((location) => (
            <button
              key={location}
              onClick={() => handleLocationToggle(location)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filters.selectedLocations.includes(location)
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      {/* Max Salary */}
      <div>
        <h3 className="text-sm text-gray-600 mb-2">Max Salary Budget</h3>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            placeholder="No limit"
            value={filters.maxSalary || ''}
            onChange={(e) =>
              onChange({
                ...filters,
                maxSalary: e.target.value ? parseInt(e.target.value, 10) : undefined,
              })
            }
            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
          />
        </div>
      </div>
    </div>
  );
}
