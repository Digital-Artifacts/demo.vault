export default function Card() {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                {/* nft player */}
                <img className="p-8 rounded-t-lg" src='yakuza_1.png' alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    {/* nft title */}
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">NFT TITLE</h5>
                </a>
                {/* nft description */}
                <div className="flex items-center mt-3 mb-5">
                    <p>NFT DESCRIPTION</p>
                </div>
                {/* nft price */}
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">1 ETH</span>
                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Mint NFT</a>
                </div>
            </div>
        </div>
    )
}