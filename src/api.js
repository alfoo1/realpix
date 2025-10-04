import { createC2pa } from "@contentauth/c2pa-web";

import wasmSrc from "@contentauth/c2pa-web/resources/c2pa.wasm?url";

const c2pa = createC2pa({ wasmSrc });
