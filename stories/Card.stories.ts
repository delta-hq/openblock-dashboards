import type { Meta, StoryObj } from "@storybook/react";
import { CardDemo } from "./Card";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof CardDemo> = {
  component: CardDemo,
};

export default meta;
type Story = StoryObj<typeof CardDemo>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};
