import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DetailPage from '../DetailPage.vue';
import { useShowDetails } from '../../composables/useShowDetails';
import { useRoute } from 'vue-router';

vi.mock('../../composables/useShowDetails');
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  RouterLink: {
    name: 'RouterLink',
    props: ['to'],
    template: '<a :href="to"><slot /></a>',
  },
}));

describe('DetailPage.vue', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // Mock the route params
    (useRoute as ReturnType<typeof vi.fn>).mockReturnValue({
      params: { id: '1' },
    });
  });

  it('renders loading skeleton while loading', () => {
    (useShowDetails as ReturnType<typeof vi.fn>).mockReturnValue({
      data: ref(null),
      isLoading: ref(true),
      error: ref(null),
    });

    const wrapper = mount(DetailPage);
    expect(wrapper.html()).toContain('aria-busy="true"');
  });

  it('shows error message if error occurs', () => {
    (useShowDetails as ReturnType<typeof vi.fn>).mockReturnValue({
      data: ref(null),
      isLoading: ref(false),
      error: ref(new Error('Fetch failed')),
    });

    const wrapper = mount(DetailPage);
    expect(wrapper.text()).toContain('Could not load TV shows');
  });

  it('renders show details, cast, and episodes when data is loaded', () => {
    (useShowDetails as ReturnType<typeof vi.fn>).mockReturnValue({
      data: ref({
        name: 'Breaking Bad',
        summary: 'Summary',
        genres: ['Drama', 'Crime'],
        rating: { average: 9.5 },
        language: 'English',
        premiered: '2008-01-20',
        status: 'Ended',
        runtime: 47,
        network: { name: 'AMC' },
        image: { original: 'https://example.com/breakingbad.jpg' },
        _embedded: {
          cast: [
            {
              person: { id: 1, name: 'Bryan Cranston', image: { medium: 'https://example.com/bryan.jpg' } },
              character: { name: 'Walter White' },
            },
          ],
          episodes: [
            {
              id: 1,
              name: 'Pilot',
              season: 1,
              number: 1,
              airdate: '2008-01-20',
              image: { original: 'https://example.com/episode1.jpg' },
            },
          ],
        },
      }),
      isLoading: ref(false),
      error: ref(null),
    });

    const wrapper = mount(DetailPage);

    expect(wrapper.text()).toContain('Breaking Bad');
    expect(wrapper.text()).toContain('Summary');
    expect(wrapper.text()).toContain('Drama');
    expect(wrapper.text()).toContain('9.5');
    expect(wrapper.text()).toContain('English');
    expect(wrapper.text()).toContain('2008-01-20');
    expect(wrapper.text()).toContain('Ended');
    expect(wrapper.text()).toContain('47 minutes');
    expect(wrapper.text()).toContain('AMC');

    expect(wrapper.text()).toContain('Bryan Cranston');
    expect(wrapper.text()).toContain('Walter White');

    expect(wrapper.text()).toContain('Pilot');
    expect(wrapper.text()).toContain('Season 1, Episode 1');
    expect(wrapper.text()).toContain('2008-01-20');
  });
});
