// import { openai } from '@ai-sdk/openai';
// import { streamText, UIMessage, convertToModelMessages } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const result = streamText({
//     model: openai('gpt-4o'),
//     messages: convertToModelMessages(messages),
//   });

//   return result.toUIMessageStreamResponse();
// }





import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req : Request) {
  console.log("choco2");
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    console.log("choco1");

    const result = streamText({
      // model: openai('4o-mini'),
      model: openai("gpt-4o"),
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error in POST handler:", error);

    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}




