export interface ICategory {
    id?: number;
    icon: string | null;
    name: string;
    type: boolean;
}

export const categories: ICategory[] = [];