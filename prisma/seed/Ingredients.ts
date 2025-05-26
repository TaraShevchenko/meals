import { PrismaClient } from '@prisma/client'

import { INGREDIENTS } from './data/Ingredients'

const prisma = new PrismaClient()

async function seedIngredients() {
    console.log('Начало сидинга ингредиентов...')

    for (const ingredient of INGREDIENTS) {
        await prisma.ingredient.create({
            data: ingredient,
        })
    }

    console.log('Сидинг ингредиентов завершен!')
}

seedIngredients()
    .catch((e) => {
        console.error('Ошибка при сидинге ингредиентов:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
