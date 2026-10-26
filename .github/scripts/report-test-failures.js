// Turns the "N failing" section of mocha's output into GitHub annotations, so a failing test
// is visible on the run summary and the pull request without opening the log.
const fs = require("fs");

const file = process.argv[2];
if (!file || !fs.existsSync(file)) {
  console.log(`::error title=Integration tests::No test output found at ${file}`);
  process.exit(0);
}

const output = fs.readFileSync(file, "utf8").replace(/\x1b\[[0-9;]*m/g, "");
const start = output.search(/^\s*\d+ failing/m);
if (start < 0) {
  const tail = output.split(/\r?\n/).slice(-40).join("\n");
  console.log(`::error title=Integration tests::The test run failed before mocha reported results.%0A${encode(tail)}`);
  process.exit(0);
}

// Each failure starts with "  1) Suite name" and runs until the next numbered failure.
const blocks = output.slice(start).split(/\r?\n(?=\s{2}\d+\) )/).slice(1);
for (const block of blocks.slice(0, 10)) {
  const lines = block.split(/\r?\n/).filter((l) => !/^\s+at /.test(l)).slice(0, 25);
  const title = `${lines[0].trim().replace(/^\d+\)\s*/, "")} › ${(lines[1] || "").trim().replace(/:$/, "")}`;
  console.log(`::error title=${encode(title).replace(/[:,]/g, " ")}::${encode(lines.join("\n"))}`);
}

function encode(text) {
  return text.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
