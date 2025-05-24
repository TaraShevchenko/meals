import {
    Datagrid,
    DateField,
    NumberField,
    ReferenceField,
    ReferenceManyField,
    Show,
    SimpleShowLayout,
    TextField,
} from 'react-admin'

export const OrderReportShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="name" label="Название" />
            <DateField source="startDate" label="Дата начала" />
            <DateField source="endDate" label="Дата окончания" />
            <DateField source="createdAt" label="Создан" showTime />

            <ReferenceManyField reference="orderReportItems" target="reportId" label="Ингредиенты">
                <Datagrid>
                    <ReferenceField source="ingredientId" reference="ingredients" label="Ингредиент">
                        <TextField source="name" />
                    </ReferenceField>
                    <NumberField source="quantity" label="Количество" />
                    <TextField source="path" label="Путь" />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
)
