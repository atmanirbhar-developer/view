import * as I from "../data";

/*
  This defines 'bare' data formats i.e. the format in which data is stored on disk before it's loaded.

  For any given data type (e.g. named `Data`) defined in `/src/data`, there may also be:

  - `WireData` (also defined in `/src/data`)
  - `BareData` (defined in this `/server/bare`)

  Only a "data" format is used in the `/src/react` code.

  A "wire" format is used on the network connection between server and client.
  It's easily converted to data, but reduces redundency i.e. duplication of --
  for example all messages have a user, a user may have several messages, so instead of transporting multiple
  instances of user data, the data for each user is sent once, and messages include a user ID.

  A "bare" format is intended for the server's storing of data on disk.
*/

// if data for each user is stored in a separate (numbered) directory
// then this defines the data which would be stored in each directory
export interface BareUser {
  name: string;
  email: string;
  gravatarHash: string;
  // TODO: add some authentication or credential data somewhere e.g. here
  profile: I.UserProfile
  favourites: I.FavouriteId[];
}

export interface BareDiscussion {
  meta: {
    idName: I.IdName;
    topicSummary: I.TopicSummary;
  };
  messages: {
    userId: number; // + users
    markdown: string;
    dateTime: string;
    exerpt?: string;
  }[];
}