document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("inputField");
  const outputField = document.getElementById("outputField");
  const generateButton = document.getElementById("generateButton");
  const copyMessage = document.getElementById("copyMessage");

  generateButton.addEventListener("click", generateOutput);
  outputField.addEventListener("click", copyToClipboard);

  function generateOutput() {
    const inputValue = inputField.value.trim();
    const category = document.querySelector(
      'input[name="category"]:checked'
    ).value;
    const method = document.querySelector('input[name="method"]:checked').value;
    const elementType = document.querySelector(
      'input[name="elementType"]:checked'
    ).value;

    let returnStatement;
    if (category === "No Screen") {
      returnStatement = "return customUiMainMacroponent()";
    } else if (category === "Screen 3") {
      returnStatement =
        'return customUiMainMacroponent()\n.createByCss(ShadowRoot.class, "main > sn-canvas-screen:nth-child(3)")\n';
    } else if (category === "Screen 4") {
      returnStatement =
        'return customUiMainMacroponent()\n.createByCss(ShadowRoot.class, "main > sn-canvas-screen:nth-child(4)")\n';
    } else if (category === "Screen 5") {
      returnStatement =
        'return customUiMainMacroponent()\n.createByCss(ShadowRoot.class, "main > sn-canvas-screen:nth-child(5)")\n';
    }

    if (method === "ByCss") {
      returnStatement += ".createByCss";
    } else if (method === "AllByCss") {
      returnStatement += ".createAllByCss";
    } else if (method === "ByXpath") {
      returnStatement += ".createByXPath";
    } else if (method === "AllByXpath") {
      returnStatement += ".createAllByXPath";
    }

    returnStatement += `(${elementType}.class, "${inputValue}");`;

    let finalOutput = `public ${elementType}`;
    if (returnStatement.includes("All")) {
      finalOutput = `public List<${elementType}>`;
    }
    finalOutput += ` testMethod(){\n\t${returnStatement}\n}`;

    outputField.value = finalOutput;
  }

  function copyToClipboard() {
    outputField.select();
    document.execCommand("copy");
    copyMessage.textContent = "Copied to Clipboard";
    setTimeout(() => {
      copyMessage.textContent = "";
    }, 2000);
  }
});
