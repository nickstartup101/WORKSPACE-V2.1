import React, { useEffect, useState } from 'react';
import { DataAdapterService } from '../services/dataAdapterService';
import { Supplier } from '../types';

export const SuppliersPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DataAdapterService.fetchSuppliers().then((data) => {
      setSuppliers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="ml-[260px] flex-1 min-h-screen bg-[#F8FAFC] p-10">
      <header className="mb-8">
        <h2 className="text-[24px] font-bold text-[#001F2A]">ຜູ້ສະໜອງ (Supplier Management)</h2>
        <p className="text-[13px] text-gray-500">ຖານຂໍ້ມູນຜູ້ສະໜອງວັດຖຸດິບ ແລະ ເຄືອຂ່າຍ Partner ຈິງ</p>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-[16px] font-bold text-[#001F2A] mb-4">ລາຍຊື່ຜູ້ສະໜອງ ({suppliers.length} ລາຍການ)</h3>
        {loading ? (
          <p className="text-center py-10 text-gray-400">ກຳລັງໂຫຼດຂໍ້ມູນຜູ້ສະໜອງ...</p>
        ) : suppliers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <span className="material-symbols-outlined text-[48px] text-gray-300">handshake</span>
            <p className="text-[14px] text-gray-500 font-bold mt-2">ບໍ່ມີຂໍ້ມູນຜູ້ສະໜອງໃນ Firestore (No Suppliers Found)</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-[12px] text-gray-500 font-bold uppercase">
                  <th className="py-3 px-4">ຊື່ບໍລິສັດ / ຜູ້ສະໜອງ</th>
                  <th className="py-3 px-4">ຜູ້ຕິດຕໍ່</th>
                  <th className="py-3 px-4">ເບີໂທຕິດຕໍ່</th>
                  <th className="py-3 px-4 text-center">Credit Terms</th>
                  <th className="py-3 px-4 text-center">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[13px]">
                {suppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-[#001F3F]">{s.name}</td>
                    <td className="py-3 px-4">{s.contactPerson}</td>
                    <td className="py-3 px-4 font-mono">{s.phone}</td>
                    <td className="py-3 px-4 text-center"><span className="bg-slate-100 px-3 py-1 rounded-full font-bold">{s.creditTermsDays} ວັນ</span></td>
                    <td className="py-3 px-4 text-center text-amber-500 font-bold">★ {s.reliabilityRating}.0</td>
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
