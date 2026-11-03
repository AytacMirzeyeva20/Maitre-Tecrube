import { IoMdSearch } from "react-icons/io";
import {getProducts, getCategories, type Product, type Category, updateProduct, deleteProducting,} from "../api/api";
import { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import EditingProduct from "../components/EditingProduct";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteProduct from "../components/DeleteProduct";
function Products(){
    const[products,setProducts]=useState<Product[]>([]);
    const[search,setSearch]=useState("")
      const[categories,setCategories]=useState<Category[]>([]);
     const [categoryId, setCategoryId] = useState("");
     const[editingProduct,setEditingProduct]=useState<Product | null>(null);
     const refreshProducts = async () => {
  const data = await getProducts({search,categoryId: categoryId ? Number(categoryId) : undefined,pageSize:100});
  setProducts(data.items);
};
const [loading,setLoading]=useState(true);
const [error,setError]=useState(false);
    
const fetchProducts = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getProducts({
        search,
        categoryId: categoryId ? Number(categoryId) : undefined,
      });

      setProducts(data.items);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
useEffect(()=>{
  fetchProducts();

  getCategories().then((data) => {
    setCategories(data);
  });
}, [search, categoryId]);
const [showAddProduct, setShowAddProduct] = useState(false);
   const handleToggle = async (id: number, isAvailable: boolean) => {
  await updateProduct(id, {
    isAvailable: !isAvailable,
  });

  refreshProducts();
};
const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
const handleDelete=async()=>{
  if (!deletingProduct) return;
  await deleteProducting(deletingProduct.id);
  setDeletingProduct(null);
  refreshProducts();
}
    return(
        <>
        <div className="p-6">
      <h2 className="text-2xl font-bold text-[#292011] ">Mehsullar</h2>
      <p className="text-sm text-gray-500 mt-1">Menyudaki butun mehsullar · 48 məhsul</p>
      <div className="flex flex-col sm:flex-row  sm:items-center sm:justify-between gap-4 mt-6">
        <div className="flex w-full items-center gap-2 sm:gap-3 sm:w-auto">
         <div className="relative">
    <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
<input  type="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Ada görə axtar..." className="w-full min-w-0 border border-gray-300 bg-white rounded-full py-2 pl-10 pr-3 outline-none focus:border-[#A37B3E] sm:w-64"/>
</div>
<select value={categoryId} onChange={(e)=>setCategoryId(e.target.value)} className="border border-gray-200 bg-white rounded-full py-2 px-5">
<option value="">Bütün kateqoriyalar</option>
{categories.map((category) => (
  <option key={category.id} value={category.id}>
    {category.name}
  </option>
))}
</select>
        </div>
     <button onClick={() => setShowAddProduct(true)}  className="bg-[#A37B3E] text-white py-2 px-5 rounded-lg hover:bg-[#89652F] transition">
  + Yeni məhsul
  </button>
  {showAddProduct && <AddProduct onClose={() => setShowAddProduct(false)}
    onProductAdded={refreshProducts}/>}
      </div>
      </div>
      {loading ? (
        <p>Yuklenir...</p>
      ) : error ? (
        <>
        <p>Xeta bas verdi.</p>
        <button onClick={fetchProducts} className="bg-[#A37B3E] text-white py-2 px-5 rounded-lg hover:bg-[#89652F] transition">
          Yeniden Cehd et
        </button>
        </>
      ) : (
        <div className="mx-6 mt-6 mb-5 overflow-x-auto rounded-2xl border border-[#E5E2DE] bg-white">
          <table className="w-full min-w-212.5 text-left border-collapse">
            <thead className="bg-[#FBF9F5] border-b border-[#EAE7E2]">
              <tr className="text-xs font-semibold tracking-wide text-[#82796F]">
                <th className="px-6 py-4">AD</th>
                <th className="px-6 py-4">KATEQORİYA</th>
                <th className="px-6 py-4 text-right">QİYMƏT</th>
                <th className="px-6 py-4">STATUS</th>
            <th className="px-6 py-4"></th>
            </tr>
        </thead>
        <tbody>
 {products.map((product) => (
 <tr key={product.id} className="border-b border-[#EAE7E2] last:border-b-0 hover:bg-[#FDFBF8] transition-colors">
<td className="px-6 py-4">
 <p className="font-medium text-sm text-[#292011]">
 {product.nameAz}
 </p>
<p className="text-xs text-[#8B8177] mt-1">
{product.nameEn}
</p>
</td>
<td className="px-6 py-4">
<span className="inline-flex rounded-full bg-[#F1EAE0] px-3 py-1.5 text-xs font-medium text-[#4A3828]">
{categories.find(
  (category) => category.id === product.categoryId
)?.name}
</span>
</td>
<td className="px-6 py-4 text-right whitespace-nowrap">
<span className="text-sm font-medium text-[#292011]">
{product.price.toFixed(2)} ₼
</span>
</td>
 <td className="px-6 py-4">
<div className="flex items-center gap-3 whitespace-nowrap">
<button onClick={() => handleToggle(product.id, product.isAvailable)} type="button" aria-label={`${product.nameAz} satiş statusu`}
className={`w-10 h-5.5 rounded-full p-0.75 flex items-center transition-colors ${
product.isAvailable ? "bg-[#203D2E] justify-end" : "bg-[#D6D0C6] justify-start"}`}>
 <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
 </button>

 <span className={`text-sm ${ product.isAvailable ? "text-[#292011]" : "text-[#8B8177]"}`}>
{product.isAvailable ? "Satişda" : "Satişda deyil"}
</span>
  </div>
  </td>
 <td className="px-6 py-4 text-right">
  {editingProduct && (
  <EditingProduct product={editingProduct}  onClose={() => setEditingProduct(null)}
    onProductUpdated={refreshProducts} />
)}
   <button onClick={() => setEditingProduct(product)} type="button" className="rounded-full border border-[#E5E2DE] bg-white px-4 py-2 text-sm font-medium text-[#292011] hover:bg-[#F7F3ED] hover:border-[#C7BBAA] transition whitespace-nowrap">
       Düzəlt
    </button>
    <button onClick={() => setDeletingProduct(product)} type="button" className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E8D5D2] bg-white text-[red] transition hover:border-[#B45B52] hover:bg-[#FDF1EF] hover:text-[#963F37]">
      <RiDeleteBin6Line size={17} />
    </button>
    {deletingProduct &&(
      <DeleteProduct product={deletingProduct} onClose={()=> setDeletingProduct(null)}
      onConfirm={handleDelete} />
    )}
  </td>
    </tr>
            ))}
        </tbody>
    </table>
  

</div>
      )}
        </>
    )
}
export default Products;