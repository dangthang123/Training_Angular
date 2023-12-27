"use strict";
// -----------------Bài 1--------------------
Object.defineProperty(exports, "__esModule", { value: true });
var tinhTong = function (arr) {
    var tong = 0;
    for (var i = 0; i < arr.length; i++) {
        tong += arr[i];
    }
    return tong;
};
var mang = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var tongMang;
tongMang = tinhTong(mang);
var actor;
actor = { name: 'Thang', age: 23, email: 'dangthangtn123@gmail.com' };
var inThongTin = function (person) {
    console.log("Name: ".concat(person.name));
    console.log("Age: ".concat(person.age));
    console.log("Email: ".concat(person.email));
};
console.log(inThongTin(actor));
// ---------------------Bài 3-----------------------
var layPhanTuDauTien = function (arr) {
    if (arr.length > 0) {
        return arr[0];
    }
    else {
        return undefined;
    }
};
var mangChuoi = ['a', 'b', 'c'];
var phanTuDauTienmang;
phanTuDauTienmang = layPhanTuDauTien(mangChuoi);
// console.log(`Phần từ đầu tiên của mảng: ${phanTuDauTienmang}`);
// ---------------------Bài 4-----------------------
var Colors;
(function (Colors) {
    Colors["RED"] = "RED";
    Colors["GREEN"] = "GREEN";
    Colors["BLUE"] = "BLUE";
})(Colors || (Colors = {}));
;
var color = Colors.BLUE;
// console.log(`Màu:${color}`);
// ---------------------Bài 5-----------------------
var Rectangle = /** @class */ (function () {
    function Rectangle(chieuDai, chieuRong) {
        this.chieuDai = chieuDai;
        this.chieuRong = chieuRong;
    }
    Rectangle.prototype.cachTinhDienTich = function () {
        return this.chieuDai * this.chieuRong;
    };
    return Rectangle;
}());
;
var hinhChuNhat = new Rectangle(5, 10);
var tinhDienTich;
tinhDienTich = hinhChuNhat.cachTinhDienTich();
// console.log(`Diện tích: ${tinhDienTich}`);
// ---------------------Bài 6-----------------------
// function logMethod(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     descriptor.value = function (this: any, ...args: any[]) {
//         console.log(`Call: ${String(propertyKey)} - ${JSON.stringify(args)}`);
//         const result = originalMethod.apply(this, args);
//         console.log(`Result ${String(propertyKey)}`);
//         return result;
//     };
//     return descriptor;
// }
// class MyClass {
//     @logMethod
//     greet(name: string) {
//         console.log(name);
//     }
// }
// const instance = new MyClass();
// instance.greet('Test');
// ---------------------Bài 7-----------------------
var axios_1 = require("axios");
function callAPI() {
    return axios_1.default.get('http://localhost:3000/users')
        .then(function (response) {
        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Lỗi:' + response.status);
    })
        .catch(function (error) {
        throw new Error('Lỗi: ' + error.message);
    });
}
callAPI()
    .then(function (data) {
    console.log('Data:', data);
})
    .catch(function (error) {
    console.error('Error:', error);
});
// ---------------------Bài 8-----------------------
var utils_1 = require("./utils");
var giaTriGiaThua = 5;
var kiemTraGiaThua = (0, utils_1.tinhGiaiThua)(giaTriGiaThua);
// console.log(`Giai thừa của ${giaTriGiaThua} là: ${kiemTraGiaThua}`);
var giaTriSoNguyen = 7;
var kiemTraSoNguyen = (0, utils_1.kiemTraSoNguyenTo)(giaTriSoNguyen);
// console.log(`${giaTriSoNguyen} có phải là số nguyên tố không? ${kiemTraSoNguyen}`);
