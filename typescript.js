import path from 'node:path';
import {includeIgnoreFile} from '@eslint/compat';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

const gitignorePath = path.resolve('.', '.gitignore');

const stylisticConfigs = stylistic.configs.customize({
    indent: 4,
    quotes: 'single',
    semi: true,
    jsx: true,
    commaDangle: 'always-multiline',
});

export const typescriptConfig = [
    includeIgnoreFile(gitignorePath),
    {
        name: 'js/config',
        ...eslint.configs.recommended,
    },
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    stylisticConfigs,
    // 开启
    {
        rules: {
            'max-lines': [
                'error',
                {
                    max: 140,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],
            'no-useless-concat': 'error',
            'max-depth': 'error',
            'func-names': 'error',
            'prefer-spread': 'error',
            'prefer-promise-reject-errors': 'error',
            'no-param-reassign': 'error',
            'complexity': 'error',
            'guard-for-in': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    ignoreRestSiblings: true,
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-empty-interface': 'error',
            '@stylistic/object-curly-spacing': ['error', 'never'],
        },
    },
    // 关闭
    {
        rules: {
            // 大部分情况建议还是按照正常的 true 在前，不排除有的时候 false 在前会让代码更清晰
            'no-negated-condition': 'off',
            // 后端经常返回一些带下划线的字段，方便起见关闭，但还是建议使用驼峰命名
            'camelcase': 'off',
            // 后端经常返回一些带下划线的字段，方便起见关闭，但还是建议使用驼峰命名
            'no-underscore-dangle': 'off',
            // 允许使用 ts-ignore 注释
            '@typescript-eslint/ban-ts-comment': 'off',
            // 允许字符串和数字相加
            '@typescript-eslint/restrict-plus-operands': 'off',
            // 在我们的场景中 class 和 interface 的顺序并不重要
            '@typescript-eslint/member-ordering': 'off',
            // 允许使用 any 类型
            '@typescript-eslint/no-explicit-any': 'off',
            // 允许一些 expressions 来注入一些副作用
            '@typescript-eslint/no-unused-expressions': 'off',
            // 有的时候我们希望在一行内写下比较紧凑的 jsx
            '@stylistic/jsx-one-expression-per-line': 'off',
            // 有的时候我们希望显式的指明 jsx 中的的字符串，比如在一系列字符串中保持一致
            '@stylistic/jsx-curly-brace-presence': 'off',
            // 三目运算符导致缩进混乱
            '@stylistic/multiline-ternary': 'off',
        },
    },
];
