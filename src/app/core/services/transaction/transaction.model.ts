import { DateTime } from "luxon";

export interface ITransaction {
    id?: number;
    date: string;
    category: number;
    method: number;
    amount: number | null;
    note?: string | null;
}

const date = DateTime.now();

export const transactions: ITransaction[] = [
    {
        id: 0,
        date: date.minus({ days: 20 }).toISODate(),
        category: 0,
        method: 0,
        amount: 11.84,
        note: ''
    },
    {
        id: 1,
        date: date.minus({ days: 18 }).toISODate(),
        category: 1,
        method: 0,
        amount: 27.51,
        note: ''
    },
    {
        id: 2,
        date: date.minus({ days: 16 }).toISODate(),
        category: 1,
        method: 0,
        amount: 124.55,
        note: ''
    },
    {
        id: 3,
        date: date.minus({ days: 17 }).toISODate(),
        category: 0,
        method: 0,
        amount: 35.73,
        note: ''
    },
    {
        id: 4,
        date: date.minus({ days: 16 }).toISODate(),
        category: 0,
        method: 0,
        amount: 78.56,
        note: ''
    },
    {
        id: 5,
        date: date.minus({ days: 15 }).toISODate(),
        category: 2,
        method: 0,
        amount: 39.38,
        note: ''
    },
    {
        id: 6,
        date: date.minus({ days: 9 }).toISODate(),
        category: 1,
        method: 0,
        amount: 117.21,
        note: ''
    },
    {
        id: 7,
        date: date.minus({ days: 11 }).toISODate(),
        category: 0,
        method: 0,
        amount: 37.55,
        note: ''
    },
    {
        id: 8,
        date: date.minus({ days: 1 }).toISODate(),
        category: 1,
        method: 0,
        amount: 77.57,
        note: ''
    },
    {
        id: 9,
        date: date.minus({ days: 2 }).toISODate(),
        category: 0,
        method: 0,
        amount: 58.21,
        note: ''
    },
    {
        id: 10,
        date: date.minus({ days: 6 }).toISODate(),
        category: 6,
        method: 0,
        amount: 5.46,
        note: 'Coffee'
    },
    {
        id: 11,
        date: date.minus({ days: 24 }).toISODate(),
        category: 1,
        method: 0,
        amount: 214.15,
        note: ''
    },
    {
        id: 12,
        date: date.minus({ days: 26 }).toISODate(),
        category: 0,
        method: 0,
        amount: 41.22,
        note: ''
    },
    {
        id: 13,
        date: date.minus({ days: 29 }).toISODate(),
        category: 0,
        method: 0,
        amount: 27.61,
        note: ''
    },
];