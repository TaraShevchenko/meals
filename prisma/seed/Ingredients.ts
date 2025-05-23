import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ingredients = [
    { name: 'Рис', calories: 1.3, protein: 0.027, fat: 0.003, carbs: 0.28 },
    { name: 'Картошка', calories: 0.77, protein: 0.02, fat: 0.001, carbs: 0.17 },
    { name: 'Огурец', calories: 0.16, protein: 0.007, fat: 0.001, carbs: 0.036 },
    { name: 'Помидор', calories: 0.18, protein: 0.009, fat: 0.002, carbs: 0.039 },
    { name: 'Морковь', calories: 0.41, protein: 0.009, fat: 0.002, carbs: 0.096 },
    { name: 'Лук', calories: 0.4, protein: 0.011, fat: 0.001, carbs: 0.093 },
    { name: 'Чеснок', calories: 1.49, protein: 0.064, fat: 0.005, carbs: 0.33 },
    { name: 'Брокколи', calories: 0.34, protein: 0.028, fat: 0.004, carbs: 0.07 },
    { name: 'Цветная капуста', calories: 0.25, protein: 0.019, fat: 0.003, carbs: 0.05 },
    { name: 'Шпинат', calories: 0.23, protein: 0.029, fat: 0.004, carbs: 0.036 },
    { name: 'Кабачок', calories: 0.17, protein: 0.012, fat: 0.003, carbs: 0.031 },
    { name: 'Перец сладкий', calories: 0.2, protein: 0.009, fat: 0.002, carbs: 0.047 },
    { name: 'Грибы', calories: 0.22, protein: 0.031, fat: 0.003, carbs: 0.033 },
    { name: 'Кукуруза', calories: 0.96, protein: 0.034, fat: 0.015, carbs: 0.21 },
    { name: 'Гречка', calories: 3.43, protein: 0.133, fat: 0.034, carbs: 0.72 },
    { name: 'Фасоль', calories: 1.27, protein: 0.087, fat: 0.005, carbs: 0.22 },
    { name: 'Чечевица', calories: 1.16, protein: 0.09, fat: 0.004, carbs: 0.2 },
    { name: 'Яблоко', calories: 0.52, protein: 0.003, fat: 0.002, carbs: 0.14 },
    { name: 'Банан', calories: 0.89, protein: 0.011, fat: 0.003, carbs: 0.23 },
    { name: 'Апельсин', calories: 0.47, protein: 0.009, fat: 0.001, carbs: 0.12 },
    { name: 'Груша', calories: 0.57, protein: 0.004, fat: 0.001, carbs: 0.15 },
    { name: 'Киви', calories: 0.61, protein: 0.011, fat: 0.005, carbs: 0.15 },
    { name: 'Виноград', calories: 0.69, protein: 0.007, fat: 0.002, carbs: 0.18 },
    { name: 'Клубника', calories: 0.32, protein: 0.007, fat: 0.003, carbs: 0.077 },
    { name: 'Малина', calories: 0.52, protein: 0.012, fat: 0.007, carbs: 0.12 },
    { name: 'Черника', calories: 0.57, protein: 0.007, fat: 0.003, carbs: 0.14 },
    { name: 'Оливки', calories: 1.45, protein: 0.008, fat: 0.15, carbs: 0.04 },
    { name: 'Орехи', calories: 6.07, protein: 0.2, fat: 0.54, carbs: 0.21 },
    { name: 'Семена подсолнечника', calories: 5.84, protein: 0.21, fat: 0.51, carbs: 0.2 },
    { name: 'Семена тыквы', calories: 5.59, protein: 0.3, fat: 0.49, carbs: 0.1 },
    { name: 'Мед', calories: 3.04, protein: 0.003, fat: 0, carbs: 0.82 },
    { name: 'Сахар', calories: 3.87, protein: 0, fat: 0, carbs: 1 },
    { name: 'Соль', calories: 0, protein: 0, fat: 0, carbs: 0 },
    { name: 'Курица', calories: 2.39, protein: 0.27, fat: 0.14, carbs: 0 },
    { name: 'Говядина', calories: 2.5, protein: 0.26, fat: 0.17, carbs: 0 },
    { name: 'Свинина', calories: 2.63, protein: 0.25, fat: 0.2, carbs: 0 },
    { name: 'Лосось', calories: 2.06, protein: 0.22, fat: 0.13, carbs: 0 },
    { name: 'Тунец', calories: 1.32, protein: 0.28, fat: 0.01, carbs: 0 },
    { name: 'Треска', calories: 1.05, protein: 0.23, fat: 0.009, carbs: 0 },
]

async function seedIngredients() {
    console.log('Начало сидинга ингредиентов...')

    for (const ingredient of ingredients) {
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
