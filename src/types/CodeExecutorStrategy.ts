//we are writing below strtegy code, to improve the code implementation in runPythonDocker.ts

export default interface CodeExecutorStrategy{
    execute(code : string , inputTestCase : string):string
        

}