import { NextRequest, NextResponse } from 'next/server';
import { MemoryClient } from 'mem0ai';

const memoryClient = new MemoryClient({
  apiKey: "m0-Gi0Ng0EQlIdWtOEiUkxjgdjU9YK7Fn2kXiMRY7p7",
});


// export async function POST(request: NextRequest) {
//   const { userId, query } = await request.json();

//   const filters = {
//     OR: [{ user_id: userId }],  // Ensure the user_id filter is set correctly
//   };

//   try {
//     const memories = await memoryClient.search(query, {
//       version: 'v2',
//       filters,
//     });
//     return NextResponse.json(memories);
//   } catch (error) {
//     console.error('Memory Search Error:', error);
//     return NextResponse.json({ error: 'Failed to search memories' }, { status: 500 });
//   }
// };












interface SearchMemoryRequest {
  userId: string;
  query: string;
  limit?: number;
}

export async function POST(request: NextRequest) {
  try {
    const { userId, query, limit = 5 }: SearchMemoryRequest = await request.json();
    
    if (!userId || !query) {
      return NextResponse.json(
        { error: 'userId and query are required' }, 
        { status: 400 }
      );
    }

    // Method 1: Pass user_id directly as parameter (recommended for platform API)
    const result = await memoryClient.search(query, {
      user_id: userId,
      limit,
      output_format: "v1.1"
    });

    return NextResponse.json({
      success: true,
      results: result.results || result || [], // Handle both v1.0 and v1.1 formats
      total: (result.results || result || []).length
    });
  } catch (error) {
    console.error('Memory Search Error:', error);
    return NextResponse.json(
      { error: 'Failed to search memories' }, 
      { status: 500 }
    );
  }
}
