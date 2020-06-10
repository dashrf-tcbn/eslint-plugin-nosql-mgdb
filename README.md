# eslint-plugin-nosql-mgdb
is an eslint plugin to check if there is a vulnerable to Injections code in node.js + mongodb .js files
and is my course project

## How this plugin works
this plugin is designed to mitigate NoSQL Injections attacks by using knownledge about NoSQL Injections from  https://github.com/lirantal/nodejssecurity/blob/master/manuscript/injections.md
from that url the NoSQL Injections flaws is breaked down into 4 types
#### 1. NoSQL Injections
NoSQL Injections using manipulated inputs<br/>cause of problems: not validate user inputs
#### 2. NoSQL SSJS Injections
this type of Injections occurs when a server-side component allows the execution of arbitrary JavaScript code in the server context.<br/>cause of problems: using $where
#### 3. Blind NoSQL Injections
this Injection is used when dev mitigate NoSQL Injections by invoking function after first data is qurried (such as invoking function to authen password after username is qurried)
surely the invoked function is mitigating NoSQL Injuctions but such code still vulnerable to regex inputs<br/>cause of problems:  using username and password that are easy to guess
#### 4. OS Command Injection
attackers can exploit this type of Injection when a function allows to spawn a shell and then execute a given command within that shell context such as ```child_process.exec()``` is being used<br/>cause of problems: using exec()

### Eslint rules in this plugin
this plugin packed with 6 rules. these 6 rules are divided into 4 typed to mitigate the NoSQL Injections mentioned above.
1. rules to mitigate NoSQL Injections
    * nosql-mgdb/use-orm  this rule check if vanialla mongodb is not being used or not
    * nosql-mgdb/use-satinizer  this rule assert that the mongoDB CRUD commands' input must be a function (either a satinizer function or String())
2. rules to mitigate NoSQL SSJS Injections
    * nosql-mgdb/no-where  the rule's name say it all doesn't it ?
    * nosql-mgdb/no-insecure-function  this rule check that if there is a insecure function (such as setTimeOut()) or not
3. rule to mitigate Blind NoSQL Injections
    * nosql-mgdb/no-auth-function  this rule checks that if mongoDB CRUD commands' second property is a Identifier node (a function name) or not
4. rule to mitigate OS Command Injection
    * nosql-mgdb/no-insecure-os-command  this rule checks that if there is a insecure os command (such as exec()) or not

## Using this plugin
on your working node.js + mongodb project root directory
### 1. Installing
1. clone or download this repo
2. install eslint if it's not installed
```https://github.com/dashrf-ktsn/eslint-plugin-nosql-mgdb/pulls
yarn add eslint
```
3. install the plugin
```
yarn add /path-to-eslint-plugin-nosql-mgdb-folder
```
4. copy this to your .eslintrc.js by adding plugin and rules to it so that eslint can recognize this plugin and its rules or use .eslintrc.js from this repo
```json
{
    "plugins": [
        "nosql-mgdb"
    ],
    "rules": {
        "nosql-mgdb/use-orm": 2,
        "nosql-mgdb/use-sanitizer": 2,
        "nosql-mgdb/no-auth-function": 2,
        "nosql-mgdb/no-where": 2,
        "nosql-mgdb/no-insecure-os-command": 2,
        "nosql-mgdb/no-insecure-function": 2,
    },
};
```
### 2. Using
run this script
```
npx eslint /path-to-your-.js-file
```
now you can easily check if there is a vulnerable to NoSQL Injections code in your .js files
![exampleResults](/imgs/exampleResults.png)

### 3. Modifying
by editing index.js file you can
* add more Mongdb CRUD commands to be checked
* add more insecure functions to be checked
* add more insecure OS functions to be checked
* define new rules
