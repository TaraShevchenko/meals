import { PrismaClient } from '@prisma/client'

import { MEAL_COMPONENTS } from './data/MealComponent.data'

const prisma = new PrismaClient()

async function seedMealComponents() {
    console.log('Начало сидинга компонентов блюд...')

    for (const component of MEAL_COMPONENTS) {
        const createdComponent = await prisma.mealComponent.create({
            data: {
                name: component.name,
                type: component.type,
            },
        })

        for (const ingredientData of component.ingredients) {
            const ingredient = await prisma.ingredient.findUnique({
                where: { name: ingredientData.ingredientName },
            })

            if (!ingredient) {
                console.error(`Ингредиент не найден: ${ingredientData.ingredientName}`)
                continue
            }

            await prisma.mealComponentIngredient.create({
                data: {
                    quantity: ingredientData.quantity,
                    ingredientId: ingredient.id,
                    componentId: createdComponent.id,
                },
            })
        }
    }

    console.log('Сидинг компонентов блюд завершен!')
}

seedMealComponents()
    .catch((e) => {
        console.error('Ошибка при сидинге компонентов блюд:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
