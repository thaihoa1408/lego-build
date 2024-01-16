const fs = require('fs');
const path = require('path');

const requireField = fieldName => {
  return value => {
    if (String(value).length === 0) {
      return fieldName + ' is required';
    }
    return true;
  };
};

module.exports = plop => {
  plop.setActionType('delete', (answers, config) => {
    const filePath = path.join(
      process.cwd(),
      `${config.path}/${answers.framework}`
    );
    console.log(filePath);

    try {
      fs.rmSync(filePath, { recursive: true, force: true });
      console.log(`Deleted ${filePath}`);
    } catch (error) {
      console.error(`Error deleting ${filePath}: ${error.message}`);
    }
  });

  plop.setGenerator('start', {
    description: 'Copy a source folder to a new destination folder',
    prompts: [
      {
        type: 'input',
        name: 'framework',
        message: 'What is your framework?',
      },
    ],
    actions: [
      {
        type: 'delete',
        path: 'output',
      },
      {
        type: 'addMany',
        destination: 'output/{{framework}}',
        base: `boilerplate/{{framework}}`,
        templateFiles: `boilerplate/{{framework}}/**`, // Copy all files and folders
        globOptions: {
          dot: true, // Include hidden files (files that start with a dot)
        },
      },
    ],
  });

  plop.setGenerator('react-component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'jsonData',
        message: 'What is your component jsonData?',
      },
    ],
    actions: answers => {
      const { name, ...rest } = JSON.parse(answers.jsonData);
      return [
        {
          type: 'add',
          path: 'output/react/src/components/{{pascalCase name}}/{{pascalCase name}}.js',
          templateFile:
            'plop-templates/Component/{{pascalCase name}}/Component.js.hbs',
          data: {
            name: name,
            parsedData: rest,
          },
        },
        {
          type: 'add',
          path: 'output/react/src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss',
          templateFile:
            'plop-templates/Component/{{pascalCase name}}/Component.module.scss.hbs',
          data: {
            name: name,
            parsedData: rest,
          },
        },
        {
          type: 'add',
          path: 'output/react/src/components/{{pascalCase name}}/index.js',
          templateFile:
            'plop-templates/Component/{{pascalCase name}}/index.js.hbs',
          data: {
            name: name,
            parsedData: rest,
          },
        },
      ];
    },
  });

  plop.setGenerator('react-page', {
    description: 'Create a page',
    prompts: [
      {
        type: 'input',
        name: 'jsonData',
        message: 'What is your page jsonData?',
      },
    ],
    actions: answers => {
      const { name, path, ...rest } = JSON.parse(answers.jsonData);
      return [
        {
          type: 'add',
          path: 'output/react/src/pages/{{pascalCase name}}/{{pascalCase name}}.js',
          templateFile: 'plop-templates/Page/{{pascalCase name}}/Page.js.hbs',
          data: {
            name: name,
            path: path,
            parsedData: rest,
          },
        },
        {
          type: 'add',
          path: 'output/react/src/pages/{{pascalCase name}}/{{pascalCase name}}.module.scss',
          templateFile:
            'plop-templates/Page/{{pascalCase name}}/Page.module.scss.hbs',
          data: {
            name: name,
            path: path,
            parsedData: rest,
          },
        },
        {
          type: 'add',
          path: 'output/react/src/pages/{{pascalCase name}}/index.js',
          templateFile: 'plop-templates/Page/{{pascalCase name}}/index.js.hbs',
          data: {
            name: name,
            path: path,
            parsedData: rest,
          },
        },
        {
          type: 'add',
          path: 'output/react/src/pages/routes.js',
          templateFile: 'plop-templates/routes.js.hbs',
          skipIfExists: true,
          data: {
            name: name,
            path: path,
            parsedData: rest,
          },
        },
        {
          type: 'append',
          path: 'output/react/src/pages/routes.js',
          pattern: `/* PAGE_IMPORT */`,
          template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
          data: {
            name: name,
            path: path,
            parsedData: rest,
          },
        },
        {
          type: 'append',
          path: 'output/react/src/pages/routes.js',
          pattern: `/* PAGE_ROUTE */`,
          template: `<Route path='{{path}}' element={<{{pascalCase name}} />} />`,
          data: {
            name: name,
            path: path,
            parsedData: rest,
          },
        },
      ];
    },
  });
};
