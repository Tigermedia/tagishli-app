"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Company {
  name: string;
  number: string;
  type: string;
  status: string;
  city: string;
  street: string;
  houseNumber: string;
}

interface CompanySearchProps {
  onSelect: (company: Company) => void;
  onManualEntry: (name: string) => void;
}

export function CompanySearch({ onSelect, onManualEntry }: CompanySearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/companies/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
      setShowResults(true);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 300);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (company: Company) => {
    setQuery(company.name);
    setShowResults(false);
    onSelect(company);
  };

  const handleManual = () => {
    if (query.trim()) {
      setShowResults(false);
      onManualEntry(query.trim());
    }
  };

  const statusColor = (status: string) => {
    if (status === "פעילה") return "text-green-600 bg-green-50";
    if (status === "מחוסלת מרצון" || status?.includes("מחוסלת")) return "text-red-500 bg-red-50";
    return "text-gray-500 bg-gray-100";
  };

  return (
    <div ref={containerRef} className="w-full" dir="rtl">
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <label className="block text-xs font-medium text-gray-500 mb-2">
          🏢 חפש את החברה שאתה רוצה לתבוע
        </label>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            onFocus={() => results.length > 0 && setShowResults(true)}
            placeholder="הקלד שם חברה (לפחות 2 אותיות)..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/50 focus:border-[var(--color-gold)]/50 transition"
          />
          {loading && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Results dropdown */}
        {showResults && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {results.length > 0 ? (
              <>
                {results.map((company, i) => (
                  <button
                    key={`${company.number}-${i}`}
                    onClick={() => handleSelect(company)}
                    className="w-full text-right px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{company.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          ח.פ. {company.number}
                          {company.city && ` · ${company.city}`}
                          {company.street && `, ${company.street} ${company.houseNumber || ""}`}
                        </p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full mr-2 flex-shrink-0 ${statusColor(company.status)}`}>
                        {company.status}
                      </span>
                    </div>
                  </button>
                ))}
                <button
                  onClick={handleManual}
                  className="w-full text-center px-4 py-2 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition"
                >
                  לא מוצא? הזן ידנית: &quot;{query}&quot;
                </button>
              </>
            ) : (
              <div className="px-4 py-6 text-center">
                <p className="text-sm text-gray-500 mb-2">לא נמצאו תוצאות</p>
                <button
                  onClick={handleManual}
                  className="text-sm text-[var(--color-gold)] hover:underline"
                >
                  הזן ידנית: &quot;{query}&quot;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
