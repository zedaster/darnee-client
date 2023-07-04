export function createEnum(values) {
    return values.reduce((acc, value) => {
        acc[value.toUpperCase()] = value;
        return acc;
    }, {});
}