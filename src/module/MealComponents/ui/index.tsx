'use client'

import React from 'react'

import {
    ArrayInput,
    AutocompleteInput,
    Create,
    Datagrid,
    Edit,
    List,
    NumberInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextField,
    TextInput,
    required,
    useRecordContext,
} from 'react-admin'

const typeChoices = [
    { id: 'FIBER', name: 'Клетчатка' },
    { id: 'PROTEIN', name: 'Белки' },
    { id: 'CARBS', name: 'Углеводы' },
]

interface ComponentTypeFieldProps {
    label: string
}

const ComponentTypeField: React.FC<ComponentTypeFieldProps> = () => {
    const record = useRecordContext()
    if (!record) return null

    const typeLabel = typeChoices.find((choice) => choice.id === record.type)?.name
    return <span>{typeLabel}</span>
}

export const MealComponentList: React.FC = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название" />
            <ComponentTypeField label="Тип" />
        </Datagrid>
    </List>
)

export const MealComponentEdit: React.FC = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required()} fullWidth />
            <SelectInput source="type" label="Тип" choices={typeChoices} validate={required()} />

            <ArrayInput source="ingredients" label="Ингредиенты">
                <SimpleFormIterator>
                    <ReferenceInput reference="ingredients" source="ingredientId">
                        <AutocompleteInput label="Ингредиент" optionText="name" validate={required()} />
                    </ReferenceInput>
                    <NumberInput source="quantity" label="Количество (г)" validate={required()} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
)

export const MealComponentCreate: React.FC = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required()} fullWidth />
            <SelectInput source="type" label="Тип" choices={typeChoices} validate={required()} />

            <ArrayInput source="ingredients" label="Ингредиенты">
                <SimpleFormIterator>
                    <ReferenceInput reference="ingredients" source="ingredientId">
                        <AutocompleteInput label="Ингредиент" optionText="name" validate={required()} />
                    </ReferenceInput>
                    <NumberInput source="quantity" label="Количество (г)" validate={required()} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
)
