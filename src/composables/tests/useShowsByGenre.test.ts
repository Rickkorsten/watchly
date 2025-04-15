import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useShowsByGenre } from '../useShowsByGenre';
import { fetchShowsByGenre } from '../../api/shows';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';

vi.mock('../../api/shows', () => ({
    fetchShowsByGenre: vi.fn(),
}));

const mockShows = {
    Drama: [
        {
            id: 1,
            name: 'Breaking Bad',
            genres: ['Drama'],
            rating: { average: 9.5 },
        },
    ],
    Comedy: [
        {
            id: 2,
            name: 'Brooklyn Nine-Nine',
            genres: ['Comedy'],
            rating: { average: 8.4 },
        },
    ],
} as any;

describe('useShowsByGenre', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
        vi.mocked(fetchShowsByGenre).mockResolvedValue(mockShows);
    });

    it('fetches shows grouped by genre', async () => {
        const wrapper = mount(
            defineComponent({
                setup() {
                    const { data, isSuccess } = useShowsByGenre(['Drama', 'Comedy']);
                    return () =>
                        h('div', isSuccess.value ? JSON.stringify(data.value) : 'Loading...');
                },
            }),
            {
                global: {
                    plugins: [[VueQueryPlugin, { queryClient }]],
                },
            }
        );

        expect(wrapper.html()).toContain('Loading...');

        // Wait for data to populate
        while (!wrapper.html().includes('Breaking Bad')) {
            await nextTick();
        }

        expect(wrapper.html()).toContain('Breaking Bad');
        expect(wrapper.html()).toContain('Brooklyn Nine-Nine');
        expect(fetchShowsByGenre).toHaveBeenCalledWith(['Drama', 'Comedy'], 5);
    });
});
