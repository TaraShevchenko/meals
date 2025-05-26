import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function resetDatabase() {
    console.log('Начало очистки базы данных...')

    try {
        await prisma.orderReportItem.deleteMany({})
        console.log('Удалены все элементы отчетов заказов')

        await prisma.orderReport.deleteMany({})
        console.log('Удалены все отчеты заказов')

        await prisma.menuMeal.deleteMany({})
        console.log('Удалены все связи меню-блюда')

        await prisma.menu.deleteMany({})
        console.log('Удалены все меню')

        await prisma.mealComponentIngredient.deleteMany({})
        console.log('Удалены все связи компонент-ингредиент')

        await prisma.$executeRaw`DELETE FROM "_MealToComponent"`

        await prisma.meal.deleteMany({})
        console.log('Удалены все блюда')

        await prisma.mealComponent.deleteMany({})
        console.log('Удалены все компоненты блюд')

        await prisma.ingredient.deleteMany({})
        console.log('Удалены все ингредиенты')

        console.log('Очистка базы данных завершена успешно!')
    } catch (error) {
        console.error('Ошибка при очистке базы данных:', error)
        throw error
    }
}

resetDatabase()
    .catch((e) => {
        console.error('Критическая ошибка:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
