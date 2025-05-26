import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedSpagettiWithBeetAndEggs() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Noodles],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Beetroot],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Cucumber],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.ChickenEgg],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Sausages],
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Spaghetti],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.BeetAndCucumberSalad],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.BoiledEggs],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Sausages],
    ]

    return await seedMealTemplate(
        {
            mealName: 'Спагетти с буряком и яйцами',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedSpagettiWithBeetAndEggs()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
