/// <reference types="node" />
/// <reference types="jasmine" />
interface WebpackRequire extends NodeRequire {
    context(dir: string, includeSubdirs: boolean, matchFiles: RegExp) : any;
}

const wpRequire = require as WebpackRequire;

const testsContext = wpRequire.context(".", true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);