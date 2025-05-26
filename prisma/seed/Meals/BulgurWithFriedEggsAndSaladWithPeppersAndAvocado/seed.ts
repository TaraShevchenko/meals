import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedBulgurWithFriedEggsAndSaladWithPeppersAndAvocado() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenEgg],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Bulgur],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Salad],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Cucumber],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Tomato],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.SweetPepper],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Avocado],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Onion],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.OliveOil],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.FriedEggs],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Bulgur],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.SaladWithPeppersAndAvocado],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Булгур с жареными яйцами и салатом с перцем и авокадо',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedBulgurWithFriedEggsAndSaladWithPeppersAndAvocado()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
