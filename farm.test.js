const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
} = require("./farm");

// Aspects of groceries

const corn = {
    name: "corn",
    yield: 30,
    price: 1,
    salePrice: 3,
    factors: {
        sun: {
            low: -50,
            medium: 0,
            high: 50,
        },
        wind: {
            low: -10,
            medium: 10,
            high: 40,
        },
        temp: {
            low: -20,
            medium: 10,
            high: 30,
        },
    },
};


const pumpkin = {
    name: "pumpkin",
    yield: 20,
    price: 1,
    salePrice: 4,
    factors: {
        sun: {
            low: -50,
            medium: 30,
            high: 70,
        },
        wind: {
            low: -20,
            medium: 30,
            high: 40,
        },
        temp: {
            low: -20,
            medium: 0,
            high: 10,
        },
    },
};



//***************************************************

describe("getYieldForPlant", () => {
    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Get yield for plant with 1 environment factor", () => {
        const environmentFactors = {
            sun: "low",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    });

    test("Get yield for plant with 2 environment factors", () => {
        const environmentFactors = {
            sun: "medium",
            wind: "high"
        };
        expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(36.4);
    });

    test("Get yield for plant with 3 environment factors", () => {
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            temp: "low"
        };
        expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(10.4);
    });
});

//***************************************************

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(300);
    });
    test("Get yield for crop with 1 environmentFactor", () => {
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "low"
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(150);
    });
    test("Get yield for crop with 3 environmentFactor", () => {
        const input = {
            crop: pumpkin,
            numCrops: 50,
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            temp: "low"
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(520);
    });
});


//***************************************************

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const crops = [
            { crop: corn, numCrops: 10 },
            { crop: pumpkin, numCrops: 20 },
        ];
        expect(getTotalYield({ crops })).toBe(700);
    });

    test("Calculate total yield with 0 amount", () => {
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });

    test("Get totalYield with 1 environmentFactor", () => {
        const crops = [
            { crop: corn, numCrops: 10 },
            { crop: pumpkin, numCrops: 20 },
        ];
        const environmentFactors = {
            sun: "low"
        };
        expect(getTotalYield({ crops }, environmentFactors)).toBe(350);
    });

    test("Get totalYield with 3 environmentFactors", () => {
        const crops = [
            { crop: corn, numCrops: 10 },
            { crop: pumpkin, numCrops: 20 },
        ];
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            temp: "low"
        };
        expect(getTotalYield({ crops }, environmentFactors)).toBe(340);
    });
});

//***************************************************

describe("getCostsForCrop", () => {
    test("Calculate costs for seeding of one crop", () => {
        const input = {
            crop: corn,
            numCrops: 10
        };
        expect(getCostsForCrop(input)).toBe(10);
    })
});

//****************************************************

describe("getRevenueForCrop", () => {
    test("Calculate revenue for 1 crop", () => {
        const input = {
            crop: corn,
            numCrops: 10
        };

        expect(getRevenueForCrop(input)).toBe(900);
    });


    test("Calculate revenue for 1 crop with 3 environmentFactors", () => {
        const input = {
            crop: pumpkin,
            numCrops: 50
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium",
            temp: "low"
        };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(2080);
    });


    //****************************************************

    describe("getProfitForCrop", () => {
        test("Calculate profit for 1 crop", () => {
            const input = {
                crop: corn,
                numCrops: 10
            };
            expect(getProfitForCrop(input)).toBe(890);
        });

        test("Calculate profit for 1 crop with 3 environmentFactors", () => {
            const input = {
                crop: pumpkin,
                numCrops: 50
            };
            const environmentFactors = {
                sun: "low",
                wind: "medium",
                temp: "low"
            };
            expect(getProfitForCrop(input, environmentFactors)).toBe(2030);
        });
    });


    //****************************************************


    describe("getTotalProfit", () => {
        test("Calculate profit for all crops together", () => {
            const crops = [
                { crop: corn, numCrops: 10 },
                { crop: pumpkin, numCrops: 20 },
            ];
            expect(getTotalProfit({ crops })).toBe(2470);
        });


        test("Calculate profit for all crops together with 3 environmentFactors", () => {
            const crops = [
                { crop: corn, numCrops: 10 },
                { crop: pumpkin, numCrops: 20 },
            ];
            const environmentFactors = {
                sun: "low",
                wind: "medium",
                temp: "low"
            };
            expect(getTotalProfit({ crops }, environmentFactors)).toBe(1198);
        });
    });
})
