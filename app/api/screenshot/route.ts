import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')
  const width = searchParams.get('width')
  const height = searchParams.get('height')

  if (!url || !width || !height) {
    return new Response('Missing params', { status: 400 });
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({width: Number(width), height: Number(height)});
  const screenshot = await page.screenshot({ encoding: 'binary' });

  await browser.close();

  return new Response(screenshot, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}