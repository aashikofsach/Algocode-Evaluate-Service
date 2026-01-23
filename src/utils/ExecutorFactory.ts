// Here we are implementing Factory pattern --> ( classes(object), factory and cleint)

import JavaExecutor from "../containers/javaExecutor.js";
import PythonExecutor from "../containers/pythonExecutor.js";
import type CodeExecutorStrategy from "../types/CodeExecutorStrategy.js";

export default function createExecutor(
  codeLanguage: string,
): CodeExecutorStrategy | null {
  if (codeLanguage === "PYTHON") {
    return new PythonExecutor();
  } else if (codeLanguage === "JAVA") {
    return new JavaExecutor();
  } else return null;
}
