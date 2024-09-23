{{=<% %>=}}{{flutter_js}}<%={{ }}=%>
{{=<% %>=}}{{flutter_build_config}}<%={{ }}=%>

const progressBar = document.querySelector('#progress-bar');
const progressText = document.querySelector('#progress-text');
const progressIndicator = document.querySelector('#progress-indicator');

async function readAssets() {
  // NOTE: AssetManifest.json will be deprecated in favour of AssetManifest.bin:
  // https://github.com/VeryGoodOpenSource/flutter_web_preloader/issues/28
  const response = await fetch('assets/AssetManifest.json');
  const manifest = await response.json();
  const assets = Object.values(manifest)
        .map((list) => list.map((url) => 'assets/' + url))
        .reduce((arr, curr) => [...arr, ...curr], []);
  return assets;
}

async function beginPreloading() {
  const assets = await readAssets();

  let totalAssets = assets.length;
  if (totalAssets === 0) {
    // No assets to load, so we can skip the loading process entirely.
    return;
  }

  let loadedAssets = 0;
  const batchSize = {{batch_size}};

  progressIndicator.style.width = '0%';
  progressText.textContent = `Loaded ${loadedAssets} of ${totalAssets} assets`;

  async function reportProgress() {
    loadedAssets++;

    const value = Math.floor((loadedAssets / totalAssets) * 100) + '%';
    progressIndicator.style.width = value;

    progressText.textContent = `Loaded ${loadedAssets} of ${totalAssets} assets`;
  }

  async function load(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to load: ${response.status} ${response.statusText}`,
        );
      }
      return await response.text();
    } catch (error) {
      throw new Error("Network error");
    }
  }

  async function loadBatch(urls) {
    const loadPromises = urls.map(url => load(url).then(reportProgress()));
    try {
        return await Promise.all(loadPromises);
    } catch (error) {
        console.error('Error loading one or more asset:', error);
    }
  }

  for (let i = 0; i < assets.length; i += batchSize) {
    const batch = assets.slice(i, i + batchSize);
    await loadBatch(batch);
  }
}

_flutter.loader.load({
  serviceWorkerSettings: {
    serviceWorkerVersion: {{=<% %>=}}{{flutter_service_worker_version}}<%={{ }}=%>,
  },
  onEntrypointLoaded: async function(engineInitializer) {
    await Promise.all([
      beginPreloading(),
      engineInitializer.initializeEngine(),
    ]).then(([_, appRunner]) => appRunner.runApp());
  }
});
