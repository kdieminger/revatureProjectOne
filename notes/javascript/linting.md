# Linting
Linting is a process of checking your code for bad practices, bugs, and syntax errors.
Kind of like a grammar checker. Grammarly but for Code.

## ESLint
### Setup
1. `npm install --save-dev eslint`
2. `npx eslint --init`
3. Add

```json
"lint": "eslint `src/**/*.js?(x)'"
```
to our `scripts` in `package.json`.
4. Run the linter manually using `npm run lint`

## TSLint
The linter for TypeScript.
VSCode will handle this.