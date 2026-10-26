# Security policy

GBS SE Agent reads, edits and runs code on the user's machine, so security reports are taken seriously and handled
before anything else.

## Reporting a vulnerability

**Do not open a public issue.** Report it privately through GitHub:
[Security → Report a vulnerability](https://github.com/gramproindia/GBS-SE-Agent/security/advisories/new).

Please include:

- what an attacker can do, and what they need first (for example "a repository the user opens", "a malicious MCP
  server", "a crafted model response");
- steps to reproduce, ideally with a minimal repository or transcript;
- the extension version (`GBS SE Agent` in the Extensions view) and your VS Code version and OS.

You will get an acknowledgement within three working days. Once a fix is released, the advisory is published with
credit to the reporter, unless you prefer otherwise.

## Supported versions

Only the latest release receives security fixes. The project is pre-1.0, so update to the newest version before
reporting.

## Scope

In scope, among others:

- getting a command run, a file written, or a server started without the approval the permission mode promises;
- a repository changing protected settings (provider, endpoints, permission mode, shell, MCP servers);
- an API key being sent anywhere other than the endpoint it was saved for;
- escaping the workspace with the file tools;
- the webview executing content from a model, file or tool result.

Out of scope:

- behaviour in **Full auto** mode, which by design never asks for approval;
- a model following instructions it was given by the user;
- prompt injection that is stopped by an approval prompt the user then accepts.

The security model is described in [architecture.md](architecture.md#security-model).
