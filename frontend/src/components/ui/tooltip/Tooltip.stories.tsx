import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import Tooltip from './index'

const meta: Meta<typeof Tooltip> = {
   title: 'UI/Tooltip',
   component: Tooltip,
   args: {
      content: 'Tooltip content',
      disabled: false,
   },
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
   render: (args: ComponentProps<typeof Tooltip>) => (
      <Tooltip {...args}>
         <span style={{ padding: '6px 10px', border: '1px solid #ccc' }}>Hover me</span>
      </Tooltip>
   ),
}
