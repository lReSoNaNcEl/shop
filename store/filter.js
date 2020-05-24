export const state = () => ({
    filters: [
        {
            id: 1,
            type: 'Тип',
            params: [
                {id: 1, name: 'Кровля', state: false},
                {id: 2, name: 'Фасад', state: false},
                {id: 3, name: 'Экстерьер', state: false},
            ],
        },
        {
            id: 2,
            type: 'Производитель',
            params: [
                {id: 1, name: 'Кровля', state: false},
                {id: 2, name: 'Фасад', state: false},
                {id: 3, name: 'Экстерьер', state: false},
            ],
        },
        {
            id: 3,
            type: 'Материал',
            params: [
                {id: 1, name: 'Кровля', state: false},
                {id: 2, name: 'Фасад', state: false},
                {id: 3, name: 'Экстерьер', state: false},
            ],
        },
        {
            id: 4,
            type: 'Размер',
            params: [
                {id: 1, name: '2 м2', state: false},
                {id: 2, name: '4 м2', state: false},
                {id: 3, name: '6 м2', state: false},
            ],
        },
        {
            id: 5,
            type: 'Цвет',
            params: [
                {id: 1, name: 'Цвет 1', state: false},
                {id: 2, name: 'Цвет 2', state: false},
                {id: 3, name: 'Цвет 3', state: false},
            ],
        },
    ]
})

export const setters = {}

export const getters = {
    getFilters: state => state.filters
}
