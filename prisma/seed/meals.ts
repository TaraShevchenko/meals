import { ComponentType, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedMeals() {
    console.log('Начало сидинга блюд...')

    const carbsComponents = await prisma.mealComponent.findMany({
        where: { type: ComponentType.CARBS },
    })

    const proteinComponents = await prisma.mealComponent.findMany({
        where: { type: ComponentType.PROTEIN },
    })

    const fiberComponents = await prisma.mealComponent.findMany({
        where: { type: ComponentType.FIBER },
    })

    let mealCount = 0

    for (const carbsComponent of carbsComponents) {
        for (const proteinComponent of proteinComponents) {
            for (const fiberComponent of fiberComponents) {
                const mealName = `${carbsComponent.name}+${proteinComponent.name}+${fiberComponent.name}`

                try {
                    await prisma.meal.create({
                        data: {
                            name: mealName,
                            components: {
                                connect: [
                                    { id: carbsComponent.id },
                                    { id: proteinComponent.id },
                                    { id: fiberComponent.id },
                                ],
                            },
                        },
                    })
                    mealCount++
                } catch (error) {
                    console.error(`Ошибка при создании блюда "${mealName}":`, error)
                }
            }
        }
    }

    console.log(`Сидинг блюд завершен! Создано ${mealCount} блюд.`)
}

seedMeals()
    .catch((e) => {
        console.error('Ошибка при сидинге блюд:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
