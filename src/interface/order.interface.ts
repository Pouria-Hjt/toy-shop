export interface Order {
    username: string
    products: Array<{
        name: string
        price: number
        quantity: number
    }>
    totalPrice: number
}