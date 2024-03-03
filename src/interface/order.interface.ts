export interface Order {
    username: string
    products: Array<{
        id: string
        name: string
        price: number
        quantity: number
    }>
    totalPrice: number
}