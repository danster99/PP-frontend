export default {
  bind(el, binding) {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Adjust threshold as needed
    };

    el.__observer__ = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          binding.value(entry.target.id);
        }
      });
    }, options);

    el.__observer__.observe(el);
  },
  unbind(el) {
    if (el.__observer__) {
      el.__observer__.disconnect();
      delete el.__observer__;
    }
  },
};
