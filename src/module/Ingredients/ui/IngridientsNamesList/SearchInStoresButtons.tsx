import { AtbIcon } from './AtbIcon'
import { SilpoIcon } from './SilpoIcon'

export const SearchInStoresButtons = ({ productName }: { productName: string }) => {
    if (!productName) return null

    const goToSilpo = () => {
        const query = encodeURIComponent(productName)
        window.open(`https://silpo.ua/search?find=${query}`, '_blank')
    }

    const goToAtb = () => {
        const query = encodeURIComponent(productName)
        window.open(`https://www.atbmarket.com/sch?query=${query}`, '_blank')
    }

    return (
        <div key={productName} className="border-dark-border border-b px-2 py-1 last:border-b-0">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h4 className="max-w-[280px] truncate text-base font-medium text-white">{productName}</h4>
                </div>

                <div className="ml-3 flex gap-2">
                    <button
                        onClick={goToSilpo}
                        className="bg-dark-border inline-flex cursor-pointer items-center gap-1 rounded-md px-3 py-1.5"
                    >
                        <SilpoIcon className="h-4 w-auto" />
                    </button>

                    <button
                        onClick={goToAtb}
                        className="bg-dark-border inline-flex cursor-pointer items-center gap-1 rounded-md px-3 py-1.5"
                    >
                        <AtbIcon className="h-4 w-auto" />
                    </button>
                </div>
            </div>
        </div>
    )
}
