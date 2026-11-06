import React from 'react'

const MenuPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#6B4F3A] mb-6">Menu Đồ Uống</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/60 rounded-2xl border border-[#6B4F3A]/20 text-center">
          <p className="font-bold text-[#6B4F3A]">Cà Phê Sữa</p>
        </div>
        <div className="p-6 bg-white/60 rounded-2xl border border-[#6B4F3A]/20 text-center">
          <p className="font-bold text-[#6B4F3A]">Matcha Latte</p>
        </div>
        <div className="p-6 bg-white/60 rounded-2xl border border-[#6B4F3A]/20 text-center">
          <p className="font-bold text-[#6B4F3A]">Trà Trái Cây</p>
        </div>
      </div>
    </div>
  )
}

export default MenuPage