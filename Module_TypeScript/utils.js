"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kiemTraSoNguyenTo = exports.tinhGiaiThua = void 0;
function tinhGiaiThua(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * tinhGiaiThua(n - 1);
    }
}
exports.tinhGiaiThua = tinhGiaiThua;
function kiemTraSoNguyenTo(n) {
    if (n <= 1) {
        return false;
    }
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
exports.kiemTraSoNguyenTo = kiemTraSoNguyenTo;
