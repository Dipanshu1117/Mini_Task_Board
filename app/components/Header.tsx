

const Header = () => {
  return (
    <header className="w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2E79FF] text-sm font-bold text-white shadow-sm">
            ✓
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-800">TaskBoard</h1>
          <div className="w-1 h-12 bg-gray-200"></div>
          <span className="hidden text-base text-slate-400 sm:inline">Manage your tasks</span>
        </div>

        <button className="rounded-xl bg-[#2E79FF] px-4 py-2.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#256fe6]">
          + Add Task
        </button>
      </div>
    </header>
  );
};

export default Header;
