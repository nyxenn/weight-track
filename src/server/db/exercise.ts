import { relations, sql } from "drizzle-orm";
import {
  index,
  serial,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { createTable } from "./utils";
import { workouts } from "./workout";

export const exercises = createTable(
  "exercises",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 128 }),

    user_id: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (exercise) => ({
    nameIndex: index("name_idx").on(exercise.name),
  }),
);

export const exerciseRelations = relations(exercises, ({ one, many }) => ({
  workouts: many(workouts, { relationName: "workouts" }),
  rep_range: one(rep_range),
}));

export const rep_range = createTable("rep_ranges", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }),
  min: smallint("min"),
  max: smallint("max"),
});

export const exerciseSupersets = createTable("exercise_supersets", {
  id: serial("id").primaryKey(),
});

export const exerciseSupersetRelations = relations(
  exerciseSupersets,
  ({ one }) => ({
    workout: one(workouts),
    exercise_a: one(exercises),
    exercise_b: one(exercises),
  }),
);
