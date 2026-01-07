import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const KeyFeatureType = t.Union(
  [
    t.Literal("QUALITY"),
    t.Literal("DESIGN"),
    t.Literal("USABILITY"),
    t.Literal("DURABILITY"),
    t.Literal("UNIQUENESS"),
    t.Literal("PRODUCTION"),
    t.Literal("PRICE"),
  ],
  { additionalProperties: false },
);
