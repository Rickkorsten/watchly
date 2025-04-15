import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import BackButton from './BackButton.vue';
import { defineComponent } from "vue"; // adjust path as needed

const DummyComponent = defineComponent({
  template: '<div>Dummy</div>',
});

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: DummyComponent },
    { path: '/show/:id', name: 'detail page', component: DummyComponent },
  ],
});

describe('BackButton.vue', () => {
  it('renders and navigates correctly', async () => {
    const wrapper = mount(BackButton, {
      props: {
        to: '/',
      },
      global: {
        plugins: [router],
      },
      slots: {
        default: 'Go Back',
      },
    });

    expect(wrapper.text()).toContain('Go Back');

    const link = wrapper.get('a');
    expect(link.attributes('href')).toBe('/');
    expect(link.attributes('aria-label')).toBe('Go back to the previous page');
  });

  it('renders default slot content if not overridden', () => {
    const wrapper = mount(BackButton, {
      props: {
        to: '/another',
      },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain('Back');
  });
});
