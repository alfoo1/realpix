def parse_manifest_node(manifest_id: str, manifests: dict, visited=None, include_thumbnails=False):
    if visited is None:
        visited = set()
    if manifest_id in visited:
        return {"title": manifest_id, "children": []}
    visited.add(manifest_id)

    manifest = manifests.get(manifest_id, {})
    signature = manifest.get("signature_info", {})

    node = {
        "title": manifest.get("title", manifest_id),
        "issuer": signature.get("issuer", "Unknown"),
        "date": signature.get("time"),
        "children": []
    }

    if include_thumbnails and "thumbnail" in manifest:
        thumb = manifest.get("thumbnail", {})
        data = thumb.get("data", {}).get("data", [])
        if data:
            b64 = base64.b64encode(bytearray(data)).decode("utf-8")
            node["thumbnail"] = f"data:image/{thumb.get('format', 'jpeg')};base64,{b64}"

    for assertion in manifest.get("assertions", []):
        if assertion.get("label") == "c2pa.actions":
            for action in assertion.get("data", {}).get("actions", []):
                ingredient = action.get("parameters", {}).get("ingredient")
                if ingredient and "url" in ingredient:
                    ingredient_id = ingredient["url"].split("/")[-1]
                    if ingredient_id in manifests:
                        child_node = parse_manifest_node(ingredient_id, manifests, visited, include_thumbnails)
                        node["children"].append(child_node)

    for ing in manifest.get("ingredients", []):
        ing_id = ing.get("document_id")
        if ing_id and ing_id in manifests:
            child_node = parse_manifest_node(ing_id, manifests, visited, include_thumbnails)
            node["children"].append(child_node)
        else:
            child_node = {
                "title": ing.get("title", ing.get("document_id", "Unknown")),
                "issuer": ing.get("issuer", "Unknown"),
                "date": ing.get("date"),
                "children": []
            }
            if include_thumbnails and "thumbnail" in ing:
                thumb = ing.get("thumbnail", {})
                data = thumb.get("data", {}).get("data", [])
                if data:
                    b64 = base64.b64encode(bytearray(data)).decode("utf-8")
                    child_node["thumbnail"] = f"data:image/{thumb.get('format', 'jpeg')};base64,{b64}"
            node["children"].append(child_node)

    return node
