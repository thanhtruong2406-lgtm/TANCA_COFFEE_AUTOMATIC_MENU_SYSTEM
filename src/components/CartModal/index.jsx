import React from 'react'

const CartModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className="bg-[#F5EBDD] w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-6 border border-[#6B4F3A]/20">
      
        <div className="flex items-center justify-between pb-4 border-b border-[#6B4F3A]/20">
          <h2 className="text-xl font-bold text-[#6B4F3A]">Giỏ hàng của bạn</h2>
          <button 
            onClick={onClose}
            className="text-[#6B4F3A] hover:bg-[#6B4F3A]/10 rounded-full w-8 h-8 flex items-center justify-center font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="py-8 min-h-[160px] flex flex-col items-center justify-center text-stone-500">
          <p>Giỏ hàng chưa có sản phẩm nào</p>
        </div>

        <div className="pt-4 border-t border-[#6B4F3A]/20 flex flex-col gap-3">
          <div className="flex justify-between font-semibold text-[#6B4F3A]">
            <span>Tổng tiền:</span>
            <span>0 đ</span>
          </div>
          <button className="w-full py-3 bg-[#6B4F3A] text-[#F5EBDD] font-bold rounded-full hover:bg-[#543D2C] transition-colors cursor-pointer">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartModal