# Candidate Filtering and Ranking System

A web application that helps recruiters identify the best-fit candidates based on job descriptions and custom filters. Built with Next.js and React.

## Features

- Job description parsing to extract required skills, preferred skills, experience, location, and salary range
- Custom recruiter filters for skills, experience, location, and salary budget
- Candidate scoring and ranking based on skill match and experience fit
- REST API endpoint for filtering and ranking candidates

## Tech Stack

- Frontend: React with TypeScript
- Backend: Next.js API Routes
- Styling: Tailwind CSS

## Project Structure

```
src/
  app/
    api/
      filter-candidates/
        route.ts          # POST API endpoint
    page.tsx              # Main page
    layout.tsx
    globals.css
  components/
    JobDescriptionInput.tsx
    ExtractedRequirements.tsx
    RecruiterFilters.tsx
    CandidateCard.tsx
    CandidateResults.tsx
  data/
    candidates.json       # Sample candidate data
  types/
    index.ts              # TypeScript interfaces
  utils/
    filterAndScore.ts     # Filtering and scoring logic
    parseJobDescription.ts # Job description parser
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## API Reference

### POST /api/filter-candidates

Filters and ranks candidates based on job requirements and recruiter filters.

Request body:

```json
{
  "jobDescription": "string",
  "jobRequirements": {
    "requiredSkills": ["string"],
    "preferredSkills": ["string"],
    "minExperience": "number",
    "location": "string",
    "salaryRange": { "min": "number", "max": "number" }
  },
  "recruiterFilters": {
    "selectedSkills": ["string"],
    "minExperience": "number",
    "selectedLocations": ["string"],
    "maxSalary": "number"
  },
  "candidates": []
}
```

Response:

```json
{
  "rankedCandidates": [],
  "totalCandidates": "number",
  "filteredOut": "number"
}
```

## Scoring Logic

Candidates are scored on a scale of 0 to 1 based on:

- Required skill match: 50% weight
- Preferred skill match: 25% weight
- Experience match: 25% weight

Hard filters are applied first to remove candidates who do not meet minimum experience, location, or salary requirements.
