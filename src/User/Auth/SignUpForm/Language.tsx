import React from 'react'
import { UseFormMethods, Controller } from 'react-hook-form'
import Spin from 'assets/images/icons/Spin'
import Select from 'react-select'
import { useQuery } from 'react-query'
import api from 'api'

type Props = {
  // eslint-disable-next-line
  form: UseFormMethods<any>
}

export default function Language({ form }: Props) {
  const { data: constants } = useQuery('constants', api.app.getConstants)

  return (
    <Controller
      control={form.control}
      name="language"
      render={({ value, onChange }) => {
        return (
          <div className="mb-8">
            <div className="text-lg ml-1 mb-1 uppercase">Language</div>
            {!constants && (
              <div className="py-2 pl-4">
                <Spin className="animate-spin h-8 w-8 mr-3 text-blue-primary" />
              </div>
            )}
            {constants && (
              <Select
                classNamePrefix="react-select"
                value={{
                  value,
                  label: value,
                }}
                onChange={(e) => onChange((e as { value: string }).value)}
                options={constants.languages.map((value) => ({
                  value,
                  label: value,
                }))}
              />
            )}
          </div>
        )
      }}
    />
  )
}
