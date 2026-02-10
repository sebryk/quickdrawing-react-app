import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import BurgerButton from './burger-button'

const meta: Meta<typeof BurgerButton> = {
   title: 'UI/Buttons/BurgerButton',
   component: BurgerButton,
}

export default meta

type Story = StoryObj<typeof BurgerButton>

export const Toggle: Story = {
   render: () => {
      const [open, setOpen] = useState(false)
      return (
         <BurgerButton isBurgerMenuOpen={open} toggleBurgerMenu={() => setOpen((prev) => !prev)} />
      )
   },
}
