"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../core");
describe("This is a test for parseSQL function", () => {
    const units = [
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
            const result = (0, core_1.parseSQL)(unit.test);
            expect(result).toEqual(unit.assets);
        });
    });
});
