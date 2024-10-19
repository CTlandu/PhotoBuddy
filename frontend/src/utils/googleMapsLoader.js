let isLoaded = false;
let loadPromise = null;

export const loadGoogleMapsApi = () => {
  if (isLoaded) {
    return Promise.resolve();
  }
  if (loadPromise) {
    return loadPromise;
  }
  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }&libraries=places&callback=initMap&loading=async`;
    script.async = true;
    script.defer = true;

    window.initMap = () => {
      isLoaded = true;
      resolve();
    };

    script.onerror = reject;
    document.head.appendChild(script);
  });
  return loadPromise;
};
