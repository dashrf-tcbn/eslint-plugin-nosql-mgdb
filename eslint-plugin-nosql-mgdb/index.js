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

let osCommands = [
    "exec",
]

let insecureFunctions = [
    "eval",
    "setTimeOut",
    "setInterval",
    "Function",
];
let reqChildNode = false;

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
                    if (crudCommands.includes(node.callee.property.name) && typeof node.arguments[0].properties != 'undefined' ) {
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
    "no-insecure-os-command": context =>
    ({ CallExpression: (node) =>
        {
            if (typeof node.callee !== 'MemberExpression' && node.arguments.length != 0)  {
                if ( node.callee.name == "require" && node.arguments[0].value == 'child_process' ) {
                    reqChildNode = true;

                }
            }
            // check if is there a exec() in .js file
            if (typeof node.callee != 'undefined') {
                if (typeof node.callee.property !== 'undefined') {
                    if (osCommands.includes(node.callee.property.name)) {
                        if (node.callee.property.name == 'exec' && reqChildNode) {
                            context.report(node, "Don't use exec() use execFile() instead");
                        }
                    }
                }
            }
        }
    }),
    "use-orm": context =>
    ({ CallExpression: (node) =>
        {
            // check if it's a something like require('mongodb') or not
        }
    }),

    "no-insecure-function": context =>
    (
        { CallExpression: (node) =>
            {
                let aword = "a";
                // check if is there a eval() in .js file
                if (typeof node.callee !== 'Identifier') {
                    if (insecureFunctions.includes(node.callee.name)) {
                        context.report(node, "Don't use " + `${node.callee.name}` + "() it's a inscure function");
                    }
                }
            }
        }
    ),
}

