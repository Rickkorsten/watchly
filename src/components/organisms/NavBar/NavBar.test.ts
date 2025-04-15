import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import NavBar from './NavBar.vue';
import { createRouter, createMemoryHistory } from 'vue-router';

vi.mock('../../../composables/useShowsSearch.ts', () => {
    return {
        useShowsSearch: () => ({
            data: [
                {
                    show: {
                        id: 1,
                        name: 'Obi-Wan Kenobi',
                        image: { medium: 'https://example.com/obi.jpg' },
                        premiered: '2022',
                        ended: null,
                        rating: { average: 8.5 },
                    },
                },
            ],
        }),
    };
});

const router = createRouter({
    history: createMemoryHistory(),
    routes: [],
});

describe('NavBar.vue', () => {
    let wrapper: ReturnType<typeof mount>;

    beforeEach(async () => {
        wrapper = mount(NavBar, {
            global: {
                plugins: [router],
            },
            attachTo: document.body,
        });

        await router.isReady();
    });

    it('shows dialog when typing into the search input', async () => {
        const input = wrapper.find('input');
        await input.setValue('obi-wan');
        await flushPromises();

        const dialog = wrapper.find('dialog');
        expect(dialog.exists()).toBe(true);
        expect(dialog.text()).toContain('Obi-Wan Kenobi');
    });

});
