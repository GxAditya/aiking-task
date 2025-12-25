'use client';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  onParse: () => void;
}

export default function JobDescriptionInput({
  value,
  onChange,
  onParse,
}: JobDescriptionInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-medium text-gray-900 mb-1">Job Description</h2>
        <p className="text-sm text-gray-500">Paste the job posting to extract requirements</p>
      </div>

      <textarea
        className="w-full h-48 p-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-sm"
        placeholder="Paste job description here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        onClick={onParse}
        disabled={!value.trim()}
        className="w-full py-2.5 px-4 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Extract Requirements
      </button>
    </div>
  );
}
