'use client'

import { Admin, Resource } from 'react-admin'

import { IngredientCreate, IngredientEdit, IngredientList, IngredientShow } from 'module/Ingredients'
import { MealComponentCreate, MealComponentEdit, MealComponentList } from 'module/MealComponents'
import { MealCreate, MealEdit, MealList } from 'module/Meals'
import { MenuCreate, MenuEdit, MenuList } from 'module/Menus'
import { OrderReportList, OrderReportShow } from 'module/OrderReports'

import { reactAdminDataProvider } from 'shared/lib/react-admin/provider'

const AdminPanel = () => {
    return (
        <Admin dataProvider={reactAdminDataProvider}>
            <Resource
                name="ingredients"
                list={IngredientList}
                show={IngredientShow}
                edit={IngredientEdit}
                create={IngredientCreate}
                options={{ label: 'Ингредиенты' }}
            />
            <Resource
                name="mealComponents"
                list={MealComponentList}
                edit={MealComponentEdit}
                create={MealComponentCreate}
                options={{ label: 'Компоненты блюд' }}
            />
            <Resource name="meals" list={MealList} edit={MealEdit} create={MealCreate} options={{ label: 'Блюда' }} />
            <Resource name="menus" list={MenuList} edit={MenuEdit} create={MenuCreate} options={{ label: 'Меню' }} />
            <Resource
                name="orderReports"
                list={OrderReportList}
                show={OrderReportShow}
                options={{ label: 'Отчеты заказов' }}
            />
        </Admin>
    )
}

export default AdminPanel
