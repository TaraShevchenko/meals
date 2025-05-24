'use client'

import React from 'react'

import {
    ArrayInput,
    AutocompleteInput,
    Create,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    List,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    required,
    useRecordContext,
} from 'react-admin'

import { MealType } from '../model/types'

const mealTypeChoices = [
    { id: 'BREAKFAST', name: 'Завтрак' },
    { id: 'LUNCH', name: 'Обед' },
    { id: 'DINNER', name: 'Ужин' },
    { id: 'SNACK', name: 'Перекус' },
]

interface MenuMeal {
    mealType: MealType
    meal?: {
        name?: string
    }
}

interface MenuRecord {
    menuMeals?: MenuMeal[]
}

const MenuMealsField: React.FC = () => {
    const record = useRecordContext<MenuRecord>()
    if (!record?.menuMeals) return null

    return (
        <div>
            {record.menuMeals.map((menuMeal, index: number) => {
                const mealTypeChoice = mealTypeChoices.find((c) => c.id === menuMeal.mealType)
                return (
                    <div key={index} style={{ marginBottom: '4px' }}>
                        <strong>{mealTypeChoice?.name}:</strong> {menuMeal.meal?.name || 'Без названия'}
                    </div>
                )
            })}
        </div>
    )
}

interface FormMenuMealData {
    mealId: string
    mealType: string
    order?: number
}

interface FormData {
    date?: string | Date
    menuMeals?: FormMenuMealData[]
}

export const MenuList: React.FC = () => (
    <List>
        <Datagrid rowClick="edit">
            <DateField source="date" label="Дата" />
            <MenuMealsField />
        </Datagrid>
    </List>
)

export const MenuEdit: React.FC = () => (
    <Edit
        transform={(data: FormData) => ({
            ...data,
            menuMeals: data.menuMeals?.map((item, index: number) => ({
                mealId: item.mealId,
                mealType: item.mealType as MealType,
                order: item.order ?? index,
            })),
        })}
        mutationMode="pessimistic"
    >
        <SimpleForm>
            <DateInput source="date" label="Дата" validate={required()} />

            <ArrayInput source="menuMeals" label="Блюда">
                <SimpleFormIterator>
                    <SelectInput
                        source="mealType"
                        label="Тип приема пищи"
                        choices={mealTypeChoices}
                        validate={required()}
                    />
                    <ReferenceInput reference="meals" source="mealId">
                        <AutocompleteInput label="Блюдо" optionText="name" validate={required()} />
                    </ReferenceInput>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
)

export const MenuCreate: React.FC = () => (
    <Create
        transform={(data: FormData) => ({
            ...data,
            menuMeals: data.menuMeals?.map((item, index: number) => ({
                mealId: item.mealId,
                mealType: item.mealType as MealType,
                order: item.order ?? index,
            })),
        })}
    >
        <SimpleForm>
            <DateInput source="date" label="Дата" validate={required()} />

            <ArrayInput source="menuMeals" label="Блюда">
                <SimpleFormIterator>
                    <SelectInput
                        source="mealType"
                        label="Тип приема пищи"
                        choices={mealTypeChoices}
                        validate={required()}
                    />
                    <ReferenceInput reference="meals" source="mealId">
                        <AutocompleteInput label="Блюдо" optionText="name" validate={required()} />
                    </ReferenceInput>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
)
