import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedSpagettiWithCarrotAndCutlets() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Noodles],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.KoreanCarrot],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Cutlet],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.PickledGherkin],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Spaghetti],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.KoreanCarrot],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.CutletsWithSauce],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.PickledGherkins],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Спагетти а с морквой по-корейски и котлетами',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedSpagettiWithCarrotAndCutlets()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
