// import { put } from '@vercel/blob';
// import { NextResponse } from 'next/server';
// import { z } from 'zod';

// // import { auth } from '@/app/(auth)/auth';


// const FileSchema = z.object({
//   file: z
//     .instanceof(Blob)
//     .refine((file) => file.size <= 5 * 1024 * 1024, {
//       message: 'File size should be less than 5MB',
//     })
//     // Update the file type based on the kind of files you want to accept
//     .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
//       message: 'File type should be JPEG or PNG',
//     }),
// });





// export async function POST(request: Request) {
// //   const session = await auth();

// //   if (!session) {
// //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// //   }

// console.log("came to api/files/upload")

//   if (request.body === null) {
//     return new Response('Request body is empty', { status: 400 });
//   }

//   try {
//     const formData = await request.formData();
//     const file = formData.get('file') as Blob;

//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     const validatedFile = FileSchema.safeParse({ file });

//     if (!validatedFile.success) {
//       const errorMessage = validatedFile.error.errors
//         .map((error) => error.message)
//         .join(', ');

//       return NextResponse.json({ error: errorMessage }, { status: 400 });
//     }

//     // Get filename from formData since Blob doesn't have name property
//     const filename = (formData.get('file') as File).name;
//     const fileBuffer = await file.arrayBuffer();

//     try {
//       const data = await put(`${filename}`, fileBuffer, {
//         access: 'public',
//       });

//       return NextResponse.json(data);
//     } catch (error) {
//       return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to process request' },
//       { status: 500 },
//     );
//   }
// }
















































import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('Came to api/files/upload');

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    console.log("in files/uplaod file -> ",file);

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Manual validation
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size should be less than 5MB' }, { status: 400 });
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      return NextResponse.json({ error: 'File type should be JPEG or PNG' }, { status: 400 });
    }

    const filename = (formData.get('file') as File).name;
    const fileBuffer = await file.arrayBuffer();

  

    console.log("above putt----------")
    const data = await put(`${filename}`, fileBuffer, {
      access: 'public',
      allowOverwrite : true,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
