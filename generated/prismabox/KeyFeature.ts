import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const KeyFeaturePlain = t.Object(
  {
    id: t.String(),
    deckId: t.String(),
    title: t.String(),
    detail: __nullable__(t.String()),
    type: t.Union(
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
    ),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const KeyFeatureRelations = t.Object(
  {
    deck: t.Object(
      {
        id: t.String(),
        name: t.String(),
        description: __nullable__(t.String()),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const KeyFeaturePlainInputCreate = t.Object(
  {
    title: t.String(),
    detail: t.Optional(__nullable__(t.String())),
    type: t.Optional(
      t.Union(
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
      ),
    ),
  },
  { additionalProperties: false },
);

export const KeyFeaturePlainInputUpdate = t.Object(
  {
    title: t.Optional(t.String()),
    detail: t.Optional(__nullable__(t.String())),
    type: t.Optional(
      t.Union(
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
      ),
    ),
  },
  { additionalProperties: false },
);

export const KeyFeatureRelationsInputCreate = t.Object(
  {
    deck: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const KeyFeatureRelationsInputUpdate = t.Partial(
  t.Object(
    {
      deck: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const KeyFeatureWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          deckId: t.String(),
          title: t.String(),
          detail: t.String(),
          type: t.Union(
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
          ),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "KeyFeature" },
  ),
);

export const KeyFeatureWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              deckId: t.String(),
              title: t.String(),
              detail: t.String(),
              type: t.Union(
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
              ),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "KeyFeature" },
);

export const KeyFeatureSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      deckId: t.Boolean(),
      title: t.Boolean(),
      detail: t.Boolean(),
      type: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      deck: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const KeyFeatureInclude = t.Partial(
  t.Object(
    { type: t.Boolean(), deck: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const KeyFeatureOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      deckId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      detail: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const KeyFeature = t.Composite([KeyFeaturePlain, KeyFeatureRelations], {
  additionalProperties: false,
});

export const KeyFeatureInputCreate = t.Composite(
  [KeyFeaturePlainInputCreate, KeyFeatureRelationsInputCreate],
  { additionalProperties: false },
);

export const KeyFeatureInputUpdate = t.Composite(
  [KeyFeaturePlainInputUpdate, KeyFeatureRelationsInputUpdate],
  { additionalProperties: false },
);
