import { useState } from "react";
import { updateProduct, type Product } from "../api/api";
type EditingProductProps = {
  product: Product;
  onClose: () => void;
  onProductUpdated: () => void;
};
function EditingProduct({ product, onClose, onProductUpdated }: EditingProductProps){
const [nameAz, setNameAz] = useState(product.nameAz);
const [nameEn, setNameEn] = useState(product.nameEn ?? "");
const [categoryId, setCategoryId] = useState(String(product.categoryId));
const [price, setPrice] = useState(String(product.price));
const [isAvailable, setIsAvailable] = useState(product.isAvailable); 
const handleSubmit=async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  await updateProduct(product.id, {
    nameAz,
    nameEn: nameEn || null,
    categoryId: Number(categoryId),
    price: Number(price),
    isAvailable
  });
  onProductUpdated();
  onClose();
};
return (
  <div className="fixed inset-0 z-50 flex items-center justify-center  px-4 py-6 backdrop-blur-sm">
    <div className="relative w-full max-w-lg rounded-3xl border border-[#E8E1D6] bg-[#FBF9F5] p-8 shadow-2xl">
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-widest text-[#A37B3E]">
          MAITRE-PRODUCTS
        </span>
        <h2 className="mt-2 text-2xl font-bold text-[#292011]">
          Məhsulu redaktə et
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Məhsul məlumatlari yeniləyin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Məhsulun adi (AZ)</label>
          <input value={nameAz} onChange={(e) => setNameAz(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-[#A37B3E]" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Məhsulun adi (EN)</label>
          <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-[#A37B3E]" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Kateqoriya</label>
          <select value={categoryId}  onChange={(e) => setCategoryId(e.target.value)}  className="w-full rounded-xl border border-gray-300 bg-white p-3">
            <option value="1">Şorbalar</option>
            <option value="2">Əsas yeməklər</option>
            <option value="3">Qəlyanaltilar</option>
            <option value="4">Salatlar</option>
            <option value="5">Desertlər</option>
            <option value="6">İçkilər</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Qiymət</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-[#A37B3E]"/>
        </div>

        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)}/>
          Satişda mövcuddur
        </label>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onClose}>
            Ləğv et
          </button>
          <button type="submit" className="rounded-xl bg-[#A37B3E] px-5 py-3 text-white">
            Dəyişiklikləri yadda saxla
          </button>
        </div>

      </form>
    </div>
  </div>
);

}
export default EditingProduct;