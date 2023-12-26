// -----------------Bài 1--------------------

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
// console.log(tongMang);

// ---------------------Bài 2-----------------------
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

// ---------------------Bài 3-----------------------

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

// ---------------------Bài 4-----------------------

enum Colors {
    RED = "RED",
    GREEN = "GREEN",
    BLUE = "BLUE"
};

let color = Colors.BLUE;
// console.log(`Màu:${color}`);


// ---------------------Bài 5-----------------------
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

// ---------------------Bài 6-----------------------
function logMethod(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (this: any, ...args: any[]) {
        console.log(`Call: ${String(propertyKey)} - ${JSON.stringify(args)}`);
        const result = originalMethod.apply(this, args);
        console.log(`Result ${String(propertyKey)}`);
        return result;
    };

    return descriptor;
}

class MyClass {
    @logMethod
    greet(name: string) {
        console.log(name);
    }
}

const instance = new MyClass();
instance.greet('Test');


// ---------------------Bài 7-----------------------
import axios from 'axios';

interface UserData {
    id: number;
    name: string;
}

function callAPI(): Promise<UserData[]> {
    return axios.get('http://localhost:3000/users')
        .then(response => {
            if (response.status === 200) {
                return response.data as UserData[];
            }
            throw new Error('Lỗi:' + response.status);
        })
        .catch(error => {
            throw new Error('Lỗi: ' + error.message);
        });
}

callAPI()
    .then(data => {
        console.log('Data:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });


// ---------------------Bài 8-----------------------
import { tinhGiaiThua, kiemTraSoNguyenTo } from './utils';

const giaTriGiaThua = 5;
const kiemTraGiaThua = tinhGiaiThua(giaTriGiaThua);
// console.log(`Giai thừa của ${giaTriGiaThua} là: ${kiemTraGiaThua}`);

const giaTriSoNguyen = 7;
const kiemTraSoNguyen = kiemTraSoNguyenTo(giaTriSoNguyen);
// console.log(`${giaTriSoNguyen} có phải là số nguyên tố không? ${kiemTraSoNguyen}`);



