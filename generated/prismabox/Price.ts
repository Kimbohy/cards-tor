import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PricePlain = t.Object(
  {
    id: t.String(),
    deckId: t.String(),
    amount: t.Number(),
    currency: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const PriceRelations = t.Object(
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

export const PricePlainInputCreate = t.Object(
  { amount: t.Number(), currency: t.Optional(t.String()) },
  { additionalProperties: false },
);

export const PricePlainInputUpdate = t.Object(
  { amount: t.Optional(t.Number()), currency: t.Optional(t.String()) },
  { additionalProperties: false },
);

export const PriceRelationsInputCreate = t.Object(
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

export const PriceRelationsInputUpdate = t.Partial(
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

export const PriceWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          deckId: t.String(),
          amount: t.Number(),
          currency: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Price" },
  ),
);

export const PriceWhereUnique = t.Recursive(
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
              amount: t.Number(),
              currency: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Price" },
);

export const PriceSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      deckId: t.Boolean(),
      amount: t.Boolean(),
      currency: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      deck: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PriceInclude = t.Partial(
  t.Object(
    { deck: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const PriceOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      deckId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      amount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      currency: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Price = t.Composite([PricePlain, PriceRelations], {
  additionalProperties: false,
});

export const PriceInputCreate = t.Composite(
  [PricePlainInputCreate, PriceRelationsInputCreate],
  { additionalProperties: false },
);

export const PriceInputUpdate = t.Composite(
  [PricePlainInputUpdate, PriceRelationsInputUpdate],
  { additionalProperties: false },
);
