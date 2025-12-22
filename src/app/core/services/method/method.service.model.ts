export interface IMethod {
    id?: number;
    icon: string | null;
    name: string;
}

export const methods: IMethod[] = [
    {
        id: 0,
        icon: 'credit_card',
        name: 'Credit'
    },
    {
        id: 1,
        icon: 'payments',
        name: 'Cash'
    },
    {
        id: 2,
        icon: 'local_atm',
        name: 'Debit'
    },
    {
        id: 3,
        icon: 'check',
        name: 'Check'
    },
    {
        id: 4,
        icon: 'currency_exchange',
        name: 'Transfer'
    },
];