export type KaraokeRoom = {
  id: string;
  created_at: string;
  current_video: string | null;
  queue: KaraokeQueueItem[];
};

export type KaraokeQueueItem = {
  id: string;
  title: string;
  videoId: string;
  addedBy: string;
  thumbnail: string;
};
