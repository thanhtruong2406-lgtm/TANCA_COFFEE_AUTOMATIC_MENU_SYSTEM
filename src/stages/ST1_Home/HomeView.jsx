function HomeView({ onReplay }) {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-[#F5EBDD] px-6 text-center">
      <p className="mb-4 tracking-[0.3em] text-[#6B4F3A]">WELCOME TO TANCA</p>

      <h1 className="mb-5 text-4xl font-bold text-[#6B4F3A] md:text-6xl">
        TANCA COFFEE
      </h1>

      <p className="mb-8 max-w-xl leading-8 text-[#6B4F3A]/70">
        Home Page đang được xây dựng theo thiết kế đã chốt.
      </p>

      <button
        type="button"
        onClick={onReplay}
        className="rounded-full border border-[#6B4F3A] px-7 py-3 font-semibold text-[#6B4F3A] hover:bg-[#6B4F3A]/10"
      >
        Xem lại Intro
      </button>
    </main>
  );
}

export default HomeView;
