import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CastCard from './CastCard.vue';

describe('CastCard.vue', () => {
    it('renders actor and character with image', () => {
        const wrapper = mount(CastCard, {
            props: {
                image: 'https://example.com/mark-hamill.jpg',
                name: 'Mark Hamill',
                character: 'Luke Skywalker',
            },
        });

        const img = wrapper.get('img');
        expect(img.attributes('src')).toBe('https://example.com/mark-hamill.jpg');
        expect(img.attributes('alt')).toBe('Image of Mark Hamill');

        expect(wrapper.text()).toContain('Mark Hamill');
        expect(wrapper.text()).toContain('as Luke Skywalker');
    });

    it('renders actor and character without image', () => {
        const wrapper = mount(CastCard, {
            props: {
                name: 'Carrie Fisher',
                character: 'Princess Leia',
            },
        });

        expect(wrapper.find('img').exists()).toBe(false);

        expect(wrapper.text()).toContain('Carrie Fisher');
        expect(wrapper.text()).toContain('as Princess Leia');
    });
});
