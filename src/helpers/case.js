const toCamelCase = (text) => {
    return text.replace(/-\w/g, clearAndUpper);
}

const toPascalCase = (text) => {
    return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

const clearAndUpper = (text) => {
    return text.replace(/-/, "").toUpperCase();
}

export {toCamelCase}

export {toPascalCase}

export {clearAndUpper}