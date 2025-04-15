import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Skeleton from './Skeleton.vue';

describe('Skeleton.vue', () => {
    it('renders a title skeleton', () => {
        const wrapper = mount(Skeleton, {
            props: { type: 'title' },
        });

        const div = wrapper.find('div');
        expect(div.classes()).toContain('h-6');
        expect(div.classes()).toContain('w-1/3');
    });

    it('renders a text skeleton', () => {
        const wrapper = mount(Skeleton, {
            props: { type: 'text' },
        });

        const div = wrapper.find('div');
        expect(div.classes()).toContain('h-6');
        expect(div.classes()).toContain('w-full');
    });

    it('renders an image skeleton', () => {
        const wrapper = mount(Skeleton, {
            props: { type: 'image' },
        });

        const div = wrapper.find('div');
        expect(div.classes()).toContain('h-48');
        expect(div.classes()).toContain('w-32');
    });

    it('renders a card skeleton', () => {
        const wrapper = mount(Skeleton, {
            props: { type: 'card' },
        });

        const div = wrapper.find('div');
        expect(div.classes()).toContain('h-24');
        expect(div.classes()).toContain('w-full');
    });

});
