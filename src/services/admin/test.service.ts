import { Test } from "../../types/admin/test";


export const getTest = async (): Promise<Test> => {
    const result = await Promise.resolve<Test>({
        name: "Test",
        version: 'v1',
        message: 'New Test v1 for BPTN 2.0'
    })
    return result
}