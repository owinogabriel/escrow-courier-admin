import { useEffect, useState } from "react";

import { fetchWallets,  } from "../../services/api";
import type { Wallet } from "../../types";


const Wallets = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchWallets();
        setWallets(data);
      } catch (err) {
        console.error("Failed to load wallets:", err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Wallet Balances</h1>
      <ul>
        {wallets.map((wallet, idx) => (
          <li key={idx} className="mb-3 p-4 bg-white rounded shadow">
            <p className="font-semibold">{wallet.agentName}</p>
            <p>Balance: KES {wallet.balance.toFixed(2)}</p>
            <div>
              {wallet.payouts.length === 0 ? (
                <p className="text-sm text-gray-500">No payouts yet</p>
              ) : (
                <ul className="mt-2 space-y-1">
                  {wallet.payouts.map((payout, i) => (
                    <li key={i} className="text-sm text-gray-700">
                      {payout.date.split("T")[0]} – KES {payout.amount} via{" "}
                      {payout.method}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wallets;
