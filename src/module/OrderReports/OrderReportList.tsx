import { Datagrid, DateField, FunctionField, List, ShowButton, TextField } from 'react-admin'

interface OrderReportRecord {
    id: string
    name: string
    startDate: string
    endDate: string
    createdAt: string
    items?: Array<{ id: string }>
}

export const OrderReportList = () => (
    <List>
        <Datagrid>
            <TextField source="name" label="Название" />
            <DateField source="startDate" label="Дата начала" />
            <DateField source="endDate" label="Дата окончания" />
            <FunctionField
                label="Количество ингредиентов"
                render={(record: OrderReportRecord) => record.items?.length || 0}
            />
            <DateField source="createdAt" label="Создан" showTime />
            <ShowButton />
        </Datagrid>
    </List>
)
