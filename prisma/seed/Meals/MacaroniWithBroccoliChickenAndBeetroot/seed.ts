import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedMacaroniWithBroccoliChickenAndBeetroot() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Pasta],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.HardCheese],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenFillet],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Broccoli],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Carrot],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Beetroot],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.OliveOil],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.PastaWithCheese],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.VegetablesWithChicken],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.GratedBeetroot],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Макароны с брокколи, курицей и свеклой',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedMacaroniWithBroccoliChickenAndBeetroot()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
