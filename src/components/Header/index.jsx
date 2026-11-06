import React from 'react'
import shoppingBasket from '../../assets/shoppingBasket.png'

const Header = ({ activeTab, onNavigate, onOpenCart, cartCount = 0 }) => {
  return (
    <header className="w-full px-8 py-4 flex items-center justify-between relative z-10">
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => onNavigate('home')}>

        <div className="w-9 h-9 border border-dashed border-[#6B4F3A]/40 rounded-full flex items-center justify-center text-[10px] text-[#6B4F3A]">
          [Logo]
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-none text-[#6B4F3A] tracking-wider">
            TANCA COFFEE
          </span>
          <span className="text-[10px] text-[#6B4F3A]/70 mt-0.5">
            [slogan]
          </span>
        </div>
      </div>x

      <nav className="flex items-center gap-8 font-semibold text-[#6B4F3A]">
        <button 
          onClick={() => onNavigate('home')} 
          className={`hover:opacity-80 transition-opacity py-1 cursor-pointer ${
            activeTab === 'home' ? 'border-b-2 border-[#6B4F3A]' : ''
          }`}
        >
          Home
        </button>
        <button 
          onClick={() => onNavigate('menu')} 
          className={`hover:opacity-80 transition-opacity py-1 cursor-pointer ${
            activeTab === 'menu' ? 'border-b-2 border-[#6B4F3A]' : ''
          }`}
        >
          Menu
        </button>
      </nav>

      <button 
        onClick={onOpenCart} 
        className="relative p-2 rounded-full hover:bg-[#6B4F3A]/10 transition-colors cursor-pointer"
        aria-label="Giỏ hàng">

        <img 
          src={shoppingBasket} 
          alt="Giỏ hàng" 
          className="w-7 h-7 object-contain" 
        />

        <span className="absolute -top-1 -right-1 bg-[#6B4F3A] text-[#F5EBDD] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
          {cartCount}
        </span>
      </button>
    </header>
  )
}

export default Header
