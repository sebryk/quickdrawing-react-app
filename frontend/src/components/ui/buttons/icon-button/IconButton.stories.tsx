import type { Meta, StoryObj } from '@storybook/react'
import { MdClose } from 'react-icons/md'
import IconButton from './index'

const meta: Meta<typeof IconButton> = {
   title: 'UI/Buttons/IconButton',
   component: IconButton,
   args: {
      variant: 'close',
      type: 'button',
      disabled: false,
      icon: MdClose,
      ariaLabel: 'Close',
   },
   argTypes: {
      onClick: { action: 'clicked' },
   },
}

export default meta

type Story = StoryObj<typeof IconButton>

export const Close: Story = {}
