# Автоматическая генерация названий блюд

## Описание изменений

Поле `name` в модели `Meal` теперь является **необязательным**. Если название не указано при создании блюда, оно будет автоматически сгенерировано из названий компонентов.

## Изменения в базе данных

### Prisma Schema

```prisma
model Meal {
  id         String          @id @default(uuid())
  name       String?         // ← Теперь необязательное поле
  components MealComponent[] @relation("MealToComponent")
  menus      Menu[]          @relation("MenuToMeal")
  createdAt  DateTime        @default(now())
  updatedAt  DateTime        @updatedAt
}
```

### Миграция

Создана миграция `20250524131822_make_meal_name_optional` которая изменяет поле `name` на необязательное.

## Логика генерации названий

### Функция `generateMealName`

```typescript
const generateMealName = async (componentIds: string[]): Promise<string> => {
    if (componentIds.length === 0) {
        return 'Блюдо без компонентов'
    }

    const components = await prisma.mealComponent.findMany({
        where: { id: { in: componentIds } },
        select: { name: true },
    })

    return components.map((comp) => comp.name).join(' + ')
}
```

### Примеры генерации

- Компоненты: `["Куриная грудка", "Рис", "Овощи"]` → Название: `"Куриная грудка + Рис + Овощи"`
- Компоненты: `[]` → Название: `"Блюдо без компонентов"`

## Изменения в API

### Создание блюда (`create`)

- Если `name` предоставлено → используется переданное название
- Если `name` не предоставлено → генерируется автоматически из компонентов

### Обновление блюда (`update`)

- Если обновляются `components` и `name` не предоставлено → генерируется новое название
- Если `name` предоставлено → используется переданное название

## Изменения в UI

### Формы создания и редактирования

- Убрана обязательная валидация для поля `name`
- Добавлен `helperText`: "Оставьте пустым для автоматической генерации из компонентов"

### Компоненты

- `MealCreate` - поле название теперь необязательное
- `MealEdit` - поле название теперь необязательное

## Использование

### Создание блюда без названия

```typescript
const meal = await mealsDataProvider.create({
    data: {
        components: {
            connect: [{ id: 'component-1-id' }, { id: 'component-2-id' }],
        },
    },
})
// meal.name будет автоматически сгенерировано
```

### Создание блюда с кастомным названием

```typescript
const meal = await mealsDataProvider.create({
    data: {
        name: 'Мое особенное блюдо',
        components: {
            connect: [{ id: 'component-1-id' }],
        },
    },
})
// meal.name = "Мое особенное блюдо"
```

## Преимущества

1. **Упрощение UX** - пользователю не нужно придумывать названия для блюд
2. **Консистентность** - названия генерируются по единому принципу
3. **Гибкость** - возможность задать кастомное название при необходимости
4. **Автоматизация** - меньше ручной работы при создании блюд
