import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchListItem from './SearchListItem.vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import {defineComponent} from "vue";

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/show/:id',
            name: 'ShowDetails',
            component: defineComponent({ template: '<div />' }),
        },
    ],
});

describe('SearchListItem.vue', () => {
    it('renders show details properly', async () => {
        const wrapper = mount(SearchListItem, {
            props: {
                id: 42,
                name: 'The Mandalorian',
                image: 'https://example.com/mando.jpg',
                period: '2019 - 2023',
                rating: 9.2,
            },
            global: {
                plugins: [router],
            },
        });

        expect(wrapper.text()).toContain('The Mandalorian');
        expect(wrapper.text()).toContain('2019 - 2023');
        expect(wrapper.text()).toContain('⭐ 9.2');

        const img = wrapper.find('img');
        expect(img.attributes('src')).toBe('https://example.com/mando.jpg');
        expect(img.attributes('alt')).toBe('Poster of The Mandalorian');

        const link = wrapper.findComponent({ name: 'RouterLink' });
        expect(link.exists()).toBe(true);
        expect(link.props('to')).toBe('/show/42');
    });

    it('renders "No rating" if rating is missing', () => {
        const wrapper = mount(SearchListItem, {
            props: {
                id: 99,
                name: 'Ahsoka',
                image: 'https://example.com/ahsoka.jpg',
                period: '2023 - Still running',
            },
            global: {
                plugins: [router],
            },
        });

        expect(wrapper.text()).toContain('⭐ No rating');
    });
});
