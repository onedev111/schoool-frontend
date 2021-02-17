import React from 'react'
import { useLocalStorage } from 'utils/localStorage'
import { request } from 'utils/fetch'

type LinkPreview = {
  image: string
  title: string
}

export const useLinkPreview = ({
  link,
}: {
  link: string
}): LinkPreview | undefined => {
  const [json, setValue] = useLocalStorage(`linkPreview:${link}`)

  React.useEffect(() => {
    if (json) return

    const load = async () => {
      try {
        const result = await request({
          path: '/meta_retrieve',
          method: 'GET',
          params: {
            url: link,
          },
        })

        console.log(result)
      } catch (err) {
        // noop
      }
    }

    load()
  }, [])

  return json ? JSON.parse(json) : undefined
}
