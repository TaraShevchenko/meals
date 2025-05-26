import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedBoiledEggsWithPastaAndSaladWithPeppers() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenEgg],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Pasta],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.HardCheese],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Salad],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Cucumber],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Tomato],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.SweetPepper],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.OliveOil],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.BoiledEggs],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.PastaWithCheese],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.SaladWithPeppers],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Вареные яйца с макаронами и салатом с перцем',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedBoiledEggsWithPastaAndSaladWithPeppers()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
