'use client'

import React from 'react'

import {
    ArrayInput,
    Button,
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
    useRecordContext,
} from 'react-admin'

const ProductSearchButtons: React.FC<{ productName: string }> = ({ productName }) => {
    const handleSilpoSearch = () => {
        const query = encodeURIComponent(productName)
        window.open(`https://silpo.ua/search?find=${query}`, '_blank')
    }

    const handleAtbSearch = () => {
        const query = encodeURIComponent(productName)
        window.open(`https://www.atbmarket.com/sch?query=${query}`, '_blank')
    }

    return (
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <Button label="Купить в Silpo" onClick={handleSilpoSearch} variant="outlined" size="small" />
            <Button label="Купить в ATB" onClick={handleAtbSearch} variant="outlined" size="small" />
        </div>
    )
}

const IngredientSearchButtons: React.FC = () => {
    const record = useRecordContext()

    if (!record) return null

    const handleSilpoSearch = () => {
        const query = encodeURIComponent(record.name)
        window.open(`https://silpo.ua/search?find=${query}`, '_blank')
    }

    const handleAtbSearch = () => {
        const query = encodeURIComponent(record.name)
        window.open(`https://www.atbmarket.com/sch?query=${query}`, '_blank')
    }

    return (
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <Button label="Купить в Silpo" onClick={handleSilpoSearch} variant="contained" color="primary" />
            <Button label="Купить в ATB" onClick={handleAtbSearch} variant="contained" color="secondary" />
        </div>
    )
}

const ProductNamesList: React.FC = () => {
    const record = useRecordContext()
    const productNames = record?.productNames || []

    if (productNames.length === 0) {
        return (
            <div style={{ marginTop: '24px' }}>
                <h3>Наименования продуктов:</h3>
                <p>Наименования продуктов не добавлены</p>
            </div>
        )
    }

    return (
        <div style={{ marginTop: '24px' }}>
            <h3>Наименования продуктов:</h3>
            <div>
                {productNames.map((productName: string, index: number) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: '12px',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                        }}
                    >
                        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{productName}</div>
                        <ProductSearchButtons productName={productName} />
                    </div>
                ))}
            </div>
        </div>
    )
}

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

            <IngredientSearchButtons />

            <ProductNamesList />
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
