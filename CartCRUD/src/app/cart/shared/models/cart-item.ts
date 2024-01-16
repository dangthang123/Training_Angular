export interface ICart {
    id: number;
    book_name: string;
    book_image: string;
    book_price: number;
    book_quantity: number;
    book_author: string;
    book_date: number;
    book_short_description: string;
    book_description: string;
    total_quantity: number;
}
export interface IOrder {
    // id: number;
    name: string;
    email: string;
    sdt: number;
    address: string;
    delivery: string;
    describe: string;
    order: {
        id: number;
        book_name: string;
        book_image: string;
        book_price: number;
        book_quantity: number;
        book_author: string;
        book_date: number;
        book_short_description: string;
        book_description: string;
        total_quantity: number;
    }[];
    total_quantity: number;
    total_price: number;
}