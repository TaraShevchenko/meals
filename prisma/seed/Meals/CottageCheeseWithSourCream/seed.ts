import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedCottageCheeseWithSourCream() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.CottageCheese],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.SourCream],
    ]

    const mealComponentsToCreate = [MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.CottageCheeseWithSourCream]]

    return await seedMealTemplate(
        {
            mealName: 'Творог со сметаной',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedCottageCheeseWithSourCream()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
