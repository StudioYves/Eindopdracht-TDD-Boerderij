const getYieldForPlant = (plant, environmentFactors = {}) => {

    let totalFactor = 1
    // check if environmentFactor SUN is true, and if Yes => Calculate
    if (environmentFactors.hasOwnProperty("sun") && plant.factors.hasOwnProperty("sun")) {
        totalFactor *= (plant.factors.sun[environmentFactors.sun] + 100) / 100;
    };
    // check if environmentFactor WIND is true, and if Yes => Calculate
    if (environmentFactors.hasOwnProperty("wind") && plant.factors.hasOwnProperty("wind")) {
        totalFactor *= (plant.factors.wind[environmentFactors.wind] + 100) / 100;
    };
    // check if environmentFactor TEMP is true, and if Yes => Calculate
    if (environmentFactors.hasOwnProperty("temp") && plant.factors.hasOwnProperty("temp")) {
        totalFactor *= (plant.factors.temp[environmentFactors.temp] + 100) / 100;
    };
    //Get the yield per plant
    return plant.yield * totalFactor;
};

const getYieldForCrop = (input, environmentFactors) => {
    // First get the yield for the specific plant
    let yieldForPlant = getYieldForPlant(input.crop, environmentFactors);
    // Multiply the yield with amount of crops
    return yieldForPlant * input.numCrops;
};

const getTotalYield = ({ crops }, environmentFactors) => {
    let yieldForCrop = 0
    //Loop over all crops and calculate the sum of als yields per crop
    for (var i = 0; i < crops.length; i++) {
        yieldForCrop += getYieldForCrop(crops[i], environmentFactors);
    }
    return yieldForCrop;
};

const getCostsForCrop = (input) => {
    //Multiply number of crops with costs for 1 plant
    return input.numCrops * input.crop.price;
};


const getRevenueForCrop = (input, environmentFactors) => {
    //Multiply salePrice of 1kg with the yield of a crop (also in kilo's)
    return input.crop.salePrice * getYieldForCrop(input, environmentFactors);
};

const getProfitForCrop = (input, environmentFactors) => {
    //The profit is revenueForCrop minus costsForCrop
    return getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input, environmentFactors);
};

const getTotalProfit = ({ crops }, environmentFactors) => {
    let profitForCrop = 0
    //Loop over all crops and calculate the sum of all profits per crop
    for (var i = 0; i < crops.length; i++) {
        profitForCrop += getProfitForCrop(crops[i], environmentFactors);
    }
    return profitForCrop;
};


module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};