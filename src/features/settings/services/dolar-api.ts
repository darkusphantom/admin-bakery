interface DolarApiResponse {
  promedio: number
}

export const getDolarBcv = async (): Promise<number> => {
  try {
    const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial')
    if (!response.ok) {
      throw new Error('Failed to fetch BCV rate')
    }
    const data: DolarApiResponse = await response.json()
    return data.promedio
  } catch (error) {
    console.error('Error fetching BCV rate:', error)
    return 0
  }
}

export const getDolarParalelo = async (): Promise<number> => {
  try {
    const response = await fetch('https://ve.dolarapi.com/v1/dolares/paralelo')
    if (!response.ok) {
      throw new Error('Failed to fetch Paralelo rate')
    }
    const data: DolarApiResponse = await response.json()
    return data.promedio
  } catch (error) {
    console.error('Error fetching Paralelo rate:', error)
    return 0
  }
}
