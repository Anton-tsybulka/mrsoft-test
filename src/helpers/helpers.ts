export const filtrationLength = (item: number, arr: string[]) => arr.filter(i => item < i.length)

export const filtrationSubstring = (item: string, arr: string[], check: boolean) => check ? 
    arr.filter(i => i.includes(item)) :
    arr.filter(i => i.toLowerCase().includes(item.toLowerCase()))