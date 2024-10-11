import { BASE_URL } from '../libs/constants'

export async function getCategoriesApi() {
    try {
        const url = `${BASE_URL}/api/categories/`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}