import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../supabase";

const PROPERTY_TYPES = [
  "Apartment",
  "Luxury Apartment",
  "Villa",
  "House",
  "Luxury Home",
  "Land",
  "Commercial",
];

const NIGERIA_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

// ✅ fixed — accepts parameters
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ✅ fixed — accepts parameter
function formatPrice(raw) {
  const num = raw.replace(/\D/g, "");
  if (!num) return "";
  return "₦" + Number(num).toLocaleString("en-NG");
}

export default function NewPropertyPage() {
  const navigate = useNavigate(); // ✅ replaces router
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    priceRaw: "",
    state: "",
    city: "",
    address: "",
    location: "",
    type: "House",
    beds: "",
    baths: "",
    sqft: "",
    status: "active",
    featured: false,
    badge: "",
    badge_color: "",
    lat: "",
    lng: "",
  });

  // ✅ fixed — accepts key and value as parameters
  function set(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "title" ? { slug: slugify(value) } : {}),
      ...(key === "state" || key === "city"
        ? {
            location: `${key === "city" ? value : prev.city}, ${key === "state" ? value : prev.state}`,
          }
        : {}),
    }));
  }

  // ✅ fixed — accepts event parameter
  function handleImages(e) {
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        // ✅ fixed — was [...prev] missing ev.target.result
        setImagePreviews((prev) => [...prev, ev.target.result]);
      };
      reader.readAsDataURL(file);
    });
  }

  // ✅ fixed — accepts index parameter
  function removeImage(index) {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  }

  // ✅ fixed — accepts event, removed createClient, removed TypeScript, fixed router
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const uploadedUrls = [];
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const ext = file.name.split(".").pop();
        const fileName = `${form.slug}/${Date.now()}-${i}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(fileName, file, { upsert: true });

        if (!uploadError) {
          const { data } = supabase.storage
            .from("property-images")
            .getPublicUrl(fileName);
          uploadedUrls.push(data.publicUrl);
        }
        setUploadProgress(Math.round(((i + 1) / imageFiles.length) * 100));
      }

      const priceNum = parseInt(form.priceRaw.replace(/\D/g, ""), 10) || 0;
      const { data: property, error: propError } = await supabase
        .from("properties")
        .insert({
          title: form.title,
          slug: form.slug,
          description: form.description || null,
          price: priceNum,
          price_label: formatPrice(form.priceRaw),
          state: form.state,
          city: form.city,
          address: form.address || null,
          location: form.location,
          type: form.type,
          beds: form.beds ? parseInt(form.beds) : null,
          baths: form.baths ? parseInt(form.baths) : null,
          sqft: form.sqft || null,
          status: form.status,
          featured: form.featured,
          badge: form.badge || null,
          badge_color: form.badge_color || null,
          lat: form.lat ? parseFloat(form.lat) : null,
          lng: form.lng ? parseFloat(form.lng) : null,
        })
        .select("id")
        .single();

      if (propError) throw new Error(propError.message);

      if (uploadedUrls.length > 0) {
        await supabase.from("property_images").insert(
          uploadedUrls.map((url, i) => ({
            property_id: property.id,
            url,
            is_primary: i === 0,
            display_order: i,
          })),
        );
      }

      navigate("/admin/properties"); // ✅ replaces router.push + router.refresh
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors";
  const labelClass = "text-white/60 text-xs font-medium mb-2 block";

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
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
            Add New Property
          </h1>
          <p className="text-white/45 text-sm mt-0.5">
            Fill in the listing details below.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="font-display text-lg font-semibold text-white mb-5">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Property Title *</label>
              <input
                required
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Oceanview Penthouse"
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>
                Slug (auto-generated, editable)
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="oceanview-penthouse-victoria-island"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Property Type *</label>
              <select
                required
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className={inputClass + " cursor-pointer"}
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-[#041629]">
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className={inputClass + " cursor-pointer"}
              >
                <option value="active" className="bg-[#041629]">
                  Active
                </option>
                <option value="inactive" className="bg-[#041629]">
                  Inactive
                </option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Describe the property…"
                className={inputClass + " resize-none"}
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="font-display text-lg font-semibold text-white mb-5">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Price (₦) *</label>
              <input
                required
                type="text"
                value={form.priceRaw}
                onChange={(e) => set("priceRaw", e.target.value)}
                placeholder="e.g. 85000000"
                className={inputClass}
              />
              {form.priceRaw && (
                <p className="text-blue-400 text-xs mt-1.5">
                  {formatPrice(form.priceRaw)}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 pt-7">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
              />
              <label
                htmlFor="featured"
                className="text-white/70 text-sm cursor-pointer"
              >
                Mark as Featured
              </label>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="font-display text-lg font-semibold text-white mb-5">
            Location
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>State *</label>
              <select
                required
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
                className={inputClass + " cursor-pointer"}
              >
                <option value="" className="bg-[#041629]">
                  Select state…
                </option>
                {NIGERIA_STATES.map((s) => (
                  <option key={s} value={s} className="bg-[#041629]">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>City *</label>
              <input
                required
                type="text"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="e.g. Victoria Island"
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Full Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="e.g. 14 Adeola Odeku Street"
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>
                Display Location (auto-filled, editable)
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="e.g. Victoria Island, Lagos"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Latitude (optional)</label>
              <input
                type="number"
                step="any"
                value={form.lat}
                onChange={(e) => set("lat", e.target.value)}
                placeholder="e.g. 6.4281"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Longitude (optional)</label>
              <input
                type="number"
                step="any"
                value={form.lng}
                onChange={(e) => set("lng", e.target.value)}
                placeholder="e.g. 3.4219"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="font-display text-lg font-semibold text-white mb-5">
            Property Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>
                Bedrooms (leave blank for land)
              </label>
              <input
                type="number"
                min="0"
                value={form.beds}
                onChange={(e) => set("beds", e.target.value)}
                placeholder="e.g. 4"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Bathrooms</label>
              <input
                type="number"
                min="0"
                value={form.baths}
                onChange={(e) => set("baths", e.target.value)}
                placeholder="e.g. 5"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Area (sqft)</label>
              <input
                type="text"
                value={form.sqft}
                onChange={(e) => set("sqft", e.target.value)}
                placeholder="e.g. 4,800"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="font-display text-lg font-semibold text-white mb-5">
            Badge (optional)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Badge Text</label>
              <input
                type="text"
                value={form.badge}
                onChange={(e) => set("badge", e.target.value)}
                placeholder="e.g. New, Hot, Featured"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Badge Color</label>
              <select
                value={form.badge_color}
                onChange={(e) => set("badge_color", e.target.value)}
                className={inputClass + " cursor-pointer"}
              >
                <option value="" className="bg-[#041629]">
                  None
                </option>
                <option value="bg-blue-500" className="bg-[#041629]">
                  Blue
                </option>
                <option value="bg-emerald-500" className="bg-[#041629]">
                  Green
                </option>
                <option value="bg-orange-500" className="bg-[#041629]">
                  Orange
                </option>
                <option value="bg-red-500" className="bg-[#041629]">
                  Red
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h2 className="font-display text-lg font-semibold text-white mb-2">
            Photos
          </h2>
          <p className="text-white/40 text-xs mb-5">
            First image will be the primary/cover photo. Max 10 images.
          </p>
          <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-white/15 rounded-xl cursor-pointer hover:border-blue-500/50 transition-colors group">
            <svg
              className="w-8 h-8 text-white/25 group-hover:text-blue-400 transition-colors mb-2"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white/40 text-sm group-hover:text-white/60 transition-colors">
              Click to upload photos
            </span>
            <span className="text-white/25 text-xs mt-1">
              JPG, PNG, WebP up to 10MB each
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              className="hidden"
            />
          </label>

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
              {imagePreviews.map((src, i) => (
                <div
                  key={i}
                  className="relative group rounded-lg overflow-hidden aspect-square"
                >
                  {/* ✅ replaced Next.js Image with plain img */}
                  <img
                    src={src}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {i === 0 && (
                    <span className="absolute top-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 2l8 8M10 2L2 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            <svg
              className="w-4 h-4 flex-shrink-0"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M8 5v4M8 11v.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            {error}
          </div>
        )}

        {saving && imageFiles.length > 0 && uploadProgress < 100 && (
          <div>
            <div className="flex justify-between text-xs text-white/50 mb-2">
              <span>Uploading images…</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-3 pb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-outline py-3 px-8 text-sm"
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary py-3 px-10 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Publish Property"}
            {!saving && (
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
      </form>
    </div>
  );
}
