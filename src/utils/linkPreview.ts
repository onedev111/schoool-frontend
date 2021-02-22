import React from 'react'
import { useLocalStorage } from 'utils/localStorage'
import { request } from 'utils/fetch'

type LinkPreview = {
  image: string | null
  title: string | null
}

export const useLinkPreview = ({ link }: { link: string }): LinkPreview => {
  const [json, setValue] = useLocalStorage(`linkPreview ${link}`)

  React.useEffect(() => {
    if (json) return

    const load = async () => {
      let title: string | null = null
      let image: string | null = null

      try {
        const result = await request<{ body: string }>({
          path: '/meta_retrieve',
          method: 'POST',
          data: {
            url: link,
          },
        })

        const body = result.body
        const div = document.createElement('div')
        div.innerHTML = body
        title = div.querySelector('title')?.textContent || null
        image =
          div
            .querySelector("meta[property='og:image']")
            ?.getAttribute('content') || null
      } catch (err) {
        // noop
      }

      setValue(JSON.stringify({ title, image }))
    }

    load()
  }, [])

  return json ? JSON.parse(json) : { title: null, image: null }
}
