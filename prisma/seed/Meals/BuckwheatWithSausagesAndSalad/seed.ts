import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedBuckwheatWithSausagesAndSalad() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Buckwheat],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Sausages],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Salad],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Cucumber],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Radish],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Tomato],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Buckwheat],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Sausages],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.VegetableSaladWithRadish],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Гречка с сосисками и салатом',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedBuckwheatWithSausagesAndSalad()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
