import { useEffect, useState } from "react";
import { Bank } from "../schemas/banks.schema";
import { getBanks } from "../services/registration.service";

export function useBanks(){
    const [data, setData] = useState<Bank[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const banks = await getBanks()
            setData(banks);
            setLoading(false);
        }

        load();
    }, []);

    return { data, loading }
}