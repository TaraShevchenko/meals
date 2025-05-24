'use client'

import { useState } from 'react'

import { Calendar, Clock, Download, Plus } from 'lucide-react'

interface OrderReport {
    id: string
    name: string
    startDate: string
    endDate: string
    createdAt: string
    items: OrderReportItem[]
}

interface OrderReportItem {
    id: string
    quantity: number
    path: string
    ingredient: {
        id: string
        name: string
        calories: number
        protein?: number
        carbs?: number
        fat?: number
    }
}

export default function OrderModePage() {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [reportName, setReportName] = useState('')
    const [reports, setReports] = useState<OrderReport[]>([])
    const [currentReport, setCurrentReport] = useState<OrderReport | null>(null)
    const [loading, setLoading] = useState(false)

    const generateReport = async () => {
        if (!startDate || !endDate || !reportName) {
            alert('Пожалуйста, заполните все поля')
            return
        }

        setLoading(true)
        try {
            const response = await fetch('/api/order-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: reportName,
                    startDate: new Date(startDate).toISOString(),
                    endDate: new Date(endDate).toISOString(),
                }),
            })

            if (response.ok) {
                const newReport = await response.json()
                setCurrentReport(newReport)
                setReports([newReport, ...reports])
                setReportName('')
            } else {
                alert('Ошибка при создании отчета')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Ошибка при создании отчета')
        } finally {
            setLoading(false)
        }
    }

    const loadReports = async () => {
        try {
            const response = await fetch('/api/order-report')
            if (response.ok) {
                const data = await response.json()
                setReports(data)
            }
        } catch (error) {
            console.error('Error loading reports:', error)
        }
    }

    const exportToCSV = (report: OrderReport) => {
        const headers = ['Ингредиент', 'Количество', 'Путь', 'Калории', 'Белки', 'Углеводы', 'Жиры']
        const rows = report.items.map((item) => [
            item.ingredient.name,
            item.quantity.toString(),
            item.path,
            item.ingredient.calories.toString(),
            item.ingredient.protein?.toString() || '',
            item.ingredient.carbs?.toString() || '',
            item.ingredient.fat?.toString() || '',
        ])

        const csvContent = [headers, ...rows].map((row) => row.map((field) => `"${field}"`).join(',')).join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${report.name}.csv`
        link.click()
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Режим заказа</h1>
                    <p className="mt-2 text-gray-600">Выберите диапазон дат для расчета необходимых ингредиентов</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">Создать новый отчет</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Название отчета</label>
                                    <input
                                        type="text"
                                        value={reportName}
                                        onChange={(e) => setReportName(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Например: Заказ на неделю"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Дата начала</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Дата окончания</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <button
                                    onClick={generateReport}
                                    disabled={loading}
                                    className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    ) : (
                                        <Plus className="h-4 w-4" />
                                    )}
                                    Создать отчет
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 rounded-lg bg-white p-6 shadow">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">История отчетов</h2>
                                <button onClick={loadReports} className="text-blue-600 hover:text-blue-700">
                                    Обновить
                                </button>
                            </div>

                            <div className="space-y-2">
                                {reports.map((report) => (
                                    <div
                                        key={report.id}
                                        className={`cursor-pointer rounded-md border p-3 transition-colors ${
                                            currentReport?.id === report.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                        onClick={() => setCurrentReport(report)}
                                    >
                                        <div className="font-medium text-gray-900">{report.name}</div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(report.startDate).toLocaleDateString()} -{' '}
                                            {new Date(report.endDate).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Clock className="h-3 w-3" />
                                            {new Date(report.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        {currentReport ? (
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">{currentReport.name}</h2>
                                        <p className="text-gray-600">
                                            {new Date(currentReport.startDate).toLocaleDateString()} -{' '}
                                            {new Date(currentReport.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => exportToCSV(currentReport)}
                                        className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                    >
                                        <Download className="h-4 w-4" />
                                        Экспорт CSV
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Ингредиент
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Количество
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Путь
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Калории
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Белки
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Углеводы
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Жиры
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {currentReport.items.map((item) => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                                                        {item.ingredient.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {item.path}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {item.ingredient.calories}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {item.ingredient.protein || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {item.ingredient.carbs || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {item.ingredient.fat || '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {currentReport.items.length === 0 && (
                                    <div className="py-12 text-center">
                                        <p className="text-gray-500">
                                            В выбранном диапазоне дат нет меню с ингредиентами
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex h-96 items-center justify-center rounded-lg bg-white shadow">
                                <div className="text-center">
                                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                                        Выберите или создайте отчет
                                    </h3>
                                    <p className="mt-2 text-gray-500">
                                        Создайте новый отчет или выберите существующий из истории
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
