# Dev Setup Tips

## Plugins and Extensions:

### 1. Prettier - Code formatter
- Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - Description: Code formatter using prettier

### 2. VSCode Settings
- Update your VSCode settings: Add or update your settings to format code automatically on save. Add the following to your `settings.json` file:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

### 3. Error Lens
- Install the [Error Lens extension](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
  - Description: Improve highlighting of errors, warnings and other language diagnostics

### 4. ESLint
- Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - Description: Integrates ESLint JavaScript into VS Code