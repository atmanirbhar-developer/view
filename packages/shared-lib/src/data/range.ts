import { Key } from "../data";
import { ActivitySort, DiscussionSort, DiscussionsSort, TagsSort } from "../urls";

/*
  This is used to paginate the unlimited-length lists (e.g. of discussions) which are fetched
*/

interface Range<TSort> {
  nTotal: number;
  sort: TSort;
  pageSize: number;
  pageNumber: number; // 1-based
}

export type DiscussionRange = Range<DiscussionSort>;

export type DiscussionsRange = Range<DiscussionsSort> & { tag?: Key };

export type ActivityRange = Range<ActivitySort>;

export type TagsRange = Range<TagsSort>;
