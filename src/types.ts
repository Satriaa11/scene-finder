export type AnimeScene = {
  filename: string;
  episode: string | number;
  from: number;
  to: number;
  similarity: number;
  video: string;
};

export interface APIResponse {
  result: AnimeScene[];
}
