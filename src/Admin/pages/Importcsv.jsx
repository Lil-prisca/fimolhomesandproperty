"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type CSVRow = {
  title: string;
  slug: string;
  description: string;
  price: string;
  price_label: string;
  state: string;
  city: string;
  location: string;
  type: string;
  beds: string;
  baths: string;
  sqft: string;
  status: string;
  featured: string;
  badge: string;
  badge_color: string;
};

function parseCSV(text: string): CSVRow[] {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] || "";
    });
    return row as CSVRow;
  });
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const CSV_TEMPLATE = `title,slug,description,price,price_label,state,city,location,type,beds,baths,sqft,status,featured,badge,badge_color
"Oceanview Penthouse","oceanview-penthouse-vi","A beautiful penthouse with ocean views","850000000","₦850,000,000","Lagos","Victoria Island","Victoria Island, Lagos","Luxury Apartment","5","6","6200","active","true","Featured","bg-blue-500"
"Prime Land Lekki","prime-land-lekki","5000sqft commercial land in Lekki","320000000","₦320,000,000","Lagos","Lekki","Lekki Phase 1, Lagos","Land","","","5000","active","false","Hot","bg-orange-500"`;

export default function ImportPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<CSVRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{
    success: number;
    errors: string[];
  } | null>(null);
  const [error, setError] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setError("");

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const rows = parseCSV(ev.target?.result as string);
        setPreview(rows.slice(0, 5));
      } catch {
        setError("Could not parse CSV. Please use the template format.");
      }
    };
    reader.readAsText(f);
  }

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fimol-properties-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport() {
    if (!file) return;
    setImporting(true);
    setError("");

    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const rows = parseCSV(ev.target?.result as string);
        const supabase = createClient();
        const errors: string[] = [];
        let success = 0;

        for (const row of rows) {
          if (!row.title || !row.state || !row.city || !row.type) {
            errors.push(
              `Skipped row: missing required fields (title, state, city, type) — "${row.title || "unknown"}"`,
            );
            continue;
          }

          const { error: insertError } = await supabase
            .from("properties")
            .insert({
              title: row.title,
              slug: row.slug || slugify(row.title + "-" + row.city),
              description: row.description || null,
              price: parseInt(row.price) || 0,
              price_label:
                row.price_label ||
                `₦${parseInt(row.price).toLocaleString("en-NG")}`,
              state: row.state,
              city: row.city,
              location: row.location || `${row.city}, ${row.state}`,
              type: row.type,
              beds: row.beds ? parseInt(row.beds) : null,
              baths: row.baths ? parseInt(row.baths) : null,
              sqft: row.sqft || null,
              status: row.status || "active",
              featured: row.featured === "true",
              badge: row.badge || null,
              badge_color: row.badge_color || null,
            });

          if (insertError) {
            errors.push(`Failed "${row.title}": ${insertError.message}`);
          } else {
            success++;
          }
        }

        setResult({ success, errors });
        setImporting(false);
        if (success > 0) router.refresh();
      } catch {
        setError("Import failed. Please check the CSV format and try again.");
        setImporting(false);
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 4l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Import from CSV
          </h1>
          <p className="text-white/45 text-sm mt-0.5">
            Bulk upload properties using a spreadsheet.
          </p>
        </div>
      </div>

      {/* Step 1: Download template */}
      <div className="glass rounded-2xl p-6 border border-white/10 mb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-white mb-1">
              Step 1 — Download Template
            </h2>
            <p className="text-white/45 text-sm">
              Use our CSV template to ensure the correct column format. Fill it
              in Excel, Google Sheets, or Numbers.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/30">
              {[
                "title",
                "slug",
                "description",
                "price",
                "price_label",
                "state",
                "city",
                "location",
                "type",
                "beds",
                "baths",
                "sqft",
                "status",
                "featured",
                "badge",
                "badge_color",
              ].map((col) => (
                <span
                  key={col}
                  className="bg-white/5 px-2 py-1 rounded font-mono"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={downloadTemplate}
            className="btn-outline py-2.5 px-5 text-sm flex-shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2v8M4 7l4 4 4-4M2 13h12"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* Step 2: Upload */}
      <div className="glass rounded-2xl p-6 border border-white/10 mb-5">
        <h2 className="font-display text-lg font-semibold text-white mb-4">
          Step 2 — Upload Your CSV
        </h2>
        <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-white/15 rounded-xl cursor-pointer hover:border-blue-500/50 transition-colors group">
          <svg
            className="w-8 h-8 text-white/25 group-hover:text-blue-400 transition-colors mb-2"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v6h6M8 13h8M8 17h5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-white/40 text-sm group-hover:text-white/60 transition-colors">
            {file ? file.name : "Click to upload CSV file"}
          </span>
          <span className="text-white/25 text-xs mt-1">.csv files only</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFile}
            className="hidden"
          />
        </label>
      </div>

      {/* Preview */}
      {preview.length > 0 && (
        <div className="glass rounded-2xl p-6 border border-white/10 mb-5">
          <h2 className="font-display text-lg font-semibold text-white mb-4">
            Preview{" "}
            <span className="text-white/40 text-base font-normal">
              (first {preview.length} rows)
            </span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/10">
                  {["Title", "Type", "State", "City", "Price", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-3 py-2 text-white/40 font-medium"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-3 py-2 text-white max-w-[150px] truncate">
                      {row.title}
                    </td>
                    <td className="px-3 py-2 text-white/60">{row.type}</td>
                    <td className="px-3 py-2 text-white/60">{row.state}</td>
                    <td className="px-3 py-2 text-white/60">{row.city}</td>
                    <td className="px-3 py-2 text-blue-300">
                      {row.price_label}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${row.status === "active" ? "bg-emerald-500/15 text-emerald-400" : "bg-white/10 text-white/40"}`}
                      >
                        {row.status || "active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 border border-white/10 mb-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-emerald-400"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4 10l4 4 8-8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="text-white font-medium">
                {result.success} properties imported successfully
              </div>
              {result.errors.length > 0 && (
                <div className="text-orange-400 text-xs">
                  {result.errors.length} rows skipped
                </div>
              )}
            </div>
          </div>
          {result.errors.length > 0 && (
            <div className="space-y-1 mt-3">
              {result.errors.map((err, i) => (
                <div
                  key={i}
                  className="text-red-400/70 text-xs bg-red-400/5 rounded px-3 py-1.5"
                >
                  {err}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 mb-5">
          {error}
        </div>
      )}

      {/* Step 3: Import */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        <h2 className="font-display text-lg font-semibold text-white mb-2">
          Step 3 — Import
        </h2>
        <p className="text-white/45 text-sm mb-5">
          This will add all rows from your CSV to the database. Existing
          properties with the same slug will be skipped.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/admin/properties")}
            className="btn-outline py-3 px-6 text-sm"
          >
            Cancel
          </button>
          <motion.button
            onClick={handleImport}
            disabled={!file || importing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary py-3 px-8 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {importing ? "Importing…" : "Start Import"}
            {!importing && (
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
