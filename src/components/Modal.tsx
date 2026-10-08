"use client"


export default function Modal({ isOpen, setIsOpen, children }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    // Backdrop with fixed positioning and flexbox centering
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setIsOpen(false)}
    >
      {/* Modal Card */}
      <div
        className="relative rounded-lg bg-white p-6 shadow-xl px-14 py-10"
        onClick={(e) => e.stopPropagation()} // Prevents closing on inner click
      >
        <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3 text-gray-400">✕</button>
        {children}
      </div>
    </div>
  );
}