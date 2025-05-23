'use client'

import React from 'react'

import {
    AutocompleteArrayInput,
    Create,
    Datagrid,
    Edit,
    List,
    ReferenceArrayInput,
    SimpleForm,
    TextField,
    TextInput,
    required,
} from 'react-admin'

export const MealList: React.FC = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название" />
        </Datagrid>
    </List>
)

export const MealEdit: React.FC = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required()} fullWidth />
            <ReferenceArrayInput reference="mealComponents" source="components">
                <AutocompleteArrayInput optionText="name" label="Компоненты блюда" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
)

export const MealCreate: React.FC = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required()} fullWidth />
            <ReferenceArrayInput reference="mealComponents" source="components">
                <AutocompleteArrayInput optionText="name" label="Компоненты блюда" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
)
