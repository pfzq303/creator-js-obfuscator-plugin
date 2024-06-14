import { IBuildTaskOption, BuildHook, IBuildResult } from '../@types';
import fs from 'fs-extra';
import JavascriptObfuscator from './jsobf.browser';
import path from 'path';

interface IOptions {
    isEnableObf: boolean;
    compact: boolean;
    controlFlowFlattening: boolean;
    controlFlowFlatteningThreshold: number;
    deadCodeInjection: boolean;
    deadCodeInjectionThreshold: number;
    debugProtection: boolean;
    debugProtectionInterval: number;
    disableConsoleOutput: boolean;
    domainLock: string[];
    domainLockRedirectUrl: string;
    forceTransformStrings: string[];
    identifiersDictionary: string[];
    identifiersPrefix: string;
    ignoreImports: boolean;
    inputFileName: string;
    log: boolean;
    numbersToExpressions: boolean;
    renameGlobals: boolean;
    renameProperties: boolean;
    reservedNames: string[];
    reservedStrings: string[];
    seed: string | number;
    selfDefending: boolean;
    simplify: boolean;
    sourceMap: boolean;
    sourceMapBaseUrl: string;
    sourceMapFileName: string;
    splitStrings: boolean;
    splitStringsChunkLength: number;
    stringArray: boolean;
    stringArrayCallsTransform: boolean;
    stringArrayCallsTransformThreshold: number;
    stringArrayIndexShift: boolean;
    stringArrayRotate: boolean;
    stringArrayShuffle: boolean;
    stringArrayWrappersChainedCalls: boolean;
    stringArrayWrappersCount: number;
    stringArrayWrappersParametersMaxCount: number;
    stringArrayThreshold: number;
    transformObjectKeys: boolean;
    unicodeEscapeSequence: boolean;
}

const PACKAGE_NAME = 'js-obfuscator';

interface ITaskOptions extends IBuildTaskOption {
    packages: {
        'js-obfuscator': IOptions;
    };
}

/**
 * 混淆
 * @param {string} filePath 文件路径
 * @param {ObfuscatorOptions} options 混淆参数
 */
function obfuscate(filePath, options) {
    const sourceCode = fs.readFileSync(filePath, 'utf8');
    const obfuscationResult = JavascriptObfuscator.obfuscate(sourceCode, options);
    const obfuscatedCode = obfuscationResult.getObfuscatedCode();
    fs.writeFileSync(filePath, obfuscatedCode);
  }

export const throwError: BuildHook.throwError = true;

export const load: BuildHook.load = async function() {
};

export const onBeforeBuild: BuildHook.onBeforeBuild = async function(options: ITaskOptions, result: IBuildResult) {
};

function listJsFile(list, dir, filter:Array<String>, flag){
    list = list || []
	var arr = fs.readdirSync(dir);
	arr.forEach(function(item){
		var fullpath = path.join(dir,item);
		var stats = fs.statSync(fullpath);
		if(stats.isDirectory()){
			listJsFile(list, fullpath, filter, flag || filter.indexOf(item) !== -1);
		}else{
            if(flag && item.endsWith('.js')) {
                list.push(fullpath);
            }
		}
	});
	return list;
}

export const onBeforeCompressSettings: BuildHook.onBeforeCompressSettings = async function(options: ITaskOptions, result: IBuildResult) {
};

export const onAfterCompressSettings: BuildHook.onAfterCompressSettings = async function(options: ITaskOptions, result: IBuildResult) {
    const pkgOptions = options.packages[PACKAGE_NAME];
    console.debug("result.dest:", result.dest)
    if(!pkgOptions.isEnableObf) {
        console.debug('isEnableObf is false, skip obfuscator.');
        return;
    }
    let arr = listJsFile([], path.join(result.dest, 'assets'), ['main'], false);
    arr.forEach((item) => {
        console.debug('obfuscator:', item);
        obfuscate(item, pkgOptions)
    })
};

export const onAfterBuild: BuildHook.onAfterBuild = async function(options: ITaskOptions, result: IBuildResult) {
};

export const unload: BuildHook.unload = async function() {
};

export const onError: BuildHook.onError = async function(options, result) {
};

export const onBeforeMake: BuildHook.onBeforeMake = async function(root, options) {
};

export const onAfterMake: BuildHook.onAfterMake = async function(root, options) {
};
