import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-2 mt-16" aria-label="Navegação por páginas">
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-full border border-brand-ink/10 text-brand-ink hover:bg-brand-butter disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pages.map((p) => {
          const isActive = currentPage === p;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`h-11 w-11 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                isActive
                  ? "bg-brand-ink text-brand-cream"
                  : "text-brand-ink/75 hover:bg-brand-butter"
              }`}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Ir para página ${p}`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-full border border-brand-ink/10 text-brand-ink hover:bg-brand-butter disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
        aria-label="Próxima página"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
};
export default Pagination;
