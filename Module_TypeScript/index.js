// // -----------------Bài 1--------------------
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
console.log(tongMang);
var actor;
actor = { name: 'Thang', age: 23, email: 'dangthangtn123@gmail.com' };
var inThongTin = function (person) {
    console.log("Name: ".concat(person.name));
    console.log("Age: ".concat(person.age));
    console.log("Email: ".concat(person.email));
};
console.log(inThongTin(actor));
// // ---------------------Bài 3-----------------------
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
// // ---------------------Bài 4-----------------------
var Colors;
(function (Colors) {
    Colors["RED"] = "RED";
    Colors["GREEN"] = "GREEN";
    Colors["BLUE"] = "BLUE";
})(Colors || (Colors = {}));
;
var color = Colors.BLUE;
// console.log(`Màu:${color}`);
// // ---------------------Bài 5-----------------------
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
var productsList = [
    { id: 1, name: 'Product A', price: 50, quantity: 2 },
    { id: 2, name: 'Product B', price: 120, quantity: 3 },
    { id: 3, name: 'Product C', price: 90, quantity: 1 },
    { id: 4, name: 'Product D', price: 80, quantity: 5 },
    { id: 5, name: 'Product E', price: 150, quantity: 4 },
];
var tonngGia = productsList.reduce(function (acc, product) { return acc + (product.price * product.quantity); }, 0);
console.log(tonngGia);
var locSanPham = productsList.filter(function (product) { return product.price > 100; });
console.log(locSanPham);
var mangMoi = productsList.map(function (product) { return "S\u1EA3n ph\u1EA9m ".concat(product.name, " c\u00F3 gi\u00E1 ").concat(product.price, " \u0111\u1ED3ng v\u00E0 c\u00F2n ").concat(product.quantity, " s\u1EA3n ph\u1EA9m."); });
console.log(mangMoi);
var tongDuoi100 = productsList.reduce(function (acc, product) {
    if (product.price < 100) {
        return acc + product.quantity;
    }
    return acc;
}, 0);
console.log(tongDuoi100);
function getDiscountedProducts(products, discountRate) {
    return products.map(function (product) { return (__assign(__assign({}, product), { price: product.price - (product.price * discountRate) })); });
}
var danhSachGiamGia = getDiscountedProducts(productsList, 2);
console.log(danhSachGiamGia);
// // ---------------------Bài 10-----------------------
var Player;
(function (Player) {
    Player[Player["None"] = 0] = "None";
    Player[Player["X"] = 1] = "X";
    Player[Player["O"] = 2] = "O";
})(Player || (Player = {}));
var TicTacToe = /** @class */ (function () {
    function TicTacToe() {
        this.board = Array(9).fill(Player.None);
        this.currentPlayer = Player.X;
        this.gameEnded = false;
        this.cells = [];
        this.createBoard();
        this.render();
    }
    TicTacToe.prototype.createBoard = function () {
        var _this = this;
        var boardElement = document.getElementById('board');
        if (boardElement) {
            var _loop_1 = function (i) {
                var cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = i.toString();
                cell.addEventListener('click', function () { return _this.handleCellClick(i); });
                this_1.cells.push(cell);
                boardElement.appendChild(cell);
            };
            var this_1 = this;
            for (var i = 0; i < 9; i++) {
                _loop_1(i);
            }
        }
    };
    TicTacToe.prototype.handleCellClick = function (index) {
        if (this.gameEnded || this.board[index] !== Player.None)
            return;
        this.board[index] = this.currentPlayer;
        this.render();
        this.checkWinner();
        this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
    };
    TicTacToe.prototype.checkWinner = function () {
        var winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        for (var _i = 0, winPatterns_1 = winPatterns; _i < winPatterns_1.length; _i++) {
            var pattern = winPatterns_1[_i];
            var a = pattern[0], b = pattern[1], c = pattern[2];
            if (this.board[a] !== Player.None &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]) {
                alert("Player ".concat(this.board[a], " wins!"));
                this.gameEnded = true;
                break;
            }
        }
    };
    TicTacToe.prototype.render = function () {
        var _this = this;
        this.cells.forEach(function (cell, index) {
            cell.textContent = _this.board[index] === Player.X ? 'X' : _this.board[index] === Player.O ? 'O' : '';
        });
    };
    return TicTacToe;
}());
window.onload = function () {
    new TicTacToe();
};
