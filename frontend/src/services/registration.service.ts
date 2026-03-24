import { Bank } from "../schemas/banks.schema";
import { banksMock } from "../mocks/financial-bank.mock";

export async function getBanks(): Promise<Bank[]> {
    await new Promise(r => setTimeout(r, 500))

    return banksMock;
}