"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../core");
describe("This is a test for flatten function", () => {
    const units = [
        {
            name: "base test 1",
            test: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            assets: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
        {
            name: "base test 2",
            test: [1, 2, 3, [4, 5, 6, [7, 8, 9]]],
            assets: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
        {
            name: "base test 3",
            test: [1, [2, [3, [4, [5, [6, [7, [8, [9]]]]]]]]],
            assets: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
    ];
    units.forEach((unit) => {
        it(unit.name, () => {
            const result = (0, core_1.flatten)(unit.test);
            expect(result).toEqual(unit.assets);
        });
    });
});
