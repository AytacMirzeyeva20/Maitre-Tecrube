import type { Product } from "../api/api";

type DeleteProductProps = {
  product: Product;
  onClose: () => void;
  onConfirm: () => void;
};

function DeleteProduct({ product,onClose,onConfirm,}: DeleteProductProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-[#FBF9F5] p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-[#292011]">
          Məhsulu silmək istəyirsiniz?
        </h2>

        <p className="mt-3 text-sm text-gray-600">
          {product.nameAz} məhsulu silinəcək. Bu əməliyyati təsdiqləyirsiniz?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose}>
            Ləğv et
          </button>

          <button type="button" onClick={onConfirm}>
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;