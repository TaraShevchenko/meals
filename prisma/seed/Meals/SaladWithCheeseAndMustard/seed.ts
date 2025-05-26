import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedSaladWithCheeseAndMustard() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Salad],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.CamembertCheese],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ComoInsalataCheese],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Mustard],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Cucumber],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Tomato],
    ]

    const mealComponentsToCreate = [MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.SaladWithCheeseAndMustard]]

    return await seedMealTemplate(
        {
            mealName: 'Салат с сыром и горчицей',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedSaladWithCheeseAndMustard()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
