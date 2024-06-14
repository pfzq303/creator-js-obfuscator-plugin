"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAfterMake = exports.onBeforeMake = exports.onError = exports.unload = exports.onAfterBuild = exports.onAfterCompressSettings = exports.onBeforeCompressSettings = exports.onBeforeBuild = exports.load = exports.throwError = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const jsobf_browser_1 = __importDefault(require("./jsobf.browser"));
const path_1 = __importDefault(require("path"));
const PACKAGE_NAME = 'js-obfuscator';
/**
 * 混淆
 * @param {string} filePath 文件路径
 * @param {ObfuscatorOptions} options 混淆参数
 */
function obfuscate(filePath, options) {
    const sourceCode = fs_extra_1.default.readFileSync(filePath, 'utf8');
    const obfuscationResult = jsobf_browser_1.default.obfuscate(sourceCode, options);
    const obfuscatedCode = obfuscationResult.getObfuscatedCode();
    fs_extra_1.default.writeFileSync(filePath, obfuscatedCode);
}
exports.throwError = true;
const load = function () {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
exports.load = load;
const onBeforeBuild = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
exports.onBeforeBuild = onBeforeBuild;
function listJsFile(list, dir, filter, flag) {
    list = list || [];
    var arr = fs_extra_1.default.readdirSync(dir);
    arr.forEach(function (item) {
        var fullpath = path_1.default.join(dir, item);
        var stats = fs_extra_1.default.statSync(fullpath);
        if (stats.isDirectory()) {
            listJsFile(list, fullpath, filter, flag || filter.indexOf(item) !== -1);
        }
        else {
            if (flag && item.endsWith('.js')) {
                list.push(fullpath);
            }
        }
    });
    return list;
}
const onBeforeCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
exports.onBeforeCompressSettings = onBeforeCompressSettings;
const onAfterCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        const pkgOptions = options.packages[PACKAGE_NAME];
        console.debug("result.dest:", result.dest);
        if (!pkgOptions.isEnableObf) {
            console.debug('isEnableObf is false, skip obfuscator.');
            return;
        }
        let arr = listJsFile([], path_1.default.join(result.dest, 'assets'), ['main'], false);
        arr.forEach((item) => {
            console.debug('obfuscator:', item);
            obfuscate(item, pkgOptions);
        });
    });
};
exports.onAfterCompressSettings = onAfterCompressSettings;
const onAfterBuild = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
exports.onAfterBuild = onAfterBuild;
const unload = function () {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
exports.unload = unload;
const onError = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
exports.onError = onError;
const onBeforeMake = function (root, options) {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
exports.onBeforeMake = onBeforeMake;
const onAfterMake = function (root, options) {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
exports.onAfterMake = onAfterMake;
