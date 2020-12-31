import React from 'react'
import Modal from 'Shared/Modal'
import { X } from '@styled-icons/boxicons-regular/X'
import * as yup from 'yup'
import { useForm } from 'Shared/Form'
import Textarea from 'Shared/Form/Textarea'
import camera from 'assets/images/icons/camera.png'
import youtube from 'assets/images/icons/youtube.png'
import record from 'assets/images/icons/record-audio.png'
import looping from 'assets/images/icons/looping.png'
import Notebook from 'assets/images/icons/notebook'
import tag from 'assets/images/icons/tag.png'
import { Smile } from '@styled-icons/fa-regular'
import ReactTooltip from 'react-tooltip'
import useImageUpload from 'Shared/useImageUpload'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import photos from 'assets/images/icons/photos.png'
import useEmojiPicker from 'Shared/useEmojiPicker'
import useToggle from 'Shared/useToggle'
import SelectTarget from 'Home/PostForm/SelectTarget'
import { CaretDown } from '@styled-icons/boxicons-regular/CaretDown'
import YouTube from 'Home/PostForm/YouTube'
import useYouTube from 'Shared/useYouTube'
import { Sentence as SentenceType } from 'Home/Post/types'
import ImagePreviews from 'Home/PostForm/ImagePreviews'
import SentenceForm from 'Home/PostForm/SentenceForm'
import Sentence from 'Home/Sentence'
import TagModal from 'Home/PostForm/TagModal'

type Props = {
  onClose(): void
}

const schema = yup.object({
  privacy: yup.string().required(),
  text: yup.string().required(),
})

export default observer(function PostFormModal({ onClose }: Props) {
  const editorRef = React.useRef(null)
  const form = useForm({ schema, defaultValues: { privacy: 'Public' } })

  const [openSelectTarget, toggleSelectTarget] = useToggle()

  const [openYouTube, toggleYouTube] = useToggle()
  const { youtubeId, youtubeVideoHeight, setYoutubeId, video } = useYouTube({
    close: true,
    className: 'mt-4',
  })

  const [sentence, setSentence] = React.useState<SentenceType | null>(null)
  const [openSentenceModal, toggleSentenceModal] = useToggle()

  const [openTagModal, toggleTagModal] = useToggle()

  const {
    onChangeImage,
    previews,
    hasPreviews,
    removeImage,
    dragArea,
  } = useImageUpload()

  const toggleEmoji = useEmojiPicker({ editorRef })

  React.useEffect(() => {
    window.onbeforeunload = () => 'Changes you made may not be saved.'
    return () => {
      window.onbeforeunload = null
    }
  })

  return (
    <Modal onClose={onClose} width={550} className="relative">
      {openSelectTarget && (
        <SelectTarget form={form} onClose={toggleSelectTarget} />
      )}
      {openYouTube && (
        <YouTube
          youtubeId={youtubeId}
          setYoutubeId={setYoutubeId}
          onClose={toggleYouTube}
        />
      )}
      {openSentenceModal && (
        <SentenceForm
          sentence={sentence}
          setSentence={setSentence}
          onClose={toggleSentenceModal}
        />
      )}
      {openTagModal && <TagModal onClose={toggleTagModal} />}
      <div
        hidden={
          openSelectTarget || openYouTube || openSentenceModal || openTagModal
        }
      >
        {dragArea}
        <button
          type="button"
          className="absolute top-0 right-0 text-gray-5f mt-8 mr-6"
          onClick={onClose}
        >
          <X size={32} />
        </button>
        <div className="text-2xl uppercase text-center pt-8 pb-6 border-b border-gray-c5">
          Create
        </div>
        <div
          className={cn(
            'p-6',
            hasPreviews || (youtubeId && youtubeVideoHeight)
              ? 'pb-0'
              : 'border-b border-gray-c5',
          )}
        >
          <div className="flex">
            <button
              type="button"
              className="w-1/2 bg-gray-f7 flex items-center justify-between px-5 text-xl h-10 rounded-full border border-gray-8b block relative z-30"
              onClick={toggleSelectTarget}
            >
              Only for me
              <CaretDown size={24} />
            </button>
            <button className="w-1/2 ml-7 bg-blue-primary text-white h-10 rounded-full font-bold flex-center opacity-25">
              Post
            </button>
          </div>
          <Textarea
            classes={{
              root: 'mt-7 mb-4 text-lg',
              input:
                'resize-none focus:outline-none placeholder-gray-6b w-full js-editor',
              error: 'text-red-600',
            }}
            form={form}
            name="text"
            elementRef={editorRef}
            rows={5}
            placeholder="Post anything about English learning."
            errorOnlyForSubmitted
          />

          {sentence && (
            <Sentence
              setSentence={setSentence}
              toggleSentenceModal={toggleSentenceModal}
              className="mt-4"
            />
          )}
        </div>

        {video}

        <ImagePreviews previews={previews} removeImage={removeImage} />

        <div className="pt-3 px-7 pb-7">
          <div className="uppercase mb-3">Add media</div>
          <div className="flex items-center justify-between">
            <label className="cursor-pointer">
              <img src={photos} alt="photos" data-tip="Photo" />
              <input type="file" multiple hidden onChange={onChangeImage} />
            </label>
            <img src={camera} alt="video" data-tip="Video" />
            <button type="button" onClick={toggleYouTube}>
              <img src={youtube} alt="youtube" data-tip="Youtube" />
            </button>
            <img src={record} alt="audio" data-tip="Voice" />
            <img
              src={looping}
              alt="looping audio"
              className="w-10"
              data-tip="Looping Audio"
            />
            <button
              type="button"
              data-tip="Notebook SentenceForm"
              onClick={toggleSentenceModal}
            >
              <Notebook style={{ width: '36px' }} />
            </button>
            <button
              type="button"
              data-tip="Tag Friends or Class"
              onClick={toggleTagModal}
            >
              <img src={tag} alt="add tag" />
            </button>
            <button
              className="text-gray-a4"
              data-tip="Emoji"
              onClick={toggleEmoji}
            >
              <Smile size={28} />
            </button>
            <ReactTooltip place="bottom" type="dark" effect="solid" />
          </div>
        </div>
      </div>
    </Modal>
  )
})
