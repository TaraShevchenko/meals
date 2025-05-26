import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedStewedPotatoesWithMeatAndSauerkraut() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Potato],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.PorkSteak],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Carrot],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Onion],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.SauerkrautCabbage],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.OliveOil],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.StewedPotatoesWithMeat],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.SauerkrautCabbage],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Тушёная картошка с мясом и квашеной капустой',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedStewedPotatoesWithMeatAndSauerkraut()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
