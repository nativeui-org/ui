import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ componentName: string }> }
) {
  let { componentName } = await params;
  
  if (componentName === 'registry' || componentName === 'registry.json') {
    try {
      const url = new URL('/r/registry.json', request.url);
      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const registryData = await res.json();
      return NextResponse.json(registryData);
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: `Registry file not found: ${error}` }),
        { status: 404, headers: { 'content-type': 'application/json' } }
      );
    }
  }
  
  if (componentName.endsWith('.json')) {
    componentName = componentName.slice(0, -5);
  }

  try {
    const url = new URL(`/r/${componentName}.json`, request.url);
    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const componentData = await res.json();
    return NextResponse.json(componentData);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `Component ${componentName} not found, ${error}` }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    );
  }
}