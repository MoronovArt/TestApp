
type TPagination = {
    total: number
    perPage: number
    page: number
    lastPage: number
}

type TData = {
    rate: {
        name: string
    }
    number: number
    start_date: string
    finish_date: string
    created_at: string
}

type TResponseData = {
    pagination: TPagination
    data: TData[]
}
