import { rawHttp } from '@/utils/http'
import { toast } from 'react-hot-toast'

export const savePseudo = async (url, { arg: team }) => {
    team.members = team.members.map(member => member.value)
    if (team?.id) {
        const { data } = await rawHttp.put(url, team)
        return toast.success(data.detail || 'Team updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, team)
    return toast.success(data_1.detail)
}
