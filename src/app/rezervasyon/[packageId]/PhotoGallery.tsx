"use client";

import { useRef, useState } from "react";
import SmartImage from "@/app/components/SmartImage";

// Bağımlılıksız, dokunmatikte native kaydırmayı (CSS scroll-snap) kullanan
// hafif bir galeri — kod tabanında hazır bir carousel bileşeni yoktu.
export default function PhotoGallery({ images, alt }: { images: string[]; alt: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(images.length - 1, index));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: clamped * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ position: "relative" }}>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          role="region"
          aria-label={`${alt} fotoğrafları`}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            borderRadius: 8,
            background: "#f6f0e4",
            // Kaydırma çubuğunu gizle — dokunmatikte zaten parmakla, masaüstünde ok butonlarıyla kaydırılıyor.
            scrollbarWidth: "none",
          }}
          className="vc-photo-gallery-track"
        >
          {images.map((url, i) => (
            <div
              key={url + i}
              style={{
                position: "relative",
                flex: "0 0 100%",
                height: 200,
                scrollSnapAlign: "start",
              }}
              aria-hidden={i !== active}
            >
              <SmartImage
                src={url}
                alt={`${alt} — fotoğraf ${i + 1}/${images.length}`}
                fill
                sizes="(max-width: 480px) 100vw, 480px"
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
              aria-label="Önceki fotoğraf"
              style={{ ...arrowButtonStyle, left: 8, opacity: active === 0 ? 0.35 : 1 }}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === images.length - 1}
              aria-label="Sonraki fotoğraf"
              style={{ ...arrowButtonStyle, right: 8, opacity: active === images.length - 1 ? 0.35 : 1 }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
          {images.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`${i + 1}. fotoğrafa git`}
              aria-current={i === active}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                background: i === active ? "#c4522a" : "#e5d6bc",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const arrowButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: "none",
  background: "rgba(13,9,6,0.55)",
  color: "#fff",
  fontSize: 18,
  lineHeight: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
