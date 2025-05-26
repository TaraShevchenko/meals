import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedRiceWithChickenAndSaladWithTunaAndCorn() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Rice],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenFillet],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Carrot],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.OliveOil],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Salad],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.CannedCorn],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.CannedTuna],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.CreamCheese],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.RiceWithChicken],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.SaladWithTunaAndCorn],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Рис с курицей и салатом с тунцом и кукурузой',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedRiceWithChickenAndSaladWithTunaAndCorn()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
