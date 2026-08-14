import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DataAdapterService } from '../services/dataAdapterService';
import { AccountsPayable } from '../types';

export const AccountsPayablePage: React.FC = () => {
  const { activeBranchId } = useAuth();
  const [payables, setPayables] = useState<AccountsPayable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DataAdapterService.fetchAccountsPayable(activeBranchId).then((data) => {
      setPayables(data);
      setLoading(false);
    });
  }, [activeBranchId]);

  return (
    <div className="ml-[260px] flex-1 min-h-screen bg-[#F8FAFC] p-10">
      <header className="mb-8">
        <h2 className="text-[24px] font-bold text-[#001F2A]">ໜີ້ສິນຕ້ອງສົ່ງ (Accounts Payable)</h2>
        <p className="text-[13px] text-gray-500">ຕິດຕາມໃບແຈ້ງໜີ້ ແລະ ກຳນົດການຊຳລະເງິນ</p>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-[16px] font-bold text-[#001F2A] mb-4">ລາຍການໃບແຈ້ງໜີ້ AP ({payables.length} ລາຍການ)</h3>
        {loading ? (
          <p className="text-center py-10 text-gray-400">ກຳລັງໂຫຼດຂໍ້ມູນ AP...</p>
        ) : payables.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <span className="material-symbols-outlined text-[48px] text-gray-300">pending_actions</span>
            <p className="text-[14px] text-gray-500 font-bold mt-2">ບໍ່ມີລາຍການໜີ້ສິນໃນ Firestore (No AP Records Found)</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-[12px] text-gray-500 font-bold uppercase">
                  <th className="py-3 px-4">ລະຫັດໃບແຈ້ງໜີ້</th>
                  <th className="py-3 px-4">ຜູ້ສະໜອງ (Supplier)</th>
                  <th className="py-3 px-4 text-right">ຍອດລວມ</th>
                  <th className="py-3 px-4 text-right">ຍອດຄົງຄາມ</th>
                  <th className="py-3 px-4 text-center">ສະຖານະ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[13px]">
                {payables.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-[#001F3F]">{p.invoiceNumber}</td>
                    <td className="py-3 px-4 font-semibold">{p.supplierName}</td>
                    <td className="py-3 px-4 text-right font-mono">₭ {p.totalAmount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-red-600">₭ {p.remainingAmount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${p.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
