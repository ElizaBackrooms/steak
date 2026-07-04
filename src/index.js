import { pathToFileURL } from "node:url";

export function greet(name = "world") {
  return `Hello, ${name}!`;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(greet("steak"));
}
