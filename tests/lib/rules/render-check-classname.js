/**
 * @fileoverview Tests for render-check-classname
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/render-check-classname');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

require('babel-eslint');

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run('render-check-classname', rule, {
  valid: [
    {
      code: '<button className="btn"/>'
    },
    {
      code: '<Button className="btn"/>',
    },
    {
      code: '<Button className={`btn`}/>',
    },
    {
      code: 'React.createElement("button", {className: "btn"})',
    },
    {
      code: `const config = {className: "btn"};
        React.createElement("button", config)`,
    },
    {
      code: 'React.createElement(Button, {className: "btn"})',
    }
  ],

  invalid: [
    {
      code: '<button class="btn"/>',
      errors: [{ message: 'Using className instead of class in tag <button>' }],
      output: '<button className="btn"/>'
    },
    {
      code: '<Button class="btn"/>',
      errors: [{ message: 'Using className instead of class in tag <Button>' }],
      output: '<Button className="btn"/>'
    },
    {
      code: '<Button class={`btn`}/>',
      errors: [{ message: 'Using className instead of class in tag <Button>' }],
      output: '<Button className={`btn`}/>'
    },
    {
      code: 'React.createElement("button", {class: "btn"})',
      errors: [{ message: 'Using className instead of class in function "createElement"'}],
      output: 'React.createElement("button", {className: "btn"})'
    },
    {
      code: `const config = {class: "btn"};
        React.createElement("button", config)`,
      errors: [{ message: 'Using className instead of class in function "createElement"'}],
      output: `const config = {className: "btn"};
        React.createElement("button", config)`
    },
    {
      code: 'React.createElement(Button, {class: "btn"})',
      errors: [{ message: 'Using className instead of class in function "createElement"'}],
      output: 'React.createElement(Button, {className: "btn"})'
    }
  ]
});