import React from 'react'
import { UseFormMethods } from 'react-hook-form'
import RadioGroup from 'Shared/Form/RadioGroup'
import SelectTargetModal from './Modal'

const values = {
  onlyForMe: 'Only for me',
  public: 'Public',
  shared: 'Shared',
}

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

export default function SelectTarget({
  form,
  classes,
  isPublic,
  setIsPublic,
  userIds,
  setUserIds,
}: Props) {
  const [onChange, setOnChange] = React.useState<
    (value: keyof typeof values) => void
  >()

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
          onChange={(value: keyof typeof values, setValue) => {
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
