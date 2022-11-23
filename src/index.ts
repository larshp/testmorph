import { CallExpression, Project, StringLiteral } from "ts-morph";

const project = new Project();

const file = project.createSourceFile("input.ts", `console.dir("hello world");`);

let result = "";

for (const s of file.getStatements()) {
//  console.log(s.constructor.name);
  for (const e of s.forEachChildAsArray()) {
//    console.log(e.constructor.name);
    if (e instanceof CallExpression) {
      if (e.getExpression().getText() === "console.dir") {
        result += "WRITE ";
      }

      const argument = e.getArguments()[0] as StringLiteral;
      result += "`" + argument.getLiteralValue() + "`";
    }
  }
  result += ".\n";
}

console.log(result);