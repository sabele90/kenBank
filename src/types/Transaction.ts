export interface Transaction {
    id?: number;
    description?: string;
    amount: number;
    account_id: number;
    category_id?: number;
    transfer_id?: string | null;
    createdAt: string; 
}
  