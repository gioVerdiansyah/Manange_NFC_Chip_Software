const isEmptyObject = (data) => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return false;
    }

    return Object.keys(data).length >=1;
};

const isInteger = (value) => {
    return typeof value === 'number' && Number.isInteger(value);
};

const isString = (value) => {
    return typeof value === 'string';
};

const isBoolean = (value) => {
    return typeof value === 'boolean';
};

const isFloat = (value) => {
    return typeof value === 'number' && !Number.isInteger(value);
};

export {
    isEmptyObject,
    isInteger,
    isString,
    isBoolean,
    isFloat
}