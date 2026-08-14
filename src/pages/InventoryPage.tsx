import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DataAdapterService } from '../services/dataAdapterService';
import { InventoryItem } from '../types';

export const InventoryPage: React.FC = () => {
  const { activeBranchId } = useAuth();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    DataAdapterService.fetchInventory(activeBranchId).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [activeBranchId]);

  return (
    <div className="ml-[260px] flex-1 min-h-screen bg-[#F8FAFC] p-10">
      <header className="mb-8">
        <h2 className="text-[24px] font-bold text-[#001F2A]">ຄັງສິນຄ້າ & ວັດຖຸດິບ (Inventory Management)</h2>
        <p className="text-[13px] text-gray-500">ຕິດຕາມ Stock ວັດຖຸດິບຈິງຈາກ Firebase Firestore</p>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-[16px] font-bold text-[#001F2A] mb-4">ລາຍການ Stock ວັດຖຸດິບ ({items.length} ລາຍການ)</h3>
        
        {loading ? (
          <p className="text-center py-10 text-gray-400">ກຳລັງໂຫຼດຂໍ້ມູນ Stock...</p>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <span className="material-symbols-outlined text-[48px] text-gray-300">inventory_2</span>
            <p className="text-[14px] text-gray-500 font-bold mt-2">ບໍ່ມີຂໍ້ມູນຄັງສິນຄ້າໃນ Firestore (No Inventory Records)</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-[12px] text-gray-500 font-bold uppercase">
                  <th className="py-3 px-4">SKU / ລະຫັດ</th>
                  <th className="py-3 px-4">ຊື່ວັດຖຸດິບ</th>
                  <th className="py-3 px-4">ໝວດໝູ່</th>
                  <th className="py-3 px-4 text-right">Stock ປັດຈຸບັນ</th>
                  <th className="py-3 px-4 text-right">Min Safety Stock</th>
                  <th className="py-3 px-4 text-center">ສະຖານະ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[13px]">
                {items.map((item) => {
                  const isLow = item.currentStock <= item.minSafetyStock;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#001F3F]">{item.sku}</td>
                      <td className="py-3 px-4 font-semibold">{item.name}</td>
                      <td className="py-3 px-4 text-gray-500">{item.category}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold">{item.currentStock} {item.unit}</td>
                      <td className="py-3 px-4 text-right font-mono text-gray-400">{item.minSafetyStock} {item.unit}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${isLow ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {isLow ? '⚠️ ໃກ້ໝົດ' : '✓ ປົກກະຕິ'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
