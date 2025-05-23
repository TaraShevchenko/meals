'use client'

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

export const MealList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="name" label="Название" />
        </Datagrid>
    </List>
)

export const MealEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required()} fullWidth />
            <ReferenceArrayInput reference="mealComponents" source="components">
                <AutocompleteArrayInput optionText="name" label="Компоненты блюда" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
)

export const MealCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={required()} fullWidth />
            <ReferenceArrayInput reference="mealComponents" source="components">
                <AutocompleteArrayInput optionText="name" label="Компоненты блюда" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
)
