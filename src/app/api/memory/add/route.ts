import { NextRequest, NextResponse } from 'next/server';
import { MemoryClient } from 'mem0ai';

const memoryClient = new MemoryClient({
  apiKey: "m0-Gi0Ng0EQlIdWtOEiUkxjgdjU9YK7Fn2kXiMRY7p7",
});




// export async function POST(request: NextRequest) {
//   const { userId, memory } = await request.json();

//   // Ensure the memory has user_id
//   const memoryWithUser = {
//     ...memory,
//     user_id: userId,
//   };

//   try {
//     await memoryClient.add([memoryWithUser], { userId });
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Memory Add Error:', error);
//     return NextResponse.json({ error: 'Failed to add memory' }, { status: 500 });
//   }
// };



export async function POST(request: NextRequest) {
  try {
    const { userId, memory } = await request.json();
    
    if (!userId || !memory) {
      return NextResponse.json(
        { error: 'userId and memory are required' }, 
        { status: 400 }
      );
    }

    // Ensure memory is an array
    const messages = Array.isArray(memory) ? memory : [memory];

    // Correct syntax: pass user_id as named parameter
    const result = await memoryClient.add(messages, { 
      user_id: userId,
      version: "v2"
    });
    
    return NextResponse.json({ 
      success: true, 
      result,
      message: 'Memory added successfully' 
    });
  } catch (error) {
    console.error('Memory Add Error:', error);
    return NextResponse.json(
      { error: 'Failed to add memory' }, 
      { status: 500 }
    );
  }
}