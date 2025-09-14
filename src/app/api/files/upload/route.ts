import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25MB
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: 'File size should be less than 25MB' }, { status: 400 });
    }

    const allowedDocumentTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/csv',
    ];

    const isImage = file.type.startsWith('image/');
    const isAllowedDocument = allowedDocumentTypes.includes(file.type);

    if (!isImage && !isAllowedDocument) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images and specific documents are allowed.' },
        { status: 400 }
      );
    }

    const filename = file.name;
    const fileBuffer = await file.arrayBuffer();

    const blob = await put(filename, fileBuffer, {
      access: 'public',
      allowOverwrite: true,
    });

    
    return NextResponse.json(blob);

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred during file upload.' }, { status: 500 });
  }
}