import { Meta, StoryObj } from "@storybook/react-vite";
import Botao from ".";
import { IBotaoProps } from "./IBotaoProps";

const meta = {
    title: "@components/Botao",
    component: Botao,
    tags: ["autodocs"],
} satisfies Meta<typeof Botao>

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = (args: IBotaoProps) => <Botao {...args} />;
export const Secundary: Story = (args: IBotaoProps) => <Botao {...args} />;

Default.args = {
    ...Default.args,
    label: "Cadastrar",
    className: "br-button primary mr-3",
    action: () => {
        window.alert("Cliquei!");
    }
};

Secundary.args = {
    ...Default.args,
    label: "Cadastrar 2",
    className: "br-button secundary mr-3",
    action: () => {
        window.alert("Cliquei 2!");
    }
};