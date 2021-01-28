import { getCurrentUser } from 'User/currentUser'
import { useMutation } from 'react-query'
import api from 'api'
import history from 'utils/history'
import routes from 'routes'
import { UseFormMethods } from 'react-hook-form'

type Props = {
  item: {
    id?: number
    name: string
    description: string
    image?: string | { blob: Blob; url: string }
    isPublic: boolean
    autoApprove: boolean
  }
  // eslint-disable-next-line
  form: UseFormMethods<any>
  onSuccess(): void
}

export const useSubmit = ({ item, form, onSuccess }: Props) => {
  const {
    mutate: create,
    isLoading: isCreating,
    error: createError,
  } = useMutation(api.classes.create, {
    onSuccess(item) {
      onSuccess()
      history.push(routes.class(item.id))
    },
  })

  const {
    mutate: update,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation(api.classes.update, {
    onSuccess,
  })

  const isLoading = isCreating || isUpdating
  const error = createError || updateError

  const submit = (notify = false) => {
    if (isLoading) return

    const values = form.getValues()

    if (item.id) {
      update({
        id: item.id,
        name: item.name !== values.name ? values.name : undefined,
        description:
          item.description !== values.description
            ? values.description
            : undefined,
        isPublic:
          item.isPublic !== values.isPublic ? values.isPublic : undefined,
        autoApprove:
          item.autoApprove !== values.autoApprove
            ? values.autoApprove
            : undefined,
        image:
          item.image !== values.image
            ? (values.image as { blob: Blob })
            : undefined,
      })
    } else {
      create({
        name: values.name,
        description: values.description,
        isPublic: values.isPublic,
        autoApprove: values.autoApprove,
        completed: false,
        image: values.image as { blob: Blob },
        isLocked: false,
        isJoined: false,
        isOwn: true,
        owner: getCurrentUser(),
        notify,
      })
    }
  }

  return {
    error,
    submit,
    isLoading,
  }
}
