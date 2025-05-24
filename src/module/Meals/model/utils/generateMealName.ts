import { prisma } from 'shared/lib/prisma'

export const generateMealName = async (componentIds: string[]): Promise<string> => {
    if (componentIds.length === 0) {
        return 'Блюдо без компонентов'
    }

    const components = await prisma.mealComponent.findMany({
        where: { id: { in: componentIds } },
        select: { name: true },
    })

    return components.map((comp) => comp.name).join(' + ')
}
