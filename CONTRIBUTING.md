# Contributing to GBS SE Agent

Thanks for helping. This guide covers setting up, the checks a change must pass, and how pull requests are reviewed.

## Setting up

Requirements: Node.js 22, VS Code 1.120 or later, and Git.

```bash
git clone https://github.com/gramproindia/agent.git
cd agent
npm install
code .
```

- Press <kbd>F5</kbd> to start an Extension Development Host with the extension loaded. The watch task rebuilds on save.
- Run **GBS Agent: Show Logs** in the development host to see requests, tool calls and errors.
- [architecture.md](architecture.md) explains how the agent loop, tools, permissions, skills and MCP servers fit
  together. Read it before changing any of them.

## Checks

| Command | What it does |
|---|---|
| `npm run check-types` | TypeScript, strict mode |
| `npm run lint` | ESLint |
| `npm test` | Compiles, lints, and runs the integration tests in a real VS Code instance |
| `npx vsce package` | Builds the `.vsix` the way a release does |

CI runs type checking, lint and the tests on Windows, macOS and Linux for every pull request. A pull request is
merged only when all of them pass.

## Making a change

1. Open an issue first for anything bigger than a small fix, so the approach can be agreed before you write it.
2. Branch from `main`: `feat/<short-name>`, `fix/<short-name>` or `docs/<short-name>`.
3. Keep changes focused. Unrelated clean-ups belong in their own pull request.
4. Add or update tests in `src/test/`. Bugs get a test that fails without the fix.
5. Update the docs that the change affects: `README.md` for users, `architecture.md` for maintainers, and an entry
   under **Unreleased** in `CHANGELOG.md`.
6. Open a pull request and fill in the template.

### Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `test:`, `refactor:`,
`chore:`. Write the subject in the imperative ("add MCP reload command"), and explain why in the body when it is not
obvious.

### Code style

- Match the surrounding code: naming, comment density, and the existing helpers.
- No new runtime dependencies without discussion. The extension ships with none, and that is deliberate.
- Anything that can run a command, write a file, start a process or send data off the machine must go through the
  permission system (`src/agent/permissions.ts`). Changes there need a test and a maintainer review.
- User-facing text is plain and specific: say what happened and what to do next.

## Reporting bugs and asking for features

Use the [issue templates](https://github.com/gramproindia/agent/issues/new/choose). Security problems go
through [private reporting](SECURITY.md), never a public issue.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
