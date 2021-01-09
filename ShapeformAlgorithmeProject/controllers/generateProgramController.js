const algoMain = require('../algorithm/AlgoMain');

module.exports = {
    getNewProgram: async (req, res, next) => {
        const program = await algoMain(900, 20, new Date(), 16);
        res.status(200).json(program);
    },
};