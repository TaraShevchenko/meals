'use client'

import React from 'react'

import {
    ArrayInput,
    Create,
    Datagrid,
    Edit,
    List,
    NumberField,
    NumberInput,
    Show,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
    TextInput,
    minValue,
    required,
} from 'react-admin'

import { IngridientsNamesList } from './IngridientsNamesList'

export const IngredientList: React.FC = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="name" label="Название" />
            <NumberField source="calories" label="Калории (на 1 грамм)" />
            <NumberField source="protein" label="Белки (на 1 грамм)" />
            <NumberField source="carbs" label="Углеводы (на 1 грамм)" />
            <NumberField source="fat" label="Жиры (на 1 грамм)" />
        </Datagrid>
    </List>
)

export const IngredientShow: React.FC = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="name" label="Название" />
            <NumberField source="calories" label="Калории (на 1 грамм)" />
            <NumberField source="protein" label="Белки (г)" />
            <NumberField source="carbs" label="Углеводы (г)" />
            <NumberField source="fat" label="Жиры (г)" />
            <IngridientsNamesList />
        </SimpleShowLayout>
    </Show>
)

export const IngredientEdit: React.FC = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required()} fullWidth />
            <NumberInput source="calories" label="Калории (на 1 грамм)" validate={[required(), minValue(0)]} />
            <NumberInput source="protein" label="Белки (г)" validate={minValue(0)} />
            <NumberInput source="carbs" label="Углеводы (г)" validate={minValue(0)} />
            <NumberInput source="fat" label="Жиры (г)" validate={minValue(0)} />

            <ArrayInput source="productNames" label="Наименования продуктов">
                <SimpleFormIterator>
                    <TextInput source="" label="Наименование" fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
)

export const IngredientCreate: React.FC = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required()} fullWidth />
            <NumberInput source="calories" label="Калории (на 1 грамм)" validate={[required(), minValue(0)]} />
            <NumberInput source="protein" label="Белки (г)" validate={minValue(0)} />
            <NumberInput source="carbs" label="Углеводы (г)" validate={minValue(0)} />
            <NumberInput source="fat" label="Жиры (г)" validate={minValue(0)} />

            <ArrayInput source="productNames" label="Наименования продуктов">
                <SimpleFormIterator>
                    <TextInput source="" label="Наименование" fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
)
