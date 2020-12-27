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
exports.addPending = exports.viewOwnPayments = exports.viewUserOffers = exports.viewOwnedCars = exports.userLogin = exports.registerUser = exports.offers = exports.lot = exports.data = exports.User = void 0;
var log_js_1 = __importDefault(require("../log.js"));
var user_service_js_1 = __importDefault(require("./user.service.js"));
//Class declaration
var User = /** @class */ (function () {
    function User(username, password, role, ownedCars, pendingOffers, ongoingPay) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.ownedCars = ownedCars;
        this.pendingOffers = pendingOffers;
        this.ongoingPay = ongoingPay;
    }
    ;
    return User;
}());
exports.User = User;
//ROLE NEUTRAL FUNCTIONS
//registers a user
function registerUser(userN, passW, role, callback) {
    user_service_js_1.default.addUser(new User(userN, passW, role, [], [], [])).then(function (res) {
        log_js_1.default.trace(res);
        callback();
    }).catch(function (err) {
        log_js_1.default.error(err);
        console.log('Error, this probably means that the username is already taken');
        callback();
    });
    if (role == 'Employee') {
        console.log('Welcome new employee!');
    }
    else {
        console.log('Welcome new customer!');
    }
}
exports.registerUser = registerUser;
//logs user in
function userLogin(name, pass) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log_js_1.default.trace("user login called with parameters " + name + " and " + pass);
                    return [4 /*yield*/, user_service_js_1.default.getUser(name).then(function (user) {
                            if (user && user.password === pass) {
                                return user;
                            }
                            else {
                                return null;
                            }
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.userLogin = userLogin;
;
//CUSTOMER FUNCTIONS
//lets the user view their cars
function viewOwnedCars(username) {
    log_js_1.default.info("view cars owned by " + username + ".");
    var user;
    user = exports.data.find(function (person) { return person.username === username; });
    console.log(user.ownedCars);
}
exports.viewOwnedCars = viewOwnedCars;
function viewUserOffers(username) {
    log_js_1.default.info("view offers made by " + username);
    var user = exports.data.find(function (person) { return person.username === username; });
    console.log(user.pendingOffers);
}
exports.viewUserOffers = viewUserOffers;
//allows user to view their ongoing payments
function viewOwnPayments(username) {
    log_js_1.default.info("view outstanding payments for " + username);
    var user = exports.data.find(function (person) { return person.username === username; });
    console.log(user.ongoingPay);
}
exports.viewOwnPayments = viewOwnPayments;
//SYSTEM FUNCTIONS
//add pending offer to user
function addPending(carID, username) {
    var pendOfferID = carID + username;
    var userOffer = exports.offers.find(function (off) { return off.offerID === pendOfferID; });
    var fUser = exports.data.find(function (person) { return person.username === username; });
    var newUserOffer = fUser.pendingOffers;
    newUserOffer.push(userOffer);
}
exports.addPending = addPending;
