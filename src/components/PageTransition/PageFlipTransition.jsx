
import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useReducedMotion } from "motion/react";

function PageFlipTransition({
  currentPage,
  nextPage,
  flipping,
  onComplete,
}) {
  const bookRef = useRef(null);
  const flipStarted = useRef(false);
  const completed = useRef(false);

  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  const [size, setSize] = useState(() => ({
    width: window.innerWidth,
    height: Math.max(window.innerHeight, 480),
  }));

  // Cập nhật kích thước cho desktop/mobile
  useEffect(() => {
    const handleResize = () => {
      setReady(false);
      flipStarted.current = false;

      setSize({
        width: window.innerWidth,
        height: Math.max(window.innerHeight, 480),
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Bắt đầu lật trang khi nhấn START
  useEffect(() => {
    if (!ready || !flipping || flipStarted.current) {
      return;
    }

    flipStarted.current = true;

    if (reduceMotion) {
      completed.current = true;
      onComplete?.();
      return;
    }

    bookRef.current?.pageFlip()?.flipNext("top");
  }, [ready, flipping, reduceMotion, onComplete]);

  // Khi lật đến trang Home
  const handleFlip = (event) => {
    if (
      event.data === 1 &&
      flipping &&
      !completed.current
    ) {
      completed.current = true;
      onComplete?.();
    }
  };

  return (
    <main className="fixed inset-0 z-50 overflow-hidden bg-[#F5EBDD]">
      <HTMLFlipBook
        key={`${size.width}-${size.height}`}
        ref={bookRef}
        width={size.width}
        height={size.height}
        size="fixed"
        autoSize={false}
        usePortrait={true}
        showCover={false}
        drawShadow={true}
        maxShadowOpacity={0.65}
        flippingTime={600}
        useMouseEvents={false}
        clickEventForward={true}
        mobileScrollSupport={false}
        onInit={() => setReady(true)}
        onFlip={handleFlip}
      >
        {/* TRANG 1: INTRO */}
        <div className="h-full w-full overflow-hidden bg-[#F5EBDD]">
          {currentPage}
        </div>

        {/* TRANG 2: HOME */}
        <div className="h-full w-full overflow-hidden bg-[#F5EBDD]">
          {nextPage}
        </div>
      </HTMLFlipBook>
    </main>
  );
}

export default PageFlipTransition;
