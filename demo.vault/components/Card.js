export default function Card() {
    return (
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                {/* nft player */}
                <img class="p-8 rounded-t-lg" src='yakuza_1.png' alt="product image" />
            </a>
            <div class="px-5 pb-5">
                <a href="#">
                    {/* nft title */}
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">NFT TITLE</h5>
                </a>
                {/* nft description */}
                <div class="flex items-center mt-3 mb-5">
                    <p>NFT DESCRIPTION</p>
                </div>
                {/* nft price */}
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">1 ETH</span>
                    <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Mint NFT</a>
                </div>
            </div>
        </div>
    )
}