const { data } = require('./data.js');

const FILTER_ARG = '--filter=';
const COUNT_ARG = '--count';

function getFilter() {
    return process.argv.find((val) => val.startsWith(FILTER_ARG))?.replace(FILTER_ARG, '') ?? '';
}

function hasCountArgv() {
    return process.argv.includes(COUNT_ARG);
}

function getFilteredData() {
    const filter = getFilter();
    
    const isIncludedFilter = ({ name }) => name.toLowerCase().includes(filter?.toLowerCase());
    
    return data.map(country => ({
        ...country,
        people: country.people.map((p) => ({
            ...p,
            animals: p.animals.filter(isIncludedFilter),
        })).filter(({ animals }) => animals.length),
    })).filter(({ people }) => people.length);
}

function getDataWithCount() {
    if (!hasCountArgv()) {
        return data;
    }
    const addChildCountToName = (name, child) => {
        return `${name} [${child.length}]`;
    }
    return data.map(country => ({
        name: addChildCountToName(country.name, country.people),
        people: country.people.map((p) => ({
            ...p,
            name: addChildCountToName(p.name, p.animals),
        })),
    }));
}

console.dir(getFilteredData(), { depth: 5 });
console.dir(getDataWithCount(), { depth: 5 });

module.exports = {
    FILTER_ARG,
    COUNT_ARG,
    getFilter,
    getFilteredData,
    getDataWithCount,
    hasCountArgv,
}