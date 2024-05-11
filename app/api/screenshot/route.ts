import puppeteer from "@cloudflare/puppeteer";

export const runtime = 'edge';

interface Env {
	MYBROWSER: any;
}

export async function GET(req: Request, env: Env) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const width = searchParams.get('width');
  const height = searchParams.get('height');

  if (!url || !width || !height) {
    return new Response('Missing params', { status: 400 });
  }

  try {
    const browser = await puppeteer.launch(env.MYBROWSER)
    const page = await browser.newPage();

    await page.goto(url);
    await page.setViewport({ width: Number(width), height: Number(height) });
    const screenshot = await page.screenshot({ type: 'png' }); // More concise

    await browser.close();

    return new Response(screenshot, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.error('Error generating screenshot:', error);
    return new Response('Failed to generate screenshot', { status: 500 });
  }
}