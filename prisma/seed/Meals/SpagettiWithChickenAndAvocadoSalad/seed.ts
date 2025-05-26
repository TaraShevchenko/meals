import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedSpagettiWithChickenAndAvocadoSalad() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Noodles],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenFillet],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Avocado],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Tomato],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.SweetPepper],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Salad],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Spaghetti],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Chicken],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.VegetableSaladWithAvocado],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Спагетти с курицей и салатом с авокадо',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedSpagettiWithChickenAndAvocadoSalad()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
