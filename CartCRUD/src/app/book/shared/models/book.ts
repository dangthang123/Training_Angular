
export interface IBook {
    id: number;
    book_name: string;
    book_image: string;
    book_price: number;
    book_quantity: number;
    book_author: string;
    book_date: number;
    book_short_description: string;
    book_description: string;
    book_evaluate:
    [
        name: string,
        point_evaluated: number,
    ]
    quantity: number;
}