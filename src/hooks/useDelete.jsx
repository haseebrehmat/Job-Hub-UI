import useSWRMutation from 'swr/mutation'
import { toast } from 'react-hot-toast'
import { getMsg } from '@/utils/helpers'
import { http } from '@/utils/http'

const useDelete = (url, onError = null, onSuccess = null) => {
    const showSuccessToast = data => toast.success(data.detail)
    const showErrorToast = error => toast.success(getMsg(error))

    const { trigger, isMutating } = useSWRMutation(url, () => http.delete(url), {
        onError: onError || showErrorToast,
        onSuccess: onSuccess || showSuccessToast,
    })

    return {
        wait: isMutating,
        confirm: trigger,
    }
}

export default useDelete
