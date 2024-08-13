import { StoryFn, Meta } from "@storybook/react";
import Carousel from "./Carousel";
import castlevania from "../../images/castlevania.jpg";

export default {
    title: "Carousel",
    component: Carousel,
} as Meta<typeof Carousel>;

const Template: StoryFn<typeof Carousel> = (args) => <Carousel {...args} />;

export const CarouselTest = Template.bind({});
CarouselTest.args = {
    images: [
        castlevania,
        castlevania,
        castlevania,
        castlevania,
        castlevania,
        castlevania,
        castlevania,
        castlevania,
        castlevania,
        castlevania,
        castlevania,
    ],
};
