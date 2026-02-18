import type { Meta, StoryObj } from '@storybook/react'
import { BiChevronRight } from 'react-icons/bi'
import MainButton from './index'

const meta: Meta<typeof MainButton> = {
   title: 'UI/Buttons/MainButton',
   component: MainButton,
   args: {
      children: 'Primary',
      variant: 'primary',
      type: 'button',
      disabled: false,
   },
   argTypes: {
      onClick: { action: 'clicked' },
   },
}

export default meta

type Story = StoryObj<typeof MainButton>

export const Primary: Story = {}

export const WithArrowVariant: Story = {
   args: {
      children: 'Next',
      variant: 'primary-with-arrow',
   },
}

export const WithCustomIcon: Story = {
   args: {
      children: 'Custom icon',
      icon: BiChevronRight,
      iconPosition: 'left',
   },
}
