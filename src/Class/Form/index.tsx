import React from 'react'
import Modal from 'Shared/Modal'
import { X } from '@styled-icons/boxicons-regular/X'
import * as yup from 'yup'
import { useForm } from 'Shared/Form'
import ErrorMessage from 'Shared/Form/ErrorMessage'
import FormGroup from 'Class/Form/FormGroup'
import Description from 'Class/Form/Description'
import UploadCover from 'Class/Form/UploadCover'
import Toggle from 'Class/Form/Toggle'
import { useMutation } from 'react-query'
import api from 'api'
import Loader from 'Shared/Loader'
import { getCurrentUser } from 'User/currentUser'
import useToggle from 'utils/useToggle'
import Delete from 'Shared/Modal/Delete'
import routes from 'routes'
import history from 'utils/history'
import LeaveWarning from 'Shared/LeaveWarning'
import { resetClasses } from 'Class/actions'

const maxLength = 200

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().max(maxLength),
  image: yup.lazy((value) =>
    typeof value === 'object'
      ? yup.object().required()
      : yup.string().required(),
  ),
  isPublic: yup.boolean().required(),
  autoApprove: yup.boolean().required(),
})

type Props = {
  item?: {
    id?: number
    name: string
    description: string
    image?: string | { blob: Blob; url: string }
    isPublic: boolean
    autoApprove: boolean
  }
  onClose(): void
}

const defaultValues = {
  name: '',
  description: '',
  image: undefined as { blob: Blob; url: string } | undefined,
  isPublic: false,
  autoApprove: false,
}

export default function ClassForm({ item = defaultValues, onClose }: Props) {
  const form = useForm({ schema, defaultValues: item })

  const onSuccess = () => {
    resetClasses()
    onClose()
  }

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
  const scrollingElementRef = React.useRef<HTMLDivElement>(null)

  const { mutate: remove } = useMutation(api.classes.remove, { onSuccess })

  const submit = () => {
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
      })
    }
  }

  React.useEffect(() => {
    if (error && scrollingElementRef.current)
      scrollingElementRef.current.scrollTo({ top: 0, behavior: 'smooth' })
  }, [error])

  const [openDelete, toggleDelete] = useToggle()
  const [showCloseAlert, toggleCloseAlert] = useToggle()

  const tryToClose = () => {
    const values = form.getValues()
    const equal = Object.keys(values).every(
      (key) =>
        values[key as keyof typeof values] === item[key as keyof typeof item],
    )

    if (equal) onClose()
    else toggleCloseAlert()
  }

  return (
    <Modal
      width={840}
      scrollingElementRef={scrollingElementRef}
      onClose={tryToClose}
    >
      {showCloseAlert && (
        <LeaveWarning cancel={toggleCloseAlert} close={onClose} />
      )}
      <form onSubmit={form.handleSubmit(submit)} className="pb-12">
        <div className="mt-8 mb-7 uppercase text-center text-2xl relative">
          <button onClick={tryToClose}>
            <X size={32} className="absolute top-0 right-0 mr-7 text-gray-5f" />
          </button>
          {item.id ? 'Settings' : 'Create Class'}
        </div>
        {error && (
          <div className="text-red-500 text-center my-5 text-lg">
            {(error as Error).message}
          </div>
        )}
        <FormGroup label="Name of Class">
          <input
            ref={form.register}
            name="name"
            className="rounded border border-gray-8b placeholder-gray-6b px-4 w-full h-10"
            placeholder="Enter your class name"
          />
          <ErrorMessage form={form} name="name" />
        </FormGroup>
        <FormGroup label="Description">
          <Description form={form} maxLength={maxLength} />
        </FormGroup>
        <FormGroup label="Cover Photo">
          <UploadCover form={form} />
        </FormGroup>
        <FormGroup label="Privacy Option">
          <Toggle
            form={form}
            name="isPublic"
            options={{ Public: true, Private: false }}
          >
            Public
            <br />
            Anyone can find this class. It is searchable.
            <div className="h-4"></div>
            Private
            <br />
            This class is hidden from public view. It is not searchable. Only
            members can see the posts of this class. To have new members, you
            must invite them to join your class.
          </Toggle>
        </FormGroup>
        <FormGroup label="Approval of Requests">
          <Toggle
            form={form}
            name="autoApprove"
            options={{ Automatically: true, Manual: false }}
          >
            If you choose Automatically, requests to join this class are
            approved automatically. If you choose Manually, you have to approve
            each request manually.
          </Toggle>
        </FormGroup>
        <div className="w-400px ml-64">
          <button
            className="mt-10 w-full rounded-full bg-blue-primary text-white font-bold flex-center h-10"
            disabled={isLoading}
          >
            {isLoading && <Loader className="w-5 h-5 mr-2" />}
            {!isLoading && item.id ? 'Update' : 'Create'}
          </button>
          {item.id && (
            <>
              {openDelete && (
                <Delete
                  onClose={() => {
                    history.push(routes.classes())
                  }}
                  onDelete={() => {
                    remove({ classId: item.id as number })
                  }}
                />
              )}
              <button
                type="button"
                onClick={toggleDelete}
                className="mt-8 w-full rounded-full bg-red-58 text-white font-bold flex-center h-10"
              >
                Delete Class
              </button>
              <div className="mt-3 text-gray-2a">
                If you delete class, it will be notified to class members. In
                case this class has more than 2 members, it’ll take 15 days for
                the process to be completed.
              </div>
            </>
          )}
        </div>
      </form>
    </Modal>
  )
}
