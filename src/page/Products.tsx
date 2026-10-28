import { IoMdSearch } from "react-icons/io";
import { getProducts, type Product } from "../api/api";
import { useEffect, useState } from "react";
function Products(){
    const[products,setProducts]=useState<Product[]>([]);
    const[search,setSearch]=useState("")
    useEffect(()=>{
        getProducts({search}).then((data)=>{
            setProducts(data.items);
        })
    },[search])
    return(
        <>
        <div className="p-6">
      <h2 className="text-2xl font-bold text-[#292011] ">Mehsullar</h2>
      <p className="text-sm text-gray-500 mt-1">Menyudaki butun mehsullar · 48 məhsul</p>
      <div className="flex items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-3">
         <div className="relative">
    <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
<input  type="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Ada görə axtar..." className="border border-gray-300  bg-white rounded-full py-2 pl-20 pr-4 outline-none focus:border-[#A37B3E]"/>
</div>
        <select className="border border-gray-200 bg-white rounded-full py-2 px-5" >
            <option value="">Butun Kateqoriyalar</option>
        </select>
        </div>
     <button className="bg-[#A37B3E] text-white py-2 px-5 rounded-lg hover:bg-[#89652F] transition">  + Yeni məhsul</button>
      </div>
      </div>
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
{product.nameEn ?? "—"}
</p>
</td>
<td className="px-6 py-4">
<span className="inline-flex rounded-full bg-[#F1EAE0] px-3 py-1.5 text-xs font-medium text-[#4A3828]">
{product.categoryId}
</span>
</td>
<td className="px-6 py-4 text-right whitespace-nowrap">
<span className="text-sm font-medium text-[#292011]">
{product.price.toFixed(2).replace(".", ",")} ₼
</span>
</td>
 <td className="px-6 py-4">
<div className="flex items-center gap-3 whitespace-nowrap">
<button type="button" aria-label={`${product.nameAz} satiş statusu`}
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
   <button  type="button" className="rounded-full border border-[#E5E2DE] bg-white px-4 py-2 text-sm font-medium text-[#292011] hover:bg-[#F7F3ED] hover:border-[#C7BBAA] transition whitespace-nowrap">
       Düzəlt
    </button>
  </td>
    </tr>
            ))}
        </tbody>
    </table>
</div>
        </>
    )
}
export default Products;