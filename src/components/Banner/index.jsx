import React from 'react'
import Button from '../ButtonStart'

const Banner = ({ onExploreMenu }) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="max-w-lg space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#6B4F3A] leading-tight">
          Một chút bình yên trong từng ngụm.
        </h1>
        <p className="text-[#6B4F3A]/80 text-base md:text-lg">
          Cà phê, matcha và những hương vị được tạo ra dành riêng cho bạn.
        </p>
        <Button onClick={onExploreMenu}>
          Khám phá Menu &gt;
        </Button>
      </div>

      <div className="w-full max-w-md h-72 border-2 border-dashed border-[#6B4F3A]/30 rounded-2xl flex items-center justify-center text-[#6B4F3A]/60 bg-white/30">
        [ Hình]
      </div>
    </section>
  )
}

export default Banner