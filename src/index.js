const myViewerDiv = document.getElementById("forgeViewer");
let viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv);

function initializeViewer(
  model = "./assets/models/sample/building-example.svf"
) {
  const options = {
    env: "Local",
    applyScaling: { to: "meters" },
    globalOffset: { x: 0, y: 0, z: 0 },
    keepCurrentModels: true,
    document: model,
  };
  Autodesk.Viewing.Initializer(options, function () {
    viewer = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById("forgeViewer"),
      { extensions: ["Autodesk.DocumentBrowser", "BeeInventor"] }
    );
    viewer.start();
    viewer.loadModel(options.document, options);

    setCamera(viewer);
  });
}
initializeViewer();
const handleModel = document.getElementById("switch-model");
handleModel.addEventListener("change", () => {
  if (handleModel.checked) {
    initializeViewer("./assets/models/sample/building-example.svf");
    unloadViewer();
  } else {
    initializeViewer("./assets/models/office/beeinventoroffice_3floor.svf");
    unloadViewer();
  }
});

function unloadViewer() {
  viewer.finish();
  viewer = null;
  Autodesk.Viewing.shutdown();
}

function setCamera(viewer) {
  setTimeout(() => {
    const pos = new THREE.Vector3(
      -1.9418035665709943,
      -26.747346936530814,
      18.603221077622162
    );
    const target = new THREE.Vector3(
      -1.9403051859659226,
      -24.92825998040271,
      17.619854897824176
    );
    viewer.navigation.setView(pos, target);
  }, 400);
}

function onDocumentLoadSuccess(doc) {
  const viewables = doc.getRoot().getDefaultGeometry();
  const beeOption = {
    applyScaling: { to: "meters" },
    globalOffset: { x: 0, y: 0, z: 0 },
    keepCurrentModels: true,
  };
  viewer.loadDocumentNode(doc, viewables, beeOption).then((i) => {
    // documented loaded, any action?
  });
}

function onDocumentLoadFailure(viewerErrorCode, viewerErrorMsg) {
  console.error(
    "onDocumentLoadFailure() - errorCode:" +
      viewerErrorCode +
      "\n- errorMessage:" +
      viewerErrorMsg
  );
}
