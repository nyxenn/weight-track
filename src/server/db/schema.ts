import * as workoutTables from "./workout";
import * as exerciseTables from "./exercise";

const schema = {
  ...workoutTables,
  ...exerciseTables,
};

export default schema;
