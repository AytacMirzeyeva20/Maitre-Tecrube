function Navbar(){
    return(
        <>
        <nav className="flex justify-between items-center px-4 py-4" >
            <div className="flex items-center gap-2 mt-4 ml-2">
                <h1 className="text-[#A37B3E] text-3xl font-bold">M</h1>
            <span className="text-xl font-semibold">maitre</span>
                <button className="border-[#292011] bg-[#292011] text-white font-bold rounded-2xl px-4 py-2">Admin</button>
            </div>
            <div className="flex items-center gap-3">
        <p>Mirzeyeva Aytac</p>
        <button className="bg-amber-100 text-[#A37B3E] rounded-full w-10 h-10">
            MA
        </button>
        </div>
        </nav>
        <hr className="text-gray-300" />
        </>
    )
}
export default Navbar;