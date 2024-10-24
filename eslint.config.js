import { fixupPluginRules } from '@eslint/compat';
import eslintJS from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const patchedReactHooksPlugin = fixupPluginRules(eslintPluginReactHooks);
const patchedImportPlugin = fixupPluginRules(eslintPluginImport);

const baseESLintConfig = {
  name: 'eslint',
  extends: [eslintJS.configs.recommended],
  rules: {
    'no-await-in-loop': 'error',
    'no-duplicate-imports': 'error',
    'no-use-before-define': 'error',
    'require-atomic-updates': 'error',
    'no-promise-executor-return': 'error',
    'no-constant-binary-expression': 'warn',
    'no-new-native-nonconstructor': 'warn',
    'no-self-compare': 'warn',
    'no-template-curly-in-string': 'warn',
    'no-unmodified-loop-condition': 'warn',
    'no-unreachable-loop': 'warn',
    'no-unused-private-class-members': 'warn',
    camelcase: 'warn',
  },
};

const typescriptConfig = {
  name: 'typescript',
  extends: [...typescriptEslint.configs.recommendedTypeChecked],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: { modules: true },
      ecmaVersion: 'latest',
      project: './tsconfig.json',
    },
    globals: {
      ...globals.builtin,
      ...globals.browser,
      ...globals.es2025,
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: 'error',
  },
  plugins: {
    import: patchedImportPlugin,
  },
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',

    '@typescript-eslint/consistent-type-exports': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-useless-empty-export': 'warn',

    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'warn',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};

const reactConfig = {
  name: 'react',
  extends: [eslintPluginReact.configs.flat['jsx-runtime']],
  plugins: {
    'react-hooks': patchedReactHooksPlugin,
    'react-refresh': eslintPluginReactRefresh,
  },
  rules: {
    'import/no-anonymous-default-export': 'error',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-no-target-blank': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
        multiline: 'last',
      },
    ],
    'react/no-unknown-property': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    ...patchedReactHooksPlugin.configs.recommended.rules,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};

const jsxA11yConfig = {
  name: 'jsxA11y',
  ...jsxA11yPlugin.flatConfigs.recommended,
  plugins: {
    'jsx-a11y': jsxA11yPlugin,
  },
  rules: {
    'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
  },
};

const eslintConfig = typescriptEslint.config(
  baseESLintConfig,
  typescriptConfig,
  eslintConfigPrettier,
  reactConfig,
  jsxA11yConfig,
);

eslintConfig.map(config => {
  config.files = ['src/**/*.ts', 'src/**/*.tsx'];
});

export default eslintConfig;
