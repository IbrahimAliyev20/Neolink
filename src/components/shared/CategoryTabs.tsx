export function CategoryTabs<T extends string>({
  categories,
  activeCategory,
  onChange,
}: {
  categories: readonly T[];
  activeCategory: T;
  onChange: (category: T) => void;
}) {
  return (
    <div className="flex gap-2 lg:gap-3 items-start flex-nowrap lg:flex-wrap overflow-x-auto w-full scrollbar-hide">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`flex items-center justify-center px-3.5 py-1.5 lg:px-5 lg:py-[9px] rounded-full whitespace-nowrap shrink-0 text-sm lg:text-base font-medium tracking-[0.14px] lg:tracking-[0.16px] transition-colors ${
              isActive
                ? "bg-[#20201e] text-white"
                : "bg-white border border-[#e7e7ea] text-[#5b606f] hover:border-[#20201e]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
