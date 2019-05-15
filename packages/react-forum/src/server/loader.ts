import { BareUser } from "./bare";
import * as I from "../data";

/*
  This module loads data from modules in the server_data directory.
  It cannot use the "path" and "fs" (these aren't supported in the browser)
  and must instead use "import" to import modules using string-literal names.
*/

/*
  private helper function to load data from json
*/

function assertTypeT<T>(loaded: any, wanted: T, optional?: Set<string>): T {
  function assertType(found: any, wanted: any, keyNames?: string): void {
    if (typeof wanted !== typeof found) {
      throw new Error(`assertType expected ${typeof wanted} but found ${typeof found}`);
    }
    switch (typeof wanted) {
      case "boolean":
      case "number":
      case "string":
        return; // primitive value type -- done checking
      case "object":
        break; // more to check
      case "undefined":
      case "symbol":
      case "function":
      default:
        throw new Error(`assertType does not support ${typeof wanted}`);
    }
    if (Array.isArray(wanted)) {
      if (!Array.isArray(found)) {
        throw new Error(`assertType expected an array but found ${found}`);
      }
      if (wanted.length === 0) {
        // throw new Error(`assertType can't deduce the expected type from a zero-length array`);
      } else if (wanted.length === 1) {
        // assume we want a homogenous array with all elements the same type
        for (const element of found) {
          assertType(element, wanted[0]);
        }
      } else {
        // assume we want a tuple
        if (found.length !== wanted.length) {
          throw new Error(`assertType expected tuple length ${wanted.length} found ${found.length}`);
        }
        for (let i = 0; i < wanted.length; ++i) {
          assertType(found[i], wanted[i]);
        }
      }
      return;
    }
    for (const key in wanted) {
      const expectedKey = keyNames ? keyNames + "." + key : key;
      if (typeof found[key] === 'undefined') {
        if (!optional || !optional.has(expectedKey)) {
          throw new Error(`assertType expected key ${expectedKey}`);
        }
      } else {
        assertType(found[key], wanted[key], expectedKey);
      }
    }
  }

  assertType(loaded, wanted);
  return loaded as T;
}

/*
  exported `loadXxx(): Xxx` functions
*/

export function loadUsers(): Map<number, BareUser> {
  const found = require("../server_data/users.json");
  const sample: [number, BareUser] = [
    1,
    {
      "name": "ChrisW",
      "email": "cwellsx@gmail.com",
      "gravatarHash": "75bfdecf63c3495489123fe9c0b833e1",
      "profile": {
        "location": "Normandy",
        "aboutMe": "I wrote this!\n\nFurther details are to be supplied ..."
      },
      "favourites": []
    }
  ];
  const optional: Set<string> = new Set<string>(["profile.aboutMe", "profile.location"]);
  const loaded: [number, BareUser][] = assertTypeT(found, [sample], optional);
  return new Map<number, BareUser>(loaded);
}

export { loadImages } from "../server_data/images";

export function loadFeatures(): I.FeatureSummary[] {
  const found = require("../server_data/features.json");
  const sample: I.FeatureSummary = {
    idName:  { id: 1, name: "" }
  };
  const loaded: I.FeatureSummary[] = assertTypeT(found, [sample]);
  return loaded;
}