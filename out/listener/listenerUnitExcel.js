"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenerUnitExcelInit = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const node_watch_1 = require("node-watch");
const event_1 = require("../class/event");
const getRootPath_1 = require("../utils/getRootPath");
const cmdExcel2KV_1 = require("../command/cmdExcel2KV");
const csvUtils_1 = require("../utils/csvUtils");
const statusBar_1 = require("../module/statusBar");
const kvUtils_1 = require("../utils/kvUtils");
let eventID;
let fileWatcher;
const configName = "dota2-tools.A3.listener";
let config;
/** 监听技能excel变更 */
function listenerUnitExcelInit(context) {
    if (getConfiguration()) {
        startWatch(context);
    }
    if (eventID === undefined) {
        eventID = event_1.EventManager.listenToEvent(event_1.EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, (event) => {
            if (!event.affectsConfiguration(configName) || getConfiguration() === config) {
                return;
            }
            config = getConfiguration();
            if (getConfiguration()) {
                stopWatch();
                startWatch(context);
            }
            else {
                stopWatch();
            }
        });
    }
}
exports.listenerUnitExcelInit = listenerUnitExcelInit;
/** 开始监听 */
function startWatch(context) {
    if (fileWatcher === undefined) {
        const rootPath = (0, getRootPath_1.getRootPath)();
        if (rootPath) {
            (0, statusBar_1.showStatusBarMessage)("[监听目录]：单位excel");
            let unitExcelConfig = vscode.workspace.getConfiguration().get('dota2-tools.A4.UnitExcel');
            fileWatcher = (0, node_watch_1.default)(rootPath, { recursive: true, filter: /\.csv$/ }, function (evt, name) {
                if (unitExcelConfig) {
                    (0, cmdExcel2KV_1.eachExcelConfig)(unitExcelConfig, (kvDir, excelDir) => {
                        if (path.normalize(excelDir) == path.normalize(path.dirname(name)).replace("\\csv", "")) {
                            const kvName = path.join(kvDir, path.basename(name).replace(path.extname(name), '.kv'));
                            fs.writeFileSync(kvName, (0, kvUtils_1.writeKeyValue)({ KeyValue: (0, csvUtils_1.unitCSV2KV)(name) }));
                            (0, statusBar_1.showStatusBarMessage)("[excel导出kv]：" + path.basename(name).replace(path.extname(name), '.kv'));
                            // excel2kv(kvDir, excelDir, unitCSV2KV);
                            return false;
                        }
                    });
                }
            });
        }
        else {
            // vscode.window.showErrorMessage(`[${localize("listenerLocalizationInit")}]${localize("game_folder_no_found")}`);
        }
    }
}
/** 停止监听 */
function stopWatch() {
    if (fileWatcher) {
        (0, statusBar_1.showStatusBarMessage)("[停止监听目录]：单位excel");
        fileWatcher.close();
        fileWatcher = undefined;
    }
}
/** 是否开启监听 */
function getConfiguration() {
    let listenerConfig = vscode.workspace.getConfiguration().get(configName);
    if (listenerConfig) {
        return listenerConfig.unit_excel || false;
    }
}
//# sourceMappingURL=listenerUnitExcel.js.map