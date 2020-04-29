module.exports = {
    "plugins": [
        "nosql-mgdb"
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "nosql-mgdb/use-orm": 2,
        "nosql-mgdb/use-sanitizer": 2,
        "nosql-mgdb/no-auth-function": 2,
        "nosql-mgdb/no-where": 2,
        "nosql-mgdb/no-exec": 2,
        "nosql-mgdb/no-insecure-function": 2,
    },
};
