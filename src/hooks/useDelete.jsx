import useSWRMutation from 'swr/mutation'
import { toast } from 'react-hot-toast'

import { getMsg } from '@utils/helpers'
import { http } from '@utils/http'

const useDelete = url => {
    const {
        trigger,
        isMutating,
        error: mutateError,
    } = useSWRMutation(url, () => http.delete(url), {
        onError: error => toast.error(getMsg(error)),
        onSuccess: ({ data }) => toast.success(data.detail),
    })

    return {
        wait: isMutating,
        confirm: trigger,
        err: mutateError,
    }
}

export default useDelete
