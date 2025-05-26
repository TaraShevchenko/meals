import { ComponentType } from '@prisma/client'

import { CreateMealComponentFormData } from 'module/MealComponents'

import { INGREDIENT_NAMES } from './Ingredients.data'

export const MEAL_COMPONENT_NAMES = {
    // CARBS
    Rise: 'Рис',
    Bulgur: 'Булгур',
    Buckwheat: 'Гречка',
    Lentils: 'Чечевица',
    Pasta: 'Макароны "Паутинка"',
    Noodles: 'Лапша',
    MashedPotatoes: 'Картофельное пюре',
    StewedPotatoesWithMeat: 'Тушёная картошка с мясом',
    RiceWithChickenAndCarrot: 'Рис с курицей и морковью',

    // PROTEIN
    Sausages: 'Сосиски',
    ChickenGoulash: 'Гуляш куриный',
    ChickenCutlets: 'Котлеты куриные',
    ChickenChoppedCutlets: 'Котлеты рубленые куриные',
    BakedChickenLegs: 'Запеченые куриные ножки',
    BakedChickenWings: 'Запеченые куриные крылышки',
    BakedChickenFillet: 'Запеченое куриное филе с овощами',

    FriedEggs: 'Жареные яйца',
    BoiledEggs: 'Вареные яйца',
    OmeletteWithHam: 'Омлет с ветчиной',
    OmeletteWithSausages: 'Омлет с сосисками',

    MeatballsWithVegetables: 'Тефтели с овощами',
    CottageCheeseWithSourCream: 'Творог со сметаной',

    // FIBER
    VegetableMix: 'Овощная смесь',
    GratedBeetroot: 'Тертая свекла',
    KoreanCarrot: 'Морковь по-корейски',
    SauerkrautCabbage: 'Квашеная капуста',
    PickledCucumbers: 'Огурцы маринованные',

    Salad: 'Салат',
    SaladWithRadish: 'Салат с редиской',
    SaladWithTunaAndCorn: 'Салат с тунцом и кукурузой',
    SaladWithHerbsAndOnions: 'Салат с зеленью и луком',
    SaladWithCheeseAndMustard: 'Салат с сыром и горчицей',
    SaladWithPeppersAndAvocado: 'Салат с перцем и авокадо',
    SpinachChickenSalad: 'Салат со шпинатом и курицей',
} as const

type MealComponent = Omit<CreateMealComponentFormData, 'ingredients'> & {
    ingredients: { ingredientName: string; quantity: number }[]
}
export const MEAL_COMPONENTS: MealComponent[] = [
    // CARBS
    {
        name: MEAL_COMPONENT_NAMES.Rise,
        type: ComponentType.CARBS,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Rice,
                quantity: 60,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.Bulgur,
        type: ComponentType.CARBS,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Bulgur,
                quantity: 60,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.Buckwheat,
        type: ComponentType.CARBS,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Buckwheat,
                quantity: 60,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.Lentils,
        type: ComponentType.CARBS,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Lentils,
                quantity: 60,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.Pasta,
        type: ComponentType.CARBS,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Pasta,
                quantity: 60,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.Noodles,
        type: ComponentType.CARBS,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Noodles,
                quantity: 60,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.MashedPotatoes,
        type: ComponentType.CARBS,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Potato,
                quantity: 150,
            },
            {
                ingredientName: INGREDIENT_NAMES.Milk,
                quantity: 50,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.StewedPotatoesWithMeat,
        type: ComponentType.CARBS,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Potato,
                quantity: 150,
            },
            {
                ingredientName: INGREDIENT_NAMES.PorkSteak,
                quantity: 100,
            },
            {
                ingredientName: INGREDIENT_NAMES.Carrot,
                quantity: 30,
            },
            {
                ingredientName: INGREDIENT_NAMES.Onion,
                quantity: 30,
            },
            {
                ingredientName: INGREDIENT_NAMES.OliveOil,
                quantity: 10,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.RiceWithChickenAndCarrot,
        type: ComponentType.CARBS,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Rice,
                quantity: 60,
            },
            {
                ingredientName: INGREDIENT_NAMES.ChickenFillet,
                quantity: 100,
            },
            {
                ingredientName: INGREDIENT_NAMES.Carrot,
                quantity: 30,
            },
        ],
    },

    // PROTEIN
    {
        name: MEAL_COMPONENT_NAMES.Sausages,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Sausages,
                quantity: 120,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.ChickenGoulash,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.ChickenFillet,
                quantity: 120,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.ChickenCutlets,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.ChickenCutlet,
                quantity: 120,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.ChickenChoppedCutlets,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.ChickenMince,
                quantity: 120,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.BakedChickenLegs,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.ChickenDrumsticks,
                quantity: 120,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.BakedChickenWings,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.ChickenLeg,
                quantity: 120,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.BakedChickenFillet,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.ChickenFillet,
                quantity: 120,
            },
            {
                ingredientName: INGREDIENT_NAMES.Broccoli,
                quantity: 30,
            },
            {
                ingredientName: INGREDIENT_NAMES.Carrot,
                quantity: 30,
            },
            {
                ingredientName: INGREDIENT_NAMES.OliveOil,
                quantity: 10,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.FriedEggs,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.ChickenEgg,
                quantity: 200,
            },
            {
                ingredientName: INGREDIENT_NAMES.OliveOil,
                quantity: 5,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.BoiledEggs,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.ChickenEgg,
                quantity: 200,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.OmeletteWithHam,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.ChickenEgg,
                quantity: 140,
            },
            {
                ingredientName: INGREDIENT_NAMES.Ham,
                quantity: 80,
            },
            {
                ingredientName: INGREDIENT_NAMES.HardCheese,
                quantity: 30,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.OmeletteWithSausages,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.ChickenEgg,
                quantity: 140,
            },
            {
                ingredientName: INGREDIENT_NAMES.Sausages,
                quantity: 80,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.MeatballsWithVegetables,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.ChickenMince,
                quantity: 120,
            },
            {
                ingredientName: INGREDIENT_NAMES.Carrot,
                quantity: 30,
            },
            {
                ingredientName: INGREDIENT_NAMES.Onion,
                quantity: 20,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.CottageCheeseWithSourCream,
        type: ComponentType.PROTEIN,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.CottageCheese,
                quantity: 150,
            },
            {
                ingredientName: INGREDIENT_NAMES.SourCream,
                quantity: 50,
            },
        ],
    },

    // FIBER
    {
        name: MEAL_COMPONENT_NAMES.VegetableMix,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Carrot,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.SweetPepper,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Cucumber,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Tomato,
                quantity: 50,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.GratedBeetroot,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Beetroot,
                quantity: 50,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.KoreanCarrot,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.KoreanCarrot,
                quantity: 10,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.SauerkrautCabbage,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.SauerkrautCabbage,
                quantity: 50,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.PickledCucumbers,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.PickledGherkin,
                quantity: 30,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.Salad,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Salad,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Cucumber,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Tomato,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.SweetPepper,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.OliveOil,
                quantity: 10,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.SaladWithRadish,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Salad,
                quantity: 40,
            },
            {
                ingredientName: INGREDIENT_NAMES.Cucumber,
                quantity: 30,
            },
            {
                ingredientName: INGREDIENT_NAMES.Radish,
                quantity: 30,
            },
            {
                ingredientName: INGREDIENT_NAMES.Tomato,
                quantity: 30,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.SaladWithTunaAndCorn,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Salad,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.CannedCorn,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.CannedTuna,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.CreamCheese,
                quantity: 50,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.SaladWithHerbsAndOnions,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Salad,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Herbs,
                quantity: 30,
            },
            {
                ingredientName: INGREDIENT_NAMES.Cucumber,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Tomato,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Onion,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.OliveOil,
                quantity: 10,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.SaladWithCheeseAndMustard,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Salad,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.CamembertCheese,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.ComoInsalataCheese,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Mustard,
                quantity: 10,
            },
            {
                ingredientName: INGREDIENT_NAMES.Cucumber,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Tomato,
                quantity: 50,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.SaladWithPeppersAndAvocado,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Salad,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Cucumber,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Tomato,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.SweetPepper,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.Avocado,
                quantity: 30,
            },
            {
                ingredientName: INGREDIENT_NAMES.Onion,
                quantity: 20,
            },
            {
                ingredientName: INGREDIENT_NAMES.OliveOil,
                quantity: 10,
            },
        ],
    },
    {
        name: MEAL_COMPONENT_NAMES.SpinachChickenSalad,
        type: ComponentType.FIBER,
        ingredients: [
            {
                ingredientName: INGREDIENT_NAMES.Spinach,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.ChickenFillet,
                quantity: 100,
            },
            {
                ingredientName: INGREDIENT_NAMES.SoftCheese,
                quantity: 30,
            },
            {
                ingredientName: INGREDIENT_NAMES.CannedCorn,
                quantity: 50,
            },
            {
                ingredientName: INGREDIENT_NAMES.ChickenEgg,
                quantity: 50,
            },
        ],
    },
]

export const MEAL_COMPONENTS_BY_NAMES = MEAL_COMPONENTS.reduce(
    (acc, component) => {
        acc[component.name] = component
        return acc
    },
    {} as Record<string, (typeof MEAL_COMPONENTS)[number]>,
)
