# build the whole project contains the front back and llmEngine stuffs : dependant on the exteranl llm folder : test
import subprocess
import concurrent.futures
def runCommand(co, command, targetFile, path) :

    # must check for the paths and then start subprocess for them
    # if the path is existed you have to through error or and terminate all the stuffs
    # you have to try catch on run command  : and if you catch you have to terminate all the process
    # critical file is testFolder : contains the llm stuffs

    future = co.Future()
    opInstance = co.ThreadPoolExecutor(max_workers=1).submit(
        subprocess.run,
        [str(command) + ' ' + str(targetFile)],
        shell=True,
        cwd=path
    )

    return future;

    pass;

# if you want some ascii art must set at the end of last task : that wil indicate of last operation done : its coupled in the last task : internal

# specify the tasks for building the project
webtasks = {'webServer' : ['bun run ', 'server.js', './webServer/src/server'], 'webInterface' :['npx webpack server --mode development','','./'],'llmEngine' : ['python','sympllmTcpserver.py','./LlmEngine/llmEngine/quantized'],'translateEngine': ['python', 'sympTranslate.py' , './LlmEngine/llmEngine/quantized']};

def taskRunner(co , tasks) :
    futures = [];
    for t in tasks :
        print(tasks[t][0] , tasks[t][1] , tasks[t][2], 'build & ran' , ':' , t);

        # need to check for the arguments also
        futures.append(runCommand(co,tasks[t][0] , tasks[t][1] , tasks[t][2]));

    return futures, co;


def main () :
    futures , c = taskRunner(concurrent.futures , webtasks);
    c.wait(futures);



if __name__ == "__main__" :
    main();
