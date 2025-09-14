

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
