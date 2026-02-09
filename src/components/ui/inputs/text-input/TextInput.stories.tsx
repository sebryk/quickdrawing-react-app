import type { Meta, StoryObj } from '@storybook/react'
import TextInput from './index'

const meta: Meta<typeof TextInput> = {
   title: 'UI/Inputs/TextInput',
   component: TextInput,
   args: {
      className: '',
      name: 'email',
      placeholder: 'Your email',
      type: 'email',
   },
}

export default meta

type Story = StoryObj<typeof TextInput>

export const Input: Story = {}

export const Textarea: Story = {
   args: {
      name: 'message',
      placeholder: 'Your message',
   },
}
