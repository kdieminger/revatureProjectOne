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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
var dynamo_1 = __importDefault(require("../dynamo/dynamo"));
var log_1 = __importDefault(require("../log"));
var OfferService = /** @class */ (function () {
    function OfferService() {
        this.doc = dynamo_1.default;
    }
    OfferService.prototype.addOffer = function (offer) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'offers',
                            Item: offer,
                            ConditionExpression: '#offerID <> :offerID',
                            ExpressionAttributeNames: {
                                '#offerID': 'offerID'
                            },
                            ExpressionAttributeValues: {
                                ':offerID': offer.offerID
                            }
                        };
                        return [4 /*yield*/, this.doc.put(params).promise().then(function () {
                                log_1.default.info('successfully created an offer');
                                return true;
                            }).catch(function (error) {
                                log_1.default.error(error);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OfferService.prototype.removeOffer = function (offerID) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            TableName: 'offers',
                            Key: {
                                offerID: offerID
                            }
                        };
                        return [4 /*yield*/, this.doc.delete(params).promise().then(function () {
                                log_1.default.info('successfully deleted offer');
                                return true;
                            }).catch(function (error) {
                                log_1.default.error(error);
                                return false;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OfferService.prototype.getOffers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doc.scan({ 'TableName': 'offers' }).promise().then(function (result) {
                            return result.Items;
                        }).catch(function (err) {
                            log_1.default.error(err);
                            return [];
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OfferService.prototype.getOfferByID = function (offerID) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log_1.default.debug("getOfferByID called with param " + offerID);
                        params = {
                            TableName: 'offers',
                            Key: {
                                'offerID': offerID
                            }
                        };
                        return [4 /*yield*/, this.doc.get(params).promise().then(function (data) {
                                if (data && data.Item) {
                                    return data.Item;
                                }
                                else {
                                    return null;
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return OfferService;
}());
exports.OfferService = OfferService;
var offerService = new OfferService();
exports.default = offerService;
