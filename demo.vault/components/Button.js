export default function Button({ children, onClick }) {
  return (
    <button
      className="bg-slate-900 text-white py-3 px-8 rounded-full mt-4"
      onClick={onClick}
    >
      {children}
    </button>
  );
}