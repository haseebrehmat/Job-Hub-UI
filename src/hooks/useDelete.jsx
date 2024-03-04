import useSWRMutation from 'swr/mutation'
import { toast } from 'react-hot-toast'
import { getMsg } from '@/utils/helpers'
import { http } from '@/utils/http'

const useDelete = url => {
    // const showSuccessToast = data => toast.success(data.detail)
    // const showErrorToast = error => toast.error(getMsg(error))

    const { trigger, isMutating } = useSWRMutation(url, () => http.delete(url), {
        onError: error => toast.error(getMsg(error)),
        onSuccess: ({ data }) => toast.success(data.detail),
    })

    return {
        wait: isMutating,
        confirm: trigger,
    }
}

export default useDelete
