const {
    FILTER_ARG,
    COUNT_ARG,
    getFilter,
    getFilteredData,
    hasCountArgv,
    getDataWithCount,
} = require('./app');
const { data } = require('./data');

describe('test apps.js', () => {
    const originalArgv = process.argv;

    const applyFilter = (filter) => {
        process.argv = process.argv.concat(FILTER_ARG + filter);
    };

    const applyCount = () => {
        process.argv = process.argv.concat(COUNT_ARG);
    };

    afterEach(() => {
        process.argv = originalArgv;
    });

    describe('getFilter', () => {
        test('should get empty filter', () => {
            expect(getFilter()).toBe('');
        });
    
        test('should get filter ry', () => {
            const FILTER = 'ry'
            applyFilter(FILTER);
            expect(getFilter()).toBe(FILTER);
        });
    
        test('should not get filter because of a wrong key', () => {
            const FILTER = 'ry'
            process.argv = process.argv.concat('-f=' + FILTER, '--filtre=' + FILTER);
            expect(getFilter()).toBe('');
        });
    });

    describe('getFilteredData', () => {
        test('should not modify data', () => {
            expect(getFilteredData()).toStrictEqual(data);
        });

        test('should apply filter on data', () => {
            applyFilter('ry');
            const filteredData = [{
                name: 'Uzuzozne',
                people: [{
                    name: 'Lillie Abbott',
                    animals: [{
                        name: 'John Dory'
                    }],
                }],
            }, {
                name: 'Satanwi',
                people: [{
                    name: 'Anthony Bruno',
                    animals: [{
                        name: 'Oryx'
                    }],
                }],
            }]
            expect(getFilteredData()).toStrictEqual(filteredData);
        });

        test('should apply filter with case on data', () => {
            applyFilter('Ry');
            const filteredData = [{
                name: 'Uzuzozne',
                people: [{
                    name: 'Lillie Abbott',
                    animals: [{
                        name: 'John Dory'
                    }],
                }],
            }, {
                name: 'Satanwi',
                people: [{
                    name: 'Anthony Bruno',
                    animals: [{
                        name: 'Oryx'
                    }],
                }],
            }]
            expect(getFilteredData()).toStrictEqual(filteredData);
        });
    });

    describe('hasCountArgv', () => {
        test('should not hasCountArgv', () => {
            expect(hasCountArgv()).toBe(false);
        });
    
        test('should not hasCountArgv', () => {
            applyCount();
            expect(hasCountArgv()).toBe(true);
        });
    
        test('should not get filter because of a wrong key', () => {
            process.argv = process.argv.concat('-c', '--combien', '--conut');
            expect(hasCountArgv()).toBe(false);
        });
    });

    describe('getDataWithCount', () => {
        test('should not get data with count', () => {
            expect(getDataWithCount()).toBe(data);
        });

        test('should get data with count', () => {
            applyCount();
            const dataWithCount = getDataWithCount();
            expect(dataWithCount[0].name).toBe('Dillauti [5]');
            expect(dataWithCount[0].people[0].name).toBe('Winifred Graham [6]');
        });
    
    });
})


