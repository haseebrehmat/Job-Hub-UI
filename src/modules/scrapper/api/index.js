import { http } from '@utils/http'
import { toast } from 'react-hot-toast'

export const syncNow = url => http.get(url).then(({ data }) => toast.success(data.detail))
