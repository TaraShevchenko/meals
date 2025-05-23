'use client'

import { Admin, Resource } from 'react-admin'

import { adminApiProvider } from './adminApiProvider'
import { IngredientCreate, IngredientEdit, IngredientList } from './resources/ingredients'
import { MealComponentCreate, MealComponentEdit, MealComponentList } from './resources/mealComponents'
import { MealCreate, MealEdit, MealList } from './resources/meals'
import { MenuCreate, MenuEdit, MenuList } from './resources/menus'

// Компонент для работы с React Admin, который будет загружен только на клиенте
const AdminPanel = () => {
    // Убедимся, что мы на клиенте перед доступом к API браузера
    if (typeof window === 'undefined') {
        return null
    }

    return (
        <Admin dataProvider={adminApiProvider}>
            <Resource
                name="ingredients"
                list={IngredientList}
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
        </Admin>
    )
}

export default AdminPanel
