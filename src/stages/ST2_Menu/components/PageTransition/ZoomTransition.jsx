
import { useLayoutEffect, useRef } from "react";
import { createPortal, flushSync } from "react-dom";

import {
  Coffee,
  Leaf,
  Citrus,
  Sprout,
  Flame,
} from "lucide-react";

// Icon của từng danh mục
const categoryIcons = {
  coffee: Coffee,
  matcha: Leaf,
  "fruit-tea": Citrus,
  detox: Sprout,
  "hot-trend": Flame,
};

function ZoomTransition({
  transition,
  onComplete,
  onFinish,
}) {
  const layerRef = useRef(null);

  const Icon =
    categoryIcons[transition.category.id];

  useLayoutEffect(() => {
    const layer = layerRef.current;

    if (!layer) return;

    const { rect, color, category } = transition;

    let cancelled = false;
    let fadeAnimation;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Phóng to toàn bộ thẻ, bao gồm ảnh và chữ
    const zoomAnimation = layer.animate(
      [
        {
          left: `${rect.left}px`,
          top: `${rect.top}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          borderRadius: "16px",
          backgroundColor: color,
        },
        {
          left: "0px",
          top: "0px",
          width: `${window.innerWidth}px`,
          height: `${window.innerHeight}px`,
          borderRadius: "0px",
          backgroundColor: category.theme.background,
        },
      ],
      {
        duration: reduceMotion ? 1 : 750,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }
    );

    async function runTransition() {
      try {
        await zoomAnimation.finished;

        if (cancelled) return;

        // Đảm bảo React render trang mới
        // trước khi lớp animation biến mất
        flushSync(() => {
          onComplete(category);
        });

        // Chờ trình duyệt cập nhật khung hình
        await new Promise((resolve) => {
          requestAnimationFrame(resolve);
        });

        if (cancelled) return;

        // Hòa ảnh cũ vào nội dung trang mới
        fadeAnimation = layer.animate(
          [
            { opacity: 1 },
            { opacity: 0 },
          ],
          {
            duration: reduceMotion ? 1 : 550,
            easing: "ease-in-out",
            fill: "forwards",
          }
        );

        await fadeAnimation.finished;

        if (!cancelled) {
          onFinish();
        }

      } catch {
        // Animation bị hủy khi rời trang
      }
    }

    runTransition();

    return () => {
      cancelled = true;
      zoomAnimation.cancel();
      fadeAnimation?.cancel();
    };

  }, [transition, onComplete, onFinish]);

  return createPortal(
    <div
      ref={layerRef}
      aria-hidden="true"
      className="
        fixed z-[9999]
        flex flex-col
        items-center justify-center
        overflow-hidden
        text-[#6B4F3A]
      "
      style={{
        left: transition.rect.left,
        top: transition.rect.top,
        width: transition.rect.width,
        height: transition.rect.height,
        backgroundColor: transition.color,
        borderRadius: "16px",
        contain: "layout paint",
      }}
    >

      {/* Trường hợp nhấn Banner hoặc đồ uống */}
      {transition.previewImage ? (
        <>

          <div className="
            flex min-h-0 w-full flex-1
            items-center justify-center
          ">
            <img
              src={transition.previewImage}
              alt=""
              draggable={false}
              className="
                h-full w-full
                object-contain
              "
            />
          </div>

          {transition.previewTitle && (
            <h2 className="
              shrink-0 py-4
              font-handwritten
              text-3xl font-bold
            ">
              {transition.previewTitle}
            </h2>
          )}

        </>
      ) : (

        /* Trường hợp nhấn nút danh mục */
        <div className="
          flex flex-col items-center
          justify-center gap-3
        ">

          {Icon && (
            <Icon size={32} strokeWidth={1.7} />
          )}

          <h2 className="
            font-handwritten
            text-2xl font-bold
          ">
            {transition.previewTitle}
          </h2>

        </div>
      )}

    </div>,
    document.body
  );
}

export default ZoomTransition;
