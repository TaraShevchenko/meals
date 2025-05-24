import { useRecordContext } from 'react-admin'

import { SearchInStoresButtons } from './SearchInStoresButtons'

export const IngridientsNamesList = () => {
    const record = useRecordContext()
    const productNames = record?.productNames || []
    const ingredientName = record?.name || ''

    if (productNames.length === 0) {
        return (
            <div className="mt-6">
                <h3>Наименования продуктов:</h3>
                <p>Наименования продуктов не добавлены</p>
            </div>
        )
    }

    return (
        <div className="border-dark-border bg-dark-bg max-w-md overflow-hidden rounded-sm border">
            <div className="border-dark-border bg-dark-bg border-b px-2 py-1">
                <h3 className="flex items-center gap-2 text-base font-semibold text-white">Посмотреть в магазинах</h3>
            </div>
            <div>
                <SearchInStoresButtons productName={ingredientName} />
                {productNames.map((productName: string) => (
                    <SearchInStoresButtons key={productName} productName={productName} />
                ))}
            </div>
        </div>
    )
}
