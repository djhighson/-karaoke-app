export async function searchYouTube(query: string) {
  const url = `https://yt-api.p.rapidapi.com/search?query=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
      "X-RapidAPI-Host": "yt-api.p.rapidapi.com"
    }
  });

  const data = await response.json();
  return data;
}
