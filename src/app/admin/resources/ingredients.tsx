'use client'

import {
    Create,
    Datagrid,
    Edit,
    List,
    NumberField,
    NumberInput,
    SimpleForm,
    TextField,
    TextInput,
    minValue,
    required,
} from 'react-admin'

export const IngredientList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название" />
            <NumberField source="calories" label="Калории (на 1 грамм)" />
            <NumberField source="protein" label="Белки (на 1 грамм)" />
            <NumberField source="carbs" label="Углеводы (на 1 грамм)" />
            <NumberField source="fat" label="Жиры (на 1 грамм)" />
        </Datagrid>
    </List>
)

export const IngredientEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required()} fullWidth />
            <NumberInput source="calories" label="Калории (на 1 грамм)" validate={[required(), minValue(0)]} />
            <NumberInput source="protein" label="Белки (г)" validate={minValue(0)} />
            <NumberInput source="carbs" label="Углеводы (г)" validate={minValue(0)} />
            <NumberInput source="fat" label="Жиры (г)" validate={minValue(0)} />
            <TextInput source="silpoLink" label="Ссылка на Silpo" fullWidth />
            <TextInput source="atbLink" label="Ссылка на ATB" fullWidth />
        </SimpleForm>
    </Edit>
)

export const IngredientCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required()} fullWidth />
            <NumberInput source="calories" label="Калории (на 1 грамм)" validate={[required(), minValue(0)]} />
            <NumberInput source="protein" label="Белки (г)" validate={minValue(0)} />
            <NumberInput source="carbs" label="Углеводы (г)" validate={minValue(0)} />
            <NumberInput source="fat" label="Жиры (г)" validate={minValue(0)} />
            <TextInput source="silpoLink" label="Ссылка на Silpo" fullWidth />
            <TextInput source="atbLink" label="Ссылка на ATB" fullWidth />
        </SimpleForm>
    </Create>
)
