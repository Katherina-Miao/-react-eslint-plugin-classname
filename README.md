# eslint-plugin-react-classname

Check using class as classname in render

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-react-classname`:

```
$ npm install eslint-plugin-react-classname --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-react-classname` globally.

## Usage

Add `react-classname` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "react-classname"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-classname/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





