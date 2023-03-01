"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preProcessing = void 0;
const preProcessing_1 = require("../module/preProcessing");
async function preProcessing(context) {
    (0, preProcessing_1.itemsGameParse)(context);
    console.log("itemsGameParse");
    // parsePanoramaAPI(context);
    // console.log("parsePanoramaAPI");
    // parseCssDocument(context);
    // console.log("parseCssDocument");
    // parseEventDocument(context);
    // console.log("parseEventDocument");
    // parsePanelList(context);
    // console.log("parsePanelList");
    (0, preProcessing_1.vsndGenerator)(context);
    console.log("vsndGenerator");
    // parseLuaAPI(context);
    // console.log("parseLuaAPI");
    // parseLuaAPIChangelog(context);
    // console.log("parseLuaAPIChangelog");
    // rogueItemsGameParse(context);
    // console.log("parseLuaAPIChangelog");
}
exports.preProcessing = preProcessing;
//# sourceMappingURL=cmdPreProcessing.js.map