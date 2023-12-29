// // -----------------Bài 1--------------------

const tinhTong = (arr: number[]): number => {
    let tong: number = 0;
    for (let i = 0; i < arr.length; i++) {
        tong += arr[i];
    }
    return tong;
}
const mang: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let tongMang: number;
tongMang = tinhTong(mang);
console.log(tongMang);

// // ---------------------Bài 2-----------------------
interface Person {
    name: string;
    age: number;
    email: string;
}

let actor: Person;
actor = { name: 'Thang', age: 23, email: 'dangthangtn123@gmail.com' };

const inThongTin = (person: Person): void => {
    console.log(`Name: ${person.name}`);
    console.log(`Age: ${person.age}`);
    console.log(`Email: ${person.email}`);
}
console.log(inThongTin(actor));

// // ---------------------Bài 3-----------------------

const layPhanTuDauTien = <Type>(arr: Type[]): Type | undefined => {
    if (arr.length > 0) {
        return arr[0];
    } else {
        return undefined;
    }
}
const mangChuoi: string[] = ['a', 'b', 'c'];
let phanTuDauTienmang: string | undefined;
phanTuDauTienmang = layPhanTuDauTien(mangChuoi);

// console.log(`Phần từ đầu tiên của mảng: ${phanTuDauTienmang}`);

// // ---------------------Bài 4-----------------------

enum Colors {
    RED = "RED",
    GREEN = "GREEN",
    BLUE = "BLUE"
};

let color = Colors.BLUE;
// console.log(`Màu:${color}`);


// // ---------------------Bài 5-----------------------
class Rectangle {
    chieuDai: number;
    chieuRong: number;
    constructor(chieuDai: number, chieuRong: number) {
        this.chieuDai = chieuDai;
        this.chieuRong = chieuRong;
    }
    cachTinhDienTich(): number {
        return this.chieuDai * this.chieuRong;
    }
};
let hinhChuNhat: Rectangle = new Rectangle(5, 10);
let tinhDienTich: number;

tinhDienTich = hinhChuNhat.cachTinhDienTich();
// console.log(`Diện tích: ${tinhDienTich}`);

// // ---------------------Bài 6-----------------------
// // function logMethod(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
// //     const originalMethod = descriptor.value;

// //     descriptor.value = function (this: any, ...args: any[]) {
// //         console.log(`Call: ${String(propertyKey)} - ${JSON.stringify(args)}`);
// //         const result = originalMethod.apply(this, args);
// //         console.log(`Result ${String(propertyKey)}`);
// //         return result;
// //     };

// //     return descriptor;
// // }

// // class MyClass {
// //     @logMethod
// //     greet(name: string) {
// //         console.log(name);
// //     }
// // }

// // const instance = new MyClass();
// // instance.greet('Test');


// // ---------------------Bài 7-----------------------
// import axios from 'axios';

// interface UserData {
//     id: number;
//     name: string;
// }

// function callAPI(): Promise<UserData[]> {
//     return axios.get('http://localhost:3000/users')
//         .then(response => {
//             if (response.status === 200) {
//                 return response.data as UserData[];
//             }
//             throw new Error('Lỗi:' + response.status);
//         })
//         .catch(error => {
//             throw new Error('Lỗi: ' + error.message);
//         });
// }

// callAPI()
//     .then(data => {
//         console.log('Data:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });


// // ---------------------Bài 8-----------------------
// import { tinhGiaiThua, kiemTraSoNguyenTo } from './utils';

// const giaTriGiaThua = 5;
// const kiemTraGiaThua = tinhGiaiThua(giaTriGiaThua);
// // console.log(`Giai thừa của ${giaTriGiaThua} là: ${kiemTraGiaThua}`);

// const giaTriSoNguyen = 7;
// const kiemTraSoNguyen = kiemTraSoNguyenTo(giaTriSoNguyen);
// // console.log(`${giaTriSoNguyen} có phải là số nguyên tố không? ${kiemTraSoNguyen}`);


// // ---------------------Bài 9-----------------------
interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const productsList: Product[] = [
    { id: 1, name: 'Product A', price: 50, quantity: 2 },
    { id: 2, name: 'Product B', price: 120, quantity: 3 },
    { id: 3, name: 'Product C', price: 90, quantity: 1 },
    { id: 4, name: 'Product D', price: 80, quantity: 5 },
    { id: 5, name: 'Product E', price: 150, quantity: 4 },
];

const tonngGia = productsList.reduce((acc, product) => acc + (product.price * product.quantity), 0);
console.log(tonngGia);

const locSanPham = productsList.filter(product => product.price > 100);
console.log(locSanPham);

const mangMoi = productsList.map(product => `Sản phẩm ${product.name} có giá ${product.price} đồng và còn ${product.quantity} sản phẩm.`);
console.log(mangMoi);

const tongDuoi100 = productsList.reduce((acc, product) => {
    if (product.price < 100) {
        return acc + product.quantity;
    }
    return acc;
}, 0);
console.log(tongDuoi100);


function getDiscountedProducts(products: Product[], discountRate: number): Product[] {
    return products.map(product => ({
        ...product,
        price: product.price - (product.price * discountRate),
    }));
}

const danhSachGiamGia = getDiscountedProducts(productsList, 2);
console.log(danhSachGiamGia);

// // ---------------------Bài 10-----------------------
enum Player {
    None,
    X,
    O
}

class TicTacToe {
    private board: Player[] = Array(9).fill(Player.None);
    private currentPlayer: Player = Player.X;
    private gameEnded: boolean = false;

    private cells: HTMLDivElement[] = [];

    constructor() {
        this.createBoard();
        this.render();
    }

    private createBoard(): void {
        const boardElement = document.getElementById('board');
        if (boardElement) {
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = i.toString();
                cell.addEventListener('click', () => this.handleCellClick(i));
                this.cells.push(cell);
                boardElement.appendChild(cell);
            }
        }
    }

    private handleCellClick(index: number): void {
        if (this.gameEnded || this.board[index] !== Player.None) return;

        this.board[index] = this.currentPlayer;
        this.render();
        this.checkWinner();

        this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
    }

    private checkWinner(): void {
        const winPatterns: number[][] = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] !== Player.None &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]) {
                alert(`Player ${this.board[a]} wins!`);
                this.gameEnded = true;
                break;
            }
        }
    }

    private render(): void {
        this.cells.forEach((cell, index) => {
            cell.textContent = this.board[index] === Player.X ? 'X' : this.board[index] === Player.O ? 'O' : '';
        });
    }
}

window.onload = () => {
    new TicTacToe();
};


