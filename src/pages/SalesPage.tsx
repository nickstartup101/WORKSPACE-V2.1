import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DataAdapterService } from '../services/dataAdapterService';
import { SalesRecord } from '../types';

export const SalesPage: React.FC = () => {
  const { activeBranchId } = useAuth();
  const [sales, setSales] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    DataAdapterService.fetchSales(activeBranchId).then((data) => {
      setSales(data);
      setLoading(false);
    });
  }, [activeBranchId]);

  const totalSalesAmount = sales.reduce((sum, s) => sum + s.netSales, 0);

  return (
    <div className="ml-[260px] flex-1 min-h-screen bg-[#F8FAFC] p-10">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-[24px] font-bold text-[#001F2A]">ລາຍງານການຂາຍ (Sales Dashboard)</h2>
          <p className="text-[13px] text-gray-500">ຂໍ້ມູນການຂາຍຈິງຈາກ Firebase Firestore</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-200">
          <span className="text-[12px] text-gray-500 block">ຍອດຂາຍລວມ</span>
          <span className="text-[22px] font-extrabold text-[#001F3F] font-mono">₭ {totalSalesAmount.toLocaleString()}</span>
        </div>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-[16px] font-bold text-[#001F2A] mb-4">ລາຍການທຸລະກຳການຂາຍ ({sales.length} ລາຍການ)</h3>
        
        {loading ? (
          <p className="text-center py-10 text-gray-400">ກຳລັງໂຫຼດຂໍ້ມູນຈາກ Firebase...</p>
        ) : sales.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <span className="material-symbols-outlined text-[48px] text-gray-300">receipt_long</span>
            <p className="text-[14px] text-gray-500 font-bold mt-2">ບໍ່ມີຂໍ້ມູນການຂາຍໃນ Firestore (No Sales Records Found)</p>
            <p className="text-[12px] text-gray-400 mt-1">ຂໍ້ມູນຈະປາກົດອັດໂນມັດເມື່ອມີການບັນທຶກການຂາຍໃນ Firebase</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-[12px] text-gray-500 font-bold uppercase">
                  <th className="py-3 px-4">ລະຫັດບິນ</th>
                  <th className="py-3 px-4">ຊື່ສິນຄ້າ</th>
                  <th className="py-3 px-4 text-right">ຈຳນວນ</th>
                  <th className="py-3 px-4 text-right">ລາຄາ/ໜ່ວຍ</th>
                  <th className="py-3 px-4 text-right">ຍອດລວມ</th>
                  <th className="py-3 px-4 text-center">ຊຳລະໂດຍ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[13px]">
                {sales.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#001F3F]">{item.invoiceNumber}</td>
                    <td className="py-3 px-4 font-semibold">{item.productName}</td>
                    <td className="py-3 px-4 text-right font-mono">{item.quantity}</td>
                    <td className="py-3 px-4 text-right font-mono">₭ {item.unitPrice.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#059669]">₭ {item.netSales.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[11px] font-bold uppercase">{item.paymentMethod}</span>
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
