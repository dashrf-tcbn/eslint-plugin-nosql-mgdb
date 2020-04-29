/**
 * @fileoverview no vanila mongoDB
 * @author manita
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// used for checking if CallExpression node's calle.name is a mongoDB CRUD command
let crudCommands = [
    "insertOne",
    "insertMany",
    "find",
    "findOne",
    "updateOne",
    "updateMany",
    "replaceOne",
    "deleteOne",
    "deleteMany",
    "bulkWrite"
];

let insecureFunctions = [
    "eval",
    "setTimeOut",
    "setInterval",
    "Function",
]

module.exports.rules = {
    "use-orm": context =>
    ({ CallExpression: (node) =>
        {
            // check if it's a something like require('mongodb') or not
            if (typeof node.callee !== 'undefined' && node.arguments.length != 0)  {
                if ( node.callee.name == "require" && node.arguments[0].value == 'mongodb' ) {
                    context.report(node, "Don't use vanilla mongodb, use ORM like sequelizejs or mongoose instead");
                }
            }
        }
    }),
    "use-sanitizer" : context =>
    ({ CallExpression: (node) =>
        {
            // check if it's a something like db.crudCommands.({username : String(req.body.username}) or not
            if (typeof node.callee !== 'undefined' && node.arguments.length != 0) {
                if (typeof node.callee.property !== 'undefined') {
                    if (crudCommands.includes(node.callee.property.name) ) {
                        node.arguments[0].properties.forEach((prop) => {
                            if (!(prop.value.type === 'CallExpression')) {
                                context.report(node, "mongodb crud arguments properties' value must be sanitized or use String()");
                            }
                        })
                    }
                }
            }
        }
    }),
    "no-auth-function" : context =>
    ({ CallExpression: (node) =>
        {
            // check if it's a something like db.crudCommands.({ some prop }, auth_function) or not
            if (typeof node.callee !== 'undefined' && node.arguments.length == 2) {
                if (typeof node.callee.property !== 'undefined') {
                    if (crudCommands.includes(node.callee.property.name) && (node.arguments[0].type == 'ObjectExpression' && node.arguments[1].type === 'Identifier')) {
                        context.report(node, "Don't use auth function, it' vulnerable to Blind injections");
                    }
                }
            }
        }

    }),
    "no-where" : context =>
    ({ Property: (node) =>
        {
            // check if is there a $where in .js file
            if (node.key.name == "$where") {
                    context.report(node, "Don't use mongodb $where");
            }
        }
    }),
    "no-exec": context =>
    ({ CallExpression: (node) =>
        {
            // check if is there a exec() in .js file
            if (typeof node.callee !== 'undefined') {
                if (node.callee.name == "exec") {
                    context.report(node, "Don't use exec() use execFile() instead");
                }
            }
        }
    }),
    "no-insecure-function": context =>
    ({ CallExpression: (node) =>
        {
            // check if is there a eval() in .js file
            if (typeof node.callee !== 'undefined') {
                if (insecureFunction.includes(node.callee.name)) {
                    context.report(node, "Don't use `${node.calle.name}`() it's a inscure function");
                }
            }
        }
    }),
}

