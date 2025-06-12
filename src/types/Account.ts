import type { Currencie } from "./Currencie";

export interface Account {
    id?: number; 
    bank_id: number; 
    user_id: number; 
    number?: string; 
    currency_id: number; 
    status?: string; 
    created_at?: Date; 
    balance?: number;
    currency?: Currencie;
  }