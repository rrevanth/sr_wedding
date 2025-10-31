export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#FFF8F0] flex items-center justify-center z-[9999] transition-opacity duration-500">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-[#E8DFD0] border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-6"></div>
        <p className="font-serif text-lg text-[#6B5D4F]">Loading your invitation...</p>
      </div>
    </div>
  );
}
