import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedBuckwheatWithSausagesAndVegetableSalad() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Buckwheat],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Sausages],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.QuailEgg],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Cucumber],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.SweetPepper],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Avocado],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.CannedCorn],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.SauerkrautCabbage],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Tomato],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.BuckwheatWithSausages],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.VegetableSaladWithEggs],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.SauerkrautCabbage],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Гречка с сосисками и овощным салатом',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedBuckwheatWithSausagesAndVegetableSalad()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
