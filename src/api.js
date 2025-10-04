const check_file = async (uri) => {
  const response = await fetch(uri);

  const blob = await response.blob();

  const filename = "adobe-20220124-C.jpg";

  // 2. Define the correct MIME type (optional but good practice)
  const mimeType = "image/jpeg"; // 'image/jpeg' for a .jpg file

  // 3. Create the File object.
  const file = new File(
    [blob], // The content (our Blob)
    filename, // The name of the file
    { type: mimeType }, // The options (MIME type)
  );

  const URL = "https://api.realpix.org/c2pa/upload";

  const formData = new FormData();
  formData.append("file", file);

  const api_response = await fetch(URL, {
    method: "POST",
    body: formData,
  });

  const manifests = (await api_response.json()).manifests;
  const content_keys = Object.keys(manifests).filter((key) =>
    key.startsWith("contentauth"),
  );
  const authors = [];
  for (let i = 0; i < content_keys.length; i++) {
    const assertions = manifests[content_keys[i]].assertions;
    let author = authors.find((obj) => {
      return obj.name == assertions[0].data.author[0].name;
    });
    if (author) {
      author.actions.push(assertions[1].data.actions[1].parameters.name);
    } else {
      authors.push({
        name: assertions[0].data.author[0].name,
        actions: [assertions[1].data.actions[1].parameters.name],
      });
    }
  }
  console.log(authors);
};
