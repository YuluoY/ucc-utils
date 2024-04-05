import { parseSQL } from "../../core";
import { ITestUnit } from "../../types";

describe("This is a test for parseSQL function", () => {
  const units: ITestUnit[] = [
    {
      name: "base test 1",
      test: `id = 1 AND name = '张三'`,
      assets: [
        ["id", "=", "1", null],
        ["name", "=", "'张三'", "AND"],
      ],
    },
    {
      name: "base test 2",
      test: `id = 1 AND name = '张三' AND age = 18`,
      assets: [
        ["id", "=", "1", null],
        ["name", "=", "'张三'", "AND"],
        ["age", "=", "18", "AND"],
      ],
    },
  ];

  units.forEach((unit) => {
    it(unit.name, () => {
      const result = parseSQL(unit.test);
      expect(result).toEqual(unit.assets);
    });
  });
});
