'use client'

import React from 'react'

import {
    AutocompleteArrayInput,
    Create,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    List,
    ReferenceArrayInput,
    SimpleForm,
    required,
} from 'react-admin'

export const MenuList: React.FC = () => (
    <List>
        <Datagrid rowClick="edit">
            <DateField source="date" label="Дата" />
        </Datagrid>
    </List>
)

export const MenuEdit: React.FC = () => (
    <Edit>
        <SimpleForm>
            <DateInput source="date" label="Дата" validate={required()} />
            <ReferenceArrayInput reference="meals" source="meals">
                <AutocompleteArrayInput optionText="name" label="Блюда" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
)

export const MenuCreate: React.FC = () => (
    <Create>
        <SimpleForm>
            <DateInput source="date" label="Дата" validate={required()} />
            <ReferenceArrayInput reference="meals" source="meals">
                <AutocompleteArrayInput optionText="name" label="Блюда" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
)
