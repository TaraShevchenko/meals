import { ComponentType, Ingredient, MealComponent, PrismaClient } from '@prisma/client'

import { CreateIngredientData } from 'module/Ingredients'

type MealComponentData = {
    name: string
    type: ComponentType
    ingredients: { ingredientName: string; quantity: number }[]
}

interface SeedMealParams {
    mealName: string
    ingredientsData: CreateIngredientData[]
    mealComponentsData: MealComponentData[]
}

export async function seedMealTemplate(
    { mealName, ingredientsData, mealComponentsData }: SeedMealParams,
    prisma: PrismaClient,
) {
    console.log(`Начало сидинга блюда: ${mealName}...`)

    const ingredients: Record<string, Ingredient> = {}

    for (const ingredientData of ingredientsData) {
        const existingIngredient = await prisma.ingredient.findUnique({
            where: { name: ingredientData.name },
        })

        if (!existingIngredient) {
            const ingredient = await prisma.ingredient.create({
                data: ingredientData,
            })
            ingredients[ingredientData.name] = ingredient
            console.log(`Создан ингредиент: ${ingredient.name}`)
        } else {
            ingredients[ingredientData.name] = existingIngredient
            console.log(`Ингредиент уже существует: ${existingIngredient.name}`)
        }
    }

    const mealComponents: MealComponent[] = []

    for (const mealComponentData of mealComponentsData) {
        const existingMealComponent = await prisma.mealComponent.findFirst({
            where: { name: mealComponentData.name },
        })

        if (!existingMealComponent) {
            const mealComponent = await prisma.mealComponent.create({
                data: {
                    name: mealComponentData.name,
                    type: mealComponentData.type,
                    ingredients: {
                        create: mealComponentData.ingredients.map((ingredient) => ({
                            quantity: ingredient.quantity,
                            ingredientId: ingredients[ingredient.ingredientName].id,
                        })),
                    },
                },
            })
            mealComponents.push(mealComponent)
            console.log(`Создан компонент блюда: ${mealComponent.name}`)
        } else {
            mealComponents.push(existingMealComponent)
            console.log(`Компонент блюда уже существует: ${existingMealComponent.name}`)
        }
    }

    console.log('Компоненты блюда созданы!')

    const meal = await prisma.meal.create({
        data: {
            name: mealName,
            components: {
                connect: mealComponents.map((component) => ({ id: component.id })),
            },
        },
    })

    console.log(`Блюдо создано: ${meal.name} (ID: ${meal.id})`)
    console.log('Сидинг блюда завершен!')

    return meal
}
