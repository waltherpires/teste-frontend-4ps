
export type MonthlyFinancialData = {
    year: number;        
    month: string;       
    revenue: number;
    expense: number;
};


export type MonthlyFinancialDataWithBalance = MonthlyFinancialData & {
    finalBalance: number;
};
