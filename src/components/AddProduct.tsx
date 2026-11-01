import { useState } from "react"; 
import { createProduct } from "../api/api";
import { IoCloseCircleOutline } from "react-icons/io5";
type AddProductProps = {
  onClose: () => void;
  onProductAdded: () => void;
};
function AddProduct({ onClose, onProductAdded }: AddProductProps) {
    const [nameAz, setNameAz] = useState("");
const [nameEn, setNameEn] = useState("");
const [categoryId, setCategoryId] = useState("");
const [price, setPrice] = useState("");
const [isAvailable, setIsAvailable] = useState(true);
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
await createProduct({
  nameAz: nameAz,
  nameEn: nameEn || null,
  categoryId: Number(categoryId),
  price: Number(price),
  isAvailable: isAvailable,
});
onProductAdded();
onClose();
};
 
return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
  <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-[#E8E1D6] bg-[#FBF9F5] p-8 shadow-2xl">
    <div className="mb-8">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A37B3E]">
        MAITRE · PRODUCTS
      </span>
      <h2 className="mt-2 text-2xl font-bold text-[#292011]">
        Yeni məhsul əlavə et
      </h2>
      <p className="mt-2 text-sm text-[#8B8177]">
        Menyunuza yeni məhsul daxil edin.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A3828]">
          Məhsulun adı (AZ)
        </label>
        <input
          type="text"
          placeholder="Məhsulun adını daxil edin"
          value={nameAz}
          onChange={(e) => setNameAz(e.target.value)}
          className="w-full rounded-xl border border-[#E5DED3] bg-white px-4 py-3 text-sm text-[#292011] outline-none transition placeholder:text-[#B5ADA2] focus:border-[#A37B3E] focus:ring-4 focus:ring-[#A37B3E]/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A3828]">
          Məhsulun adi (EN)
        </label>
        <input
          type="text"
          placeholder="Enter product name"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          className="w-full rounded-xl border border-[#E5DED3] bg-white px-4 py-3 text-sm text-[#292011] outline-none transition placeholder:text-[#B5ADA2] focus:border-[#A37B3E] focus:ring-4 focus:ring-[#A37B3E]/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A3828]">
          Kateqoriya
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-xl border border-[#E5DED3] bg-white px-4 py-3 text-sm text-[#4A3828] outline-none transition focus:border-[#A37B3E] focus:ring-4 focus:ring-[#A37B3E]/10"
        >
          <option value="">Kateqoriya seçin</option>
          <option value="1">Şorbalar</option>
          <option value="2">Əsas yeməklər</option>
          <option value="3">Qəlyanaltilar</option>
          <option value="4">Salatlar</option>
          <option value="5">Desertlər</option>
          <option value="6">İçkilər</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-[#4A3828]">
          Qiymət 
        </label>
        <input
          type="number"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-xl border border-[#E5DED3] bg-white px-4 py-3 text-sm text-[#292011] outline-none transition placeholder:text-[#B5ADA2] focus:border-[#A37B3E] focus:ring-4 focus:ring-[#A37B3E]/10"
        />
      </div>

      <div className="flex items-center justify-between rounded-xl border border-[#E5DED3] bg-white px-4 py-3">
        <span className="text-sm font-semibold text-[#4A3828]">
          Satiş statusu
        </span>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-[#6B6258]">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="h-4 w-4 accent-[#A37B3E]"
          />
          Mövcuddur
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-[#A37B3E] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#A37B3E]/20 transition hover:bg-[#89652F] active:scale-[0.99]"
      >
        Məhsulu əlavə et
      </button>
      <button type="button" onClick={onClose} className="absolute right-6 top-6 text-2xl text-[#8B8177] transition hover:text-[#A37B3E]">
  <IoCloseCircleOutline />
</button>
    </form>
  </div>
  </div>
);

}

export default AddProduct;