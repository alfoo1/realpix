# RealPix Chrome Extension

RealPix is a Chrome extension that enables users to verify the authenticity and provenance of images directly in the browser. By right-clicking on any image, users can access a verification feature powered by WebAssembly and the C2PA (Content Authenticity Initiative) Python library.

## Project Structure

This project consists of two main components:

1. **Chrome Extension**: The browser extension that integrates with Chrome's context menu to provide image verification functionality.
2. **WebAssembly Module**: A compiled WebAssembly module based on the c2pa-python library, which performs the actual image verification in the browser environment.

## Features

- **Right-click Verification**: Simply right-click on any image in your browser to access the verification option.
- **C2PA Compliance**: Uses the Content Authenticity Initiative standards to verify image provenance and authenticity.
- **WebAssembly Performance**: Leverages WebAssembly for fast, client-side processing without server dependencies.
- **Privacy-Focused**: All verification happens locally in the browser, ensuring user privacy.

## Installation

### Prerequisites

- Google Chrome browser
- Node.js (for building the extension)
- Python 3.x (for compiling the WebAssembly module)

### Building the Extension

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/realpix-chrome-extension.git
   cd realpix-chrome-extension
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the WebAssembly module:
   ```bash
   # Install c2pa-python
   pip install c2pa-python

   # Build the WASM module (specific build commands depend on your setup)
   # This may involve compiling Python code to WebAssembly using tools like Pyodide or similar
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to any webpage containing images.
2. Right-click on an image you want to verify.
3. Select "Verify with RealPix" from the context menu.
4. The extension will process the image using WebAssembly and display verification results.

## Development

### Chrome Extension Structure

- `manifest.json`: Extension manifest file
- `background.js`: Background script handling context menu and WebAssembly calls
- `content.js`: Content script injected into web pages
- `popup.html/popup.js`: Extension popup interface

### WebAssembly Module

The WebAssembly module is compiled from Python code using c2pa-python. It provides functions for:
- Loading and parsing image metadata
- Verifying C2PA manifests
- Extracting provenance information

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool provides verification based on available C2PA data. Results should be interpreted in context and may not guarantee absolute authenticity in all cases.