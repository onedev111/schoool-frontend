import React from 'react'
import Loader from 'Shared/Loader'
import { FacebookSquare } from '@styled-icons/boxicons-logos/FacebookSquare'
import { initFacebook } from 'User/Auth/FacebookSignIn/facebook'

type Props = {
  text: string
  signIn(params: { facebook: { token: string; userId: string } }): void
  isLoading: boolean
  onClick(): void
}

export default function FacebookSignIn({
  text,
  signIn,
  isLoading,
  onClick,
}: Props) {
  const facebookLogin = async () => {
    if (!isLoading) {
      onClick()
      const FB = await initFacebook()
      // eslint-disable-next-line
      FB.login((res: any) => {
        if (res.status === 'connected') {
          const { accessToken, userID } = res.authResponse
          signIn({
            facebook: {
              token: accessToken,
              userId: userID,
            },
          })
        }
      })
    }
  }

  return (
    <div
      className="bg-blue-facebook rounded h-8 text-center text-white text-sm font-bold flex-center cursor-pointer"
      onClick={facebookLogin}
    >
      <div className="mr-2 rounded overflow-hidden">
        <FacebookSquare size={19} />
      </div>
      {!isLoading && text}
      {isLoading && <Loader className="w-5 h-5 ml-1" />}
    </div>
  )
}
