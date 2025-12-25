import { NextRequest, NextResponse } from 'next/server';
import { FilterRequest, FilterResponse } from '@/types';
import { filterAndRankCandidates } from '@/utils/filterAndScore';

export async function POST(request: NextRequest) {
  try {
    const body: FilterRequest = await request.json();
    const { jobRequirements, recruiterFilters, candidates } = body;

    if (!candidates || candidates.length === 0) {
      return NextResponse.json(
        { error: 'No candidates provided' },
        { status: 400 }
      );
    }

    if (!jobRequirements) {
      return NextResponse.json(
        { error: 'Job requirements not provided' },
        { status: 400 }
      );
    }

    const { rankedCandidates, filteredOut } = filterAndRankCandidates(
      candidates,
      jobRequirements,
      recruiterFilters
    );

    const response: FilterResponse = {
      rankedCandidates,
      totalCandidates: candidates.length,
      filteredOut,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process candidates' },
      { status: 500 }
    );
  }
}
