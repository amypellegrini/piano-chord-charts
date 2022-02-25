/**
 * Integration test helper
 * Author: Andrés Zorro <zorrodg@gmail.com>
 * Source: https://gist.github.com/zorrodg/c349cf54a3f6d0a9ba62e0f4066f31cb
 *  MIT License: Copyright © 2019 Andrés Zorro
 */

import { existsSync } from "fs";
import { constants } from "os";
import spawn from "cross-spawn";
import concat from "concat-stream";
import { ChildProcess } from "child_process";

const PATH = process.env.PATH;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Environment = null | { DEBUG?: boolean; [key: string]: any };

interface ExecutionOptions {
  env?: Environment;
  timeout?: number;
  maxTimeout?: number;
}

class ProcessPromise<T> extends Promise<T> {
  attachedProcess: ChildProcess | null;
  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void
  ) {
    super(executor);
    this.attachedProcess = null;
  }
}

const createProcess = (
  processPath: string,
  args: string[] = [],
  env: Environment = null
): ChildProcess => {
  // Ensure that path exists
  if (!processPath || !existsSync(processPath)) {
    throw new Error("Invalid process path");
  }

  args = [processPath].concat(args);

  // This works for node based CLIs, but can easily be adjusted to
  // any other process installed in the system
  return spawn("node", args, {
    env: Object.assign(
      {
        NODE_ENV: "test",
        preventAutoStart: false,
        PATH, // This is needed in order to get all the binaries in your current terminal
      },
      env
    ),
    stdio: [null, null, null, "ipc"], // This enables interprocess communication (IPC)
  });
};

const executeWithInput = (
  processPath: string,
  args: string[] = [],
  inputs: string[] = [],
  opts: ExecutionOptions = {}
): ProcessPromise<string> => {
  if (!Array.isArray(inputs)) {
    opts = inputs;
    inputs = [];
  }

  const { env = null, timeout = 100, maxTimeout = 10000 } = opts;
  const childProcess = createProcess(processPath, args, env);
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const stdin = childProcess.stdin!;
  const stdout = childProcess.stdout!;
  const stderr = childProcess.stderr!;
  /* eslint-enable @typescript-eslint/no-non-null-assertion */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (stdin as any).setEncoding("utf-8");

  let currentInputTimeout: NodeJS.Timeout;
  let killIOTimeout: NodeJS.Timeout;

  // Creates a loop to feed user inputs to the child process in order to get results from the tool
  // This code is heavily inspired (if not blantantly copied) from inquirer-test:
  // https://github.com/ewnd9/inquirer-test/blob/6e2c40bbd39a061d3e52a8b1ee52cdac88f8d7f7/index.js#L14
  const loop = (inputs: string[]) => {
    if (killIOTimeout) {
      clearTimeout(killIOTimeout);
    }

    if (!inputs.length) {
      stdin.end();

      // Set a timeout to wait for CLI response. If CLI takes longer than
      // maxTimeout to respond, kill the childProcess and notify user
      killIOTimeout = setTimeout(() => {
        console.error("Error: Reached I/O timeout");
        childProcess.kill(constants.signals.SIGTERM);
      }, maxTimeout);

      return;
    }

    currentInputTimeout = setTimeout(() => {
      stdin.write(inputs[0]);
      // Log debug I/O statements on tests
      if (env && env.DEBUG) {
        console.log("input:", inputs[0]);
      }
      loop(inputs.slice(1));
    }, timeout);
  };

  const promise: ProcessPromise<string> = new Promise((resolve, reject) => {
    // Get errors from CLI
    stderr.on("data", (data) => {
      // Log debug I/O statements on tests
      if (env && env.DEBUG) {
        console.log("error:", data.toString());
      }
    });

    // Get output from CLI
    stdout.on("data", (data) => {
      // Log debug I/O statements on tests
      if (env && env.DEBUG) {
        console.log("output:", data.toString());
      }
    });

    stderr.once("data", (err) => {
      stdin.end();

      if (currentInputTimeout) {
        clearTimeout(currentInputTimeout);
        inputs = [];
      }
      reject(err.toString());
    });

    childProcess.on("error", reject);

    // Kick off the process
    loop(inputs);

    stdout.pipe(
      concat((result) => {
        if (killIOTimeout) {
          clearTimeout(killIOTimeout);
        }

        resolve(result.toString());
      })
    );
  }) as ProcessPromise<string>;

  // Appending the process to the promise, in order to
  // add additional parameters or behavior (such as IPC communication)
  promise.attachedProcess = childProcess;

  return promise;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CreateFunction = (...args: any) => ProcessPromise<string>;

const DOWN = "\x1B\x5B\x42";
const UP = "\x1B\x5B\x41";
const ENTER = "\x0D";
const SPACE = "\x20";

const create = (processPath: string): { execute: CreateFunction } => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fn = (...args: any) => executeWithInput(processPath, ...args);

  return {
    execute: fn,
  };
};

export default { createProcess, create, DOWN, UP, ENTER, SPACE };
