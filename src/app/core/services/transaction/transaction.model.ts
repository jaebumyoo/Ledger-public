export interface ITransaction {
    id?: number;
    date: string;
    category: number;
    method: number;
    amount: number | null;
    note?: string | null;
}

export const transactions: ITransaction[] = [];