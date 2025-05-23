'use client'

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

export const MenuList = () => (
    <List>
        <Datagrid rowClick="edit">
            <DateField source="date" label="Дата" />
        </Datagrid>
    </List>
)

export const MenuEdit = () => (
    <Edit>
        <SimpleForm>
            <DateInput source="date" label="Дата" validate={required()} />
            <ReferenceArrayInput reference="meals" source="meals">
                <AutocompleteArrayInput optionText="name" label="Блюда" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
)

export const MenuCreate = () => (
    <Create>
        <SimpleForm>
            <DateInput source="date" label="Дата" validate={required()} />
            <ReferenceArrayInput reference="meals" source="meals">
                <AutocompleteArrayInput optionText="name" label="Блюда" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
)
