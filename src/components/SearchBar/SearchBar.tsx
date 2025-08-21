import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <div>
        <Search className="absolute mx-2 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
        <input
          type="search"
          placeholder="Search here..."
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
}
