module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "disallow unnecessary semicolons",
      category: 'Best Practices',
      recommended: true,
      url: ""
    },
    fixable: 'code',
  },
  create(context) {
    function isValidCreateElement(node) {
      return node.callee
        && node.callee.type === 'MemberExpression'
        && node.callee.object.name === 'React'
        && node.callee.property.name === 'createElement'
        && node.arguments.length > 0;
    }

    function hasField(scope, name) {
      for (const variable of scope.variables) {
        if(variable.name === name) {
          for (const def of variable.defs) {
            return def.node.init.properties
          }
        }
      }
    }

    return {
      JSXAttribute(node){
        const tag = node.parent.name.name;
        const prop = node.name.name;

        if (prop === "class") {
          context.report({
            node,
            message: `Using className instead of class in tag <${tag}>`,
            fix: function (fixer) {
              return fixer.replaceText(node.name, "className");
            }
          })
        }
      },

      CallExpression(node) {
        const scope = context.getScope(node)
        if (!isValidCreateElement(node)) {
          return;
        }

        let { properties, name } = node.arguments[1];
        let classProp;
        if (name) {
          properties = hasField(scope, name)
        }
        classProp = properties.find((prop) => prop.key && prop.key.name === 'class');
        if (classProp) {
          context.report({
            node,
            message: `Using className instead of class in function "createElement"`,
            fix: function (fixer) {
              return fixer.replaceText(classProp.key, "className");
            }
          });
        }
      }
    }
  }
}