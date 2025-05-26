import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedSpinachSaladWithChickenEggAndCorn() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Spinach],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenFillet],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.SoftCheese],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.CannedCorn],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenEgg],
    ]

    const mealComponentsToCreate = [MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.SpinachChickenSalad]]

    return await seedMealTemplate(
        {
            mealName: 'Салат зі шпинатом, куркою, яйцем і кукурудзою',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedSpinachSaladWithChickenEggAndCorn()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
