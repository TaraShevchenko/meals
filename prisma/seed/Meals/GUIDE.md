## Создание модуля нового блюда

### Шаг 1: Создание папки модуля

Создайте папку с названием блюда в формате PascalCase в директории `prisma/seed/Meals/`:

```
prisma/seed/Meals/YourMealName/
```

Пример: `BuckwheatChickenEggsChickenDrumsticksSaladWithHerbsAndOnions`

### Шаг 2: Создание файла описания (DESC.md)

Создайте файл `DESC.md` с описанием блюда:

````markdown
### Содержит

```typescript
Meal: {
    name: 'Название вашего блюда',
    MealComponent: [
        { name: 'Компонент 1' },
        { name: 'Компонент 2' },
        // ... другие компоненты
    ],
    Ingredients: [
        { name: 'Ингредиент 1', quantity: 100 }, // взять информацию из промпта
        { name: 'Ингредиент 2', quantity: 100 },
        // ... другие ингредиенты
    ]
}
```
````

````

### Шаг 3: Расширение файла Ingredients.ts

Добавьте новые ингредиенты в файл `prisma/seed/data/Ingredients.ts`:

1. **Добавьте названия в INGREDIENT_NAMES:**
```typescript
export const INGREDIENT_NAMES = {
    // ... существующие ингредиенты
    YourNewIngredient: 'Название на украинском',
} as const
````

2. **Добавьте данные в массив INGREDIENTS:**

```typescript
export const INGREDIENTS: CreateIngredientData[] = [
    // ... существующие ингредиенты
    {
        name: INGREDIENT_NAMES.YourNewIngredient,
        productNames: ['Конкретное название продукта'], // опционально
        calories: 100, // ккал на 100г
        protein: 10, // белки на 100г
        fat: 5, // жиры на 100г
        carbs: 20, // углеводы на 100г
    },
]
```

### Шаг 4: Расширение файла MealComponent.ts

Добавьте новые компоненты блюда в файл `prisma/seed/data/MealComponent.ts`:

1. **Добавьте названия в MEAL_COMPONENT_NAMES:**

```typescript
export const MEAL_COMPONENT_NAMES = {
    // ... существующие компоненты
    YourNewComponent: 'Название компонента',
} as const
```

2. **Добавьте данные в массив MEAL_COMPONENTS:**

```typescript
export const MEAL_COMPONENTS: MealComponent[] = [
    // ... существующие компоненты
    {
        name: MEAL_COMPONENT_NAMES.YourNewComponent,
        type: ComponentType.CARBS, // или PROTEIN, или FIBER
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.SomeIngredient,
                quantity: 100, // количество в граммах
            },
            // ... другие ингредиенты компонента
        ],
    },
]
```

### Шаг 5: Создание файла seed.ts

Создайте файл `seed.ts` в папке модуля:

```typescript
import { PrismaClient } from '@prisma/client'

import { INGREDIENTS_BY_NAMES, INGREDIENT_NAMES } from '../../data/Ingredients'
import { MEAL_COMPONENTS_BY_NAMES, MEAL_COMPONENT_NAMES } from '../../data/MealComponent'
import { seedMealTemplate } from '../seedMealTemplate'

const prisma = new PrismaClient()

async function seedYourMeal() {
    const ingredientsToCreate = [
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Ingredient1],
        INGREDIENTS_BY_NAMES[INGREDIENT_NAMES.Ingredient2],
        // ... все необходимые ингредиенты
    ]

    const mealComponentsToCreate = [
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Component1],
        MEAL_COMPONENTS_BY_NAMES[MEAL_COMPONENT_NAMES.Component2],
        // ... все необходимые компоненты
    ]

    return await seedMealTemplate(
        {
            mealName: 'Полное название вашего блюда',
            ingredientsData: ingredientsToCreate,
            mealComponentsData: mealComponentsToCreate,
        },
        prisma,
    )
}

seedYourMeal()
    .catch((e) => {
        console.error('Ошибка при сидинге блюда:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
```

### Пример полного модуля

На основе модуля `BuckwheatChickenEggsChickenDrumsticksSaladWithHerbsAndOnions`:

**Структура папки:**

```
BuckwheatChickenEggsChickenDrumsticksSaladWithHerbsAndOnions/
├── DESC.md
├── seed.ts
└── image.png
```

**Добавленные ингредиенты в Ingredients.ts:**

- `Buckwheat: 'Гречана крупа'`
- `Salad: 'Салат'`
- `Cucumber: 'Огірок'`
- `Tomato: 'Помідор'`
- `Onion: 'Цибуля'`
- `Herbs: 'Зелень'`
- `ChickenEgg: 'Яйце куряче'`
- `ChickenLeg: 'Куряча гомілка'`

**Добавленные компоненты в MealComponent.ts:**

- `Buckwheat: 'Гречка'` (ComponentType.CARBS)
- `BoiledEggs: 'Яйца вареные'` (ComponentType.PROTEIN)
- `ChickenDrumsticks: 'Куриные ножки запеченные'` (ComponentType.PROTEIN)
- `SaladWithHerbsAndOnions: 'Салат с зеленью и луком'` (ComponentType.FIBER)

# Шаблон для сидинга блюд

## Использование функции `seedMealTemplate`

Функция `seedMealTemplate` позволяет легко создавать новые блюда в базе данных, принимая массивы ингредиентов, компонентов блюда и название блюда.

### Параметры

```typescript
interface SeedMealParams {
    mealName: string // Название блюда
    ingredientsData: CreateIngredientData[] // Массив данных ингредиентов
    mealComponentsData: MealComponentData[] // Массив данных компонентов блюда
}
```

### Пример использования

```typescript
import { ComponentType, PrismaClient } from '@prisma/client'

import { seedMealTemplate } from './seedMealTemplate'

const prisma = new PrismaClient()

async function seedMyMeal() {
    const ingredientsData = [
        {
            name: 'Рис',
            calories: 365,
            protein: 7.1,
            fat: 0.7,
            carbs: 78.9,
        },
        {
            name: 'Курица',
            calories: 165,
            protein: 31,
            fat: 3.6,
            carbs: 0,
        },
    ]

    const mealComponentsData = [
        {
            name: 'Отварной рис',
            type: ComponentType.CARBS,
            ingredients: [
                {
                    ingredientName: 'Рис',
                    quantity: 100,
                },
            ],
        },
        {
            name: 'Жареная курица',
            type: ComponentType.PROTEIN,
            ingredients: [
                {
                    ingredientName: 'Курица',
                    quantity: 150,
                },
            ],
        },
    ]

    return await seedMealTemplate(
        {
            mealName: 'Рис с курицей',
            ingredientsData,
            mealComponentsData,
        },
        prisma,
    )
}
```

### Типы компонентов

Доступные типы компонентов (`ComponentType`):

- `ComponentType.CARBS` - углеводы
- `ComponentType.PROTEIN` - белки
- `ComponentType.FIBER` - клетчатка

### Особенности

- Функция автоматически проверяет существование ингредиентов и компонентов в базе данных
- Если ингредиент или компонент уже существует, он будет переиспользован
- Функция логирует процесс создания для отслеживания
- Возвращает созданное блюдо с ID
