import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ componentName: string }> }

) {
  const { componentName } = await params;

  try {
    const filePath = join(process.cwd(), 'public', 'r', `${componentName}.json`);
    const fileContent = readFileSync(filePath, 'utf-8');
    const componentData = JSON.parse(fileContent);

    return NextResponse.json(componentData);
  } catch (error) {
    try {
      const legacyFilePath = join(process.cwd(), 'registry', 'ui', `${componentName}.json`);
      const legacyFileContent = readFileSync(legacyFilePath, 'utf-8');
      const legacyComponentData = JSON.parse(legacyFileContent);
      console.error(error);

      return NextResponse.json(legacyComponentData);
    } catch (legacyError) {
      return new NextResponse(
        JSON.stringify({ error: `Component ${componentName} not found, ${legacyError}` }),
        { status: 404, headers: { 'content-type': 'application/json' } }
      );
    }
  }
}