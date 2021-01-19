import React from 'react'
import { UseFormMethods } from 'react-hook-form'
import RadioGroup from 'Shared/Form/RadioGroup'
import SelectTargetModal from './Modal'
import { getCurrentUser } from 'User/currentUser'

type Props = {
  // eslint-disable-next-line
  form: UseFormMethods<any>
  isPublic: boolean
  setIsPublic(value: boolean): void
  userIds: number[]
  setUserIds(ids: number[]): void
  classes: {
    root: string
    label: string
    radioGroup: {
      root: string
      group: string
      input: string
      error: string
    }
  }
}

type Value = 'onlyForMe' | 'public' | 'shared'

const options: Record<Value, { value: Value; label: string }> = {
  onlyForMe: { value: 'onlyForMe', label: 'Only for me' },
  public: { value: 'public', label: 'Public' },
  shared: { value: 'shared', label: 'Shared' },
}

export default function SelectTarget({
  form,
  classes,
  isPublic,
  setIsPublic,
  userIds,
  setUserIds,
}: Props) {
  const currentUser = getCurrentUser()

  const values = currentUser.isInstructor
    ? [options.onlyForMe, options.public, options.shared]
    : [options.onlyForMe, options.shared]

  const [onChange, setOnChange] = React.useState<(value: Value) => void>()

  return (
    <>
      {onChange && (
        <SelectTargetModal
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          userIds={userIds}
          setUserIds={setUserIds}
          onClose={() => {
            onChange(
              userIds.length ? 'shared' : isPublic ? 'public' : 'onlyForMe',
            )
            setOnChange(undefined)
          }}
        />
      )}
      <div className={classes.root}>
        <div className={classes.label}>Privacy</div>
        <RadioGroup
          form={form}
          name="privacy"
          values={values}
          classes={classes.radioGroup}
          onChange={(value: Value, setValue) => {
            setValue(value)

            if (value === 'shared') return setOnChange(() => setValue)

            if (value === 'public') {
              setIsPublic(true)
              setUserIds([])
            } else if (value === 'onlyForMe') {
              setIsPublic(false)
              setUserIds([])
            }
          }}
        />
      </div>
    </>
  )
}
