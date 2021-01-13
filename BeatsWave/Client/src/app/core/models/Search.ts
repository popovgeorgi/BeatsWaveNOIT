import { Artist } from "./Artist";
import { Beat } from "./Beat";

export interface Search {
  beats: Array<Beat>,
  artists: Array<Artist>
}
