import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const registryPath = path.join(process.cwd(), 'registry');
    const directories = await fs.readdir(registryPath, { withFileTypes: true });
    
    const components = directories
      .filter(dirent => dirent.isDirectory())
      .map(dir => {
        const name = dir.name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return {
          name,
          href: `/docs/components/${dir.name}`,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(components);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}