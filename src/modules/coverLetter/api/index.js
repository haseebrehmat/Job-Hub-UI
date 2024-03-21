import { rawHttp } from '@utils/http'
export const generateCoverLetter = (url, { arg: details }) => {
    return rawHttp.post(url, details).then(({ data }) => ({coverletter: data.detail, status: 'success' }))
}