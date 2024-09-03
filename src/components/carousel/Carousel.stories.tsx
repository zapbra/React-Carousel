import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Carousel from "./Carousel";

export default {
  title: "Carousel",
  component: Carousel,
} as Meta<typeof Carousel>;

const Template: StoryFn<typeof Carousel> = (args) => <Carousel {...args} />;

export const CarouselTest = Template.bind({});
