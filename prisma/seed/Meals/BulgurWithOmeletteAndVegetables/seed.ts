import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedBulgurWithOmeletteAndVegetables() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenEgg],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Sausages],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Bulgur],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Carrot],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.SweetPepper],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.OmeletteWithSausages],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Bulgur],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.VegetableMix],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Булгур с омлетом и овощами',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedBulgurWithOmeletteAndVegetables()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
