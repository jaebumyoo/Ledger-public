export interface ICategory {
    id?: number;
    icon: string | null;
    name: string;
    type: boolean;
}

export const categories: ICategory[] = [
    {
        id: 0,
        icon: 'local_dining',
        name: 'Meal',
        type: true
    },
    {
        id: 1,
        icon: 'shopping_cart',
        name: 'Grocery',
        type: true
    },
    {
        id: 2,
        icon: 'local_gas_station',
        name: 'Gas',
        type: true
    },
    {
        id: 3,
        icon: 'electrical_services',
        name: 'Utility',
        type: true
    },
    {
        id: 4,
        icon: 'hail',
        name: 'Full-Time',
        type: false
    },
    {
        id: 5,
        icon: 'emoji_people',
        name: 'Part-Time',
        type: false
    },
    {
        id: 6,
        icon: 'more_horiz',
        name: 'Etc.',
        type: true
    },
    {
        id: 7,
        icon: 'more_horiz',
        name: 'Etc.',
        type: false
    }
];