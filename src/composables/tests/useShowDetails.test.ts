import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useShowDetails } from '../useShowDetails';
import { fetchShowDetails } from '../../api/shows';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';

vi.mock('../../api/shows', () => ({
    fetchShowDetails: vi.fn(),
}));

const mockShow = {
    id: 1,
    name: 'Test Show',
    genres: ['Drama'],
    rating: { average: 8.5 },
    summary: 'A great show.',
    _embedded: {
        cast: [],
        episodes: [],
    },
} as any;

describe('useShowDetails', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
        vi.mocked(fetchShowDetails).mockResolvedValue(mockShow);
    });

    it('fetches and returns show details', async () => {
        const wrapper = mount(
            defineComponent({
                setup() {
                    const { data, isSuccess } = useShowDetails('1');
                    return () => h('div', isSuccess.value ? data.value?.name : 'Loading...');
                },
            }),
            {
                global: {
                    plugins: [[VueQueryPlugin, { queryClient }]],
                },
            }
        );

        expect(wrapper.html()).toContain('Loading...');

        while (!wrapper.html().includes('Test Show')) {
            await nextTick();
        }

        expect(wrapper.html()).toContain('Test Show');
        expect(fetchShowDetails).toHaveBeenCalledWith('1');
    });
});
