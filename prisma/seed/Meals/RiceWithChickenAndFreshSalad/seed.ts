import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedRiceWithChickenAndFreshSalad() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Rice],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenFillet],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Carrot],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Salad],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Cucumber],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Tomato],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.SweetPepper],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.RiceWithChickenAndCarrot],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.VegetableSalad],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Рис с курицей и свежим салатом',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedRiceWithChickenAndFreshSalad()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
