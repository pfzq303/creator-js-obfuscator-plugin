import { BuildPlugin } from '../@types';
const PACKAGE_NAME = 'js-obfuscator';

export const load: BuildPlugin.load = function() {
    console.debug(`${PACKAGE_NAME} load`);
};

export const unload: BuildPlugin.load = function() {
    console.debug(`${PACKAGE_NAME} unload`);
};


const complexTestItems = {
    number: {
        label: `i18n:${PACKAGE_NAME}.options.complexTestNumber`,
        description: `i18n:${PACKAGE_NAME}.options.complexTestNumber`,
        default: 80,
        render: {
            ui: 'ui-num-input',
            attributes: {
                step: 1,
                min: 0,
            },
        },
    },
    string: {
        label: `i18n:${PACKAGE_NAME}.options.complexTestString`,
        description: `i18n:${PACKAGE_NAME}.options.complexTestString`,
        default: 'cocos',
        render: {
            ui: 'ui-input',
            attributes: {
                placeholder: `i18n:${PACKAGE_NAME}.options.enterCocos`,
            },
        },
        verifyRules: ['ruleTest'],
    },
    boolean: {
        label: `i18n:${PACKAGE_NAME}.options.complexTestBoolean`,
        description: `i18n:${PACKAGE_NAME}.options.complexTestBoolean`,
        default: true,
        render: {
            ui: 'ui-checkbox',
        },
    },
};

export const configs: BuildPlugin.Configs = {
    '*': {
        hooks: './hooks',
        doc: 'editor/publish/custom-build-plugin.html',
        options: {
            isEnableObf: {
                label: `i18n:${PACKAGE_NAME}.options.isEnableObf`,
                default: false,
                render: {
                    ui: 'ui-checkbox',
                },
            },
            compact: {
                label: `i18n:${PACKAGE_NAME}.options.compact`,
                default: true,
                render: {
                    ui: 'ui-checkbox',
                },
            },
            controlFlowFlattening: {
                label: `i18n:${PACKAGE_NAME}.options.controlFlowFlattening`,
                default: false,
                render: {
                    ui: 'ui-checkbox',
                },
            },
            controlFlowFlatteningThreshold: {
                label: `i18n:${PACKAGE_NAME}.options.controlFlowFlatteningThreshold`,
                default: 0.25,
                render: {
                    ui: 'ui-num-input',
                },
            },
            deadCodeInjection: {
                label: `i18n:${PACKAGE_NAME}.options.deadCodeInjection`,
                default: false,
                render: {
                    ui: 'ui-checkbox',
                },
            },
            deadCodeInjectionThreshold: {
                label: `i18n:${PACKAGE_NAME}.options.deadCodeInjectionThreshold`,
                default: 0.1,
                render: {
                    ui: 'ui-num-input',
                },
            },
            numbersToExpressions: {
                label: `i18n:${PACKAGE_NAME}.options.numbersToExpressions`,
                default: false,
                render: {
                    ui: 'ui-checkbox',
                },
            },
            simplify: {
                label: `i18n:${PACKAGE_NAME}.options.simplify`,
                default: true,
                render: {
                    ui: 'ui-checkbox',
                },
            },
            stringArrayShuffle: {
                label: `i18n:${PACKAGE_NAME}.options.stringArrayShuffle`,
                default: true,
                render: {
                    ui: 'ui-checkbox',
                },
            },
            splitStrings: {
                label: `i18n:${PACKAGE_NAME}.options.splitStrings`,
                default: false,
                render: {
                    ui: 'ui-checkbox',
                },
            },
            stringArrayThreshold: {
                label: `i18n:${PACKAGE_NAME}.options.stringArrayThreshold`,
                default: 0.75,
                render: {
                    ui: 'ui-num-input',
                },
            },
            debugProtection: {
                label: `i18n:${PACKAGE_NAME}.options.debugProtection`,
                default: false,
                render: {
                    ui: 'ui-checkbox',
                },
            },
        },
        verifyRuleMap: {
            ruleTest: {
                message: `i18n:${PACKAGE_NAME}.options.ruleTest_msg`,
                func(val, buildOptions) {
                    if (val === 'cocos') {
                        return true;
                    }
                    return false;
                },
            },
        },
    },
};

export const assetHandlers: BuildPlugin.AssetHandlers = './asset-handlers';
