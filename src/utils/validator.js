export function isValidName(name) {
    // return true if the name contains between 1 and 32 characters of a-z, A-Z, 0-9 and space.
    // And it doesn't start or end with space and doesn't contain more than one space in a row
    return !name.startsWith(' ') && !name.endsWith(' ') && name.match(/^[a-zA-Z0-9 ]{1,32}$/) &&
        !name.includes('  ');
}

export function isValidEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}