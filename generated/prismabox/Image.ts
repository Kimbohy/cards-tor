import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ImagePlain = t.Object(
  {
    id: t.String(),
    deckId: t.String(),
    url: t.String(),
    altText: __nullable__(t.String()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const ImageRelations = t.Object(
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

export const ImagePlainInputCreate = t.Object(
  { url: t.String(), altText: t.Optional(__nullable__(t.String())) },
  { additionalProperties: false },
);

export const ImagePlainInputUpdate = t.Object(
  {
    url: t.Optional(t.String()),
    altText: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const ImageRelationsInputCreate = t.Object(
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

export const ImageRelationsInputUpdate = t.Partial(
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

export const ImageWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          deckId: t.String(),
          url: t.String(),
          altText: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Image" },
  ),
);

export const ImageWhereUnique = t.Recursive(
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
              url: t.String(),
              altText: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Image" },
);

export const ImageSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      deckId: t.Boolean(),
      url: t.Boolean(),
      altText: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      deck: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ImageInclude = t.Partial(
  t.Object(
    { deck: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const ImageOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      deckId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      url: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      altText: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Image = t.Composite([ImagePlain, ImageRelations], {
  additionalProperties: false,
});

export const ImageInputCreate = t.Composite(
  [ImagePlainInputCreate, ImageRelationsInputCreate],
  { additionalProperties: false },
);

export const ImageInputUpdate = t.Composite(
  [ImagePlainInputUpdate, ImageRelationsInputUpdate],
  { additionalProperties: false },
);
