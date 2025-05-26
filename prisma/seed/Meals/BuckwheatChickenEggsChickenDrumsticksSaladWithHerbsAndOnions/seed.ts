import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedBuckwheatMeal() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Buckwheat],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Salad],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Cucumber],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Tomato],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Onion],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Herbs],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenEgg],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenLeg],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Buckwheat],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.BoiledEggs],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.ChickenDrumsticks],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.SaladWithHerbsAndOnions],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Гречка с вареными яйцами, куриными ножками и салатом с зеленью и луком',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedBuckwheatMeal()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
