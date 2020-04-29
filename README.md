# eslint-plugin-nosql-mgdb
an eslint plugin to check if there is a vulnerable to injection code in node.js + mongodb .js files
and my project for cp432 computer security course at Srinakharinwirot University

## How this plugin works 
this plugin is designed to mitigate nosql injection attacks by using knownledge about nosql injections from  https://github.com/lirantal/nodejssecurity/blob/master/manuscript/injections.md  
from that url the nosql injection flaws is breaked down into 4 types
#### 1. NoSQL Injections
nosql injections using manipulated inputs 
#### 2. NoSQL SSJS Injections
this type of injection occurs when a server-side component allows the execution of arbitrary JavaScript code in the server context.
#### 3. Blind NoSQL Injections
this injection is used when dev mitigate NoSQL Injections by invoking function after first data is qurried (such as invoking function to authen password after username is qurried)  
surely the invoked function is mitigating NoSQL Injuctions but such code still vulnerable to regex inputs
#### 4. OS Command Injection
attackers can exploit this type of injection when a function allows to spawn a shell and then execute a given command within that shell context such as ```child_process.exec()``` is being used

### Eslint rules in this plugin
this plugin packed with 6 rules. these 6 rules are divided into 4 typed to mitigate the NoSQL injections mentioned aboved.
1. rules to mitigate NoSQL injections  
  * nosql-mgdb/use-orm: this rule check if vanialla mongodb is not being used or not
  * nosql-mgdb/use-satinizer: this rule assert that the mongoDB CRUD commands' input must be a function (either a satinizer function or String())
2. rule to mitigate NoSQL SSJS Injections
  * nosql-mgdb/no-where: the rule's name say it all doesn't it ?
  * nosql-mgdb/no-insecure-function: this rule check that if there is a insecure function (such as setTimeOut()) or not 
3. rules to mitigate Blind NoSQL Injections
  * nosql-mgdb/no-auth-function: this rule checks that if mongoDB CRUD commands' second property is a Identifier node (a function name) or not
4. rule to mitigate OS Command Injection
  * nosql-mgdb/no-insecure-os-command: this rule checks that if there is a insecure os command (such as exec()) or not 

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
4. edit your .eslintconfigrc.js add plugin and rules to it so that eslint can recognize this plugin and its rules
```
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
run
```
npx eslint /path-to-your-.js-file
```
now you can easily check if there is a vulnerable to nosql injection code in your .js file 
![exampleResults](/imgs/exampleResults.png)

### 3. Modifying
by editing index.js file you can
* add more mongdb CRUD command to be checked
* add more insecure function to be checked
* add more insecure os function to be checked
* define new rule
